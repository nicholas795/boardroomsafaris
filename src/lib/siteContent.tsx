import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DEFAULT_CONTENT } from '@/lib/contentCatalog';

interface SiteContentContextValue {
  values: Record<string, string>;
  ready: boolean;
  dbError: string | null;
  refresh: () => Promise<void>;
  savePage: (pageId: string, updates: Record<string, string>) => Promise<{ ok: boolean; error?: string }>;
  resetPage: (pageId: string, keys: string[]) => Promise<{ ok: boolean; error?: string }>;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function describeDbError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('project_paused') || lower.includes('paused')) {
    return 'The website database is paused, so changes cannot be saved yet. Restore the DatabasePad project, run the site content setup SQL, then try again.';
  }
  if (lower.includes('site_content') || lower.includes('schema cache') || lower.includes('does not exist')) {
    return 'The content table is not set up yet. Run the SQL in supabase/site_content.sql in the DatabasePad SQL editor, then reload this page.';
  }
  return message;
}

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase.from('site_content').select('key,value');
    if (error) {
      setDbError(describeDbError(error.message));
      setReady(true);
      return;
    }
    const next: Record<string, string> = {};
    for (const row of data || []) {
      if (row.key && typeof row.value === 'string') next[row.key] = row.value;
    }
    setOverrides(next);
    setDbError(null);
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const values = useMemo(() => ({ ...DEFAULT_CONTENT, ...overrides }), [overrides]);

  const savePage = useCallback(async (pageId: string, updates: Record<string, string>) => {
    const rows = Object.entries(updates).map(([key, value]) => ({
      key,
      page: pageId,
      value,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from('site_content').upsert(rows, { onConflict: 'key' });
    if (error) {
      const message = describeDbError(error.message);
      setDbError(message);
      return { ok: false, error: message };
    }

    setOverrides((current) => ({ ...current, ...updates }));
    setDbError(null);
    return { ok: true };
  }, []);

  const resetPage = useCallback(async (pageId: string, keys: string[]) => {
    const { error } = await supabase.from('site_content').delete().eq('page', pageId);
    if (error) {
      const message = describeDbError(error.message);
      setDbError(message);
      return { ok: false, error: message };
    }
    setOverrides((current) => {
      const next = { ...current };
      keys.forEach((key) => {
        delete next[key];
      });
      return next;
    });
    setDbError(null);
    return { ok: true };
  }, []);

  const contextValue = useMemo(
    () => ({ values, ready, dbError, refresh, savePage, resetPage }),
    [values, ready, dbError, refresh, savePage, resetPage],
  );

  return <SiteContentContext.Provider value={contextValue}>{children}</SiteContentContext.Provider>;
};

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return context;
}

export function useContent() {
  const { values } = useSiteContent();
  const text = useCallback((key: string) => values[key] ?? DEFAULT_CONTENT[key] ?? '', [values]);
  return { text };
}
