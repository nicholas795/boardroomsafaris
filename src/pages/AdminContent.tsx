import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getAdminAuthState, logoutAdmin } from '@/lib/auth';
import { CONTENT_PAGES, DEFAULT_CONTENT, type ContentField } from '@/lib/contentCatalog';
import { useSiteContent } from '@/lib/siteContent';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, LogOut, RotateCcw } from 'lucide-react';

async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const maxEdge = 1800;
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not prepare that image');
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.82);
  });
  if (!blob) throw new Error('Could not prepare that image');
  return blob;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read that image'));
    reader.readAsDataURL(blob);
  });
}

async function storeImage(file: File): Promise<string> {
  const blob = await compressImage(file);
  const safeName = file.name.replace(/[^a-z0-9.]+/gi, '-').toLowerCase().replace(/\.+$/, '');
  const path = `${Date.now()}-${safeName || 'photo'}.jpg`;
  const { error } = await supabase.storage.from('site-images').upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: false,
  });

  if (!error) {
    const { data } = supabase.storage.from('site-images').getPublicUrl(path);
    if (data.publicUrl) return data.publicUrl;
  }

  return blobToDataUrl(blob);
}

const AdminContent: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const authState = getAdminAuthState();
  const { values, ready, dbError, savePage, resetPage } = useSiteContent();
  const [pageId, setPageId] = useState(CONTENT_PAGES[0].id);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const page = CONTENT_PAGES.find((item) => item.id === pageId) ?? CONTENT_PAGES[0];

  useEffect(() => {
    if (!authState.isAuthenticated) navigate('/admin/login');
  }, [authState.isAuthenticated, navigate]);

  useEffect(() => {
    if (!ready) return;
    setDraft(values);
  }, [ready]);

  const pageKeys = useMemo(
    () => page.sections.flatMap((section) => section.fields.map((item) => item.key)),
    [page],
  );

  const dirty = pageKeys.some((key) => (draft[key] ?? '') !== (values[key] ?? ''));

  const updateField = (key: string, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleImage = async (key: string, file: File | undefined) => {
    if (!file) return;
    setUploadingKey(key);
    try {
      const url = await storeImage(file);
      updateField(key, url);
    } catch (error) {
      toast({
        title: 'Image not added',
        description: error instanceof Error ? error.message : 'Try a different photo.',
        variant: 'destructive',
      });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSave = async () => {
    const updates: Record<string, string> = {};
    pageKeys.forEach((key) => {
      const next = draft[key] ?? '';
      if (next !== (values[key] ?? '')) updates[key] = next;
    });

    if (Object.keys(updates).length === 0) {
      toast({ title: 'No changes', description: 'Edit some text or a photo, then save.' });
      return;
    }

    setSaving(true);
    const result = await savePage(page.id, updates);
    setSaving(false);

    if (!result.ok) {
      toast({
        title: 'Could not save',
        description: result.error || 'Try again in a moment.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Saved',
      description: `${page.title} is updated on the website.`,
    });
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      `Restore the original text and photos for ${page.title}? This removes the edits saved for this page.`,
    );
    if (!confirmed) return;

    setSaving(true);
    const result = await resetPage(page.id, pageKeys);
    setSaving(false);

    if (!result.ok) {
      toast({
        title: 'Could not restore',
        description: result.error || 'Try again in a moment.',
        variant: 'destructive',
      });
      return;
    }

    setDraft((current) => {
      const next = { ...current };
      pageKeys.forEach((key) => {
        next[key] = DEFAULT_CONTENT[key] ?? '';
      });
      return next;
    });

    toast({
      title: 'Restored',
      description: `${page.title} is back to the original wording and photos.`,
    });
  };

  if (!authState.isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-sand-lightest">
      <div className="bg-charcoal-dark text-white py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-2">Admin</p>
              <h1 className="text-3xl font-serif font-light mb-2">Edit website</h1>
              <p className="text-sand text-sm max-w-xl">
                Change the wording and photos. The layout, fonts, and buttons stay as they are.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 border border-white/20 text-sm hover:border-bronze hover:text-bronze transition-colors"
              >
                Enquiries
              </button>
              <button
                onClick={() => {
                  logoutAdmin();
                  navigate('/admin/login');
                }}
                className="flex items-center gap-2 bg-bronze hover:bg-bronze/80 px-4 py-2 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 pb-28">
        {dbError && (
          <div className="mb-6 border border-bronze/40 bg-white px-5 py-4 text-sm text-charcoal leading-relaxed">
            {dbError}
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-4">
          {CONTENT_PAGES.map((item) => (
            <button
              key={item.id}
              onClick={() => setPageId(item.id)}
              className={`px-4 py-2 text-sm whitespace-nowrap border transition-colors ${
                item.id === page.id
                  ? 'bg-charcoal-dark text-white border-charcoal-dark'
                  : 'bg-white text-charcoal border-sand hover:border-bronze'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <a
            href={page.path}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-bronze hover:text-bronze-dark"
          >
            View {page.title} page
            <ExternalLink size={14} />
          </a>
          <button
            onClick={handleReset}
            disabled={saving}
            className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal disabled:opacity-50"
          >
            <RotateCcw size={14} />
            Restore original
          </button>
        </div>

        <div className="space-y-6">
          {page.sections.map((section) => (
            <section key={section.id} className="bg-white border border-sand/40 p-6 lg:p-8">
              <h2 className="font-serif text-2xl text-charcoal font-light mb-6">{section.title}</h2>
              <div className="space-y-6">
                {section.fields.map((item) => (
                  <FieldEditor
                    key={item.key}
                    field={item}
                    value={draft[item.key] ?? item.defaultValue}
                    uploading={uploadingKey === item.key}
                    onChange={(value) => updateField(item.key, value)}
                    onImage={(file) => handleImage(item.key, file)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 border-t border-sand backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-charcoal/50">
            {dirty ? 'You have unsaved changes on this page.' : 'All changes on this page are saved.'}
          </p>
          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            className="px-6 py-3 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : `Save ${page.title}`}
          </button>
        </div>
      </div>
    </div>
  );
};

const FieldEditor: React.FC<{
  field: ContentField;
  value: string;
  uploading: boolean;
  onChange: (value: string) => void;
  onImage: (file: File | undefined) => void;
}> = ({ field, value, uploading, onChange, onImage }) => {
  const inputClass =
    'w-full px-4 py-3 bg-sand-lightest border border-sand/50 text-sm text-charcoal focus:outline-none focus:border-bronze/60';

  return (
    <label className="block">
      <span className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-charcoal/50 mb-2">
        {field.label}
      </span>
      {field.kind === 'image' ? (
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-full sm:w-56 aspect-[4/3] bg-sand-lightest border border-sand/40 overflow-hidden">
            {value ? (
              <img src={value} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-charcoal/40">No photo</div>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(event) => {
                onImage(event.target.files?.[0]);
                event.target.value = '';
              }}
              className="block text-sm text-charcoal file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-charcoal-dark file:text-white file:text-xs file:tracking-wider file:uppercase"
            />
            <p className="mt-2 text-xs text-charcoal/45">
              {uploading ? 'Preparing photo...' : 'Choose a new photo. It replaces this one and keeps the same frame.'}
            </p>
          </div>
        </div>
      ) : field.kind === 'short' ? (
        <input className={inputClass} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <textarea
          className={`${inputClass} min-h-[120px] resize-y leading-relaxed`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {field.help && <p className="mt-2 text-xs text-charcoal/45">{field.help}</p>}
    </label>
  );
};

export default AdminContent;
