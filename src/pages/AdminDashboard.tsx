import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getAdminAuthState, logoutAdmin } from '@/lib/auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogOut, ChevronUp, ChevronDown, Eye, PenLine } from 'lucide-react';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  company: string;
  incentive_type: string;
  meeting_date: string;
  no_of_delegates: number;
  message: string;
  status: 'new' | 'in progress' | 'closed';
  created_at: string;
}

type SortField = 'name' | 'company' | 'created_at' | 'status';
type SortOrder = 'asc' | 'desc';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const authState = getAdminAuthState();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Check authentication
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authState, navigate]);

  // Fetch enquiries
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch enquiries',
          variant: 'destructive',
        });
        return;
      }

      setEnquiries(data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch enquiries',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (enquiryId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', enquiryId);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update status',
          variant: 'destructive',
        });
        return;
      }

      // Update local state
      setEnquiries(
        enquiries.map((e) =>
          e.id === enquiryId ? { ...e, status: newStatus as any } : e
        )
      );

      // Update selected enquiry if it's open
      if (selectedEnquiry?.id === enquiryId) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as any });
      }

      toast({
        title: 'Success',
        description: 'Status updated',
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const getSortedEnquiries = () => {
    const sorted = [...enquiries].sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === 'created_at') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-2 font-semibold hover:text-bronze transition-colors"
    >
      {label}
      {sortField === field && (
        sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
      )}
    </button>
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sand-lightest">
      {/* Header */}
      <div className="bg-charcoal-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-light mb-2">Admin Dashboard</h1>
              <p className="text-sand text-sm">
                Logged in as: <span className="font-semibold">{authState.email}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/admin/content')}
                className="flex items-center gap-2 border border-white/20 hover:border-bronze hover:text-bronze px-4 py-2 transition-colors"
              >
                <PenLine size={18} />
                Edit website
              </button>
              <button
                onClick={() => {
                  logoutAdmin();
                  navigate('/admin/login');
                }}
                className="flex items-center gap-2 bg-bronze hover:bg-bronze/80 px-4 py-2 rounded transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-sand-light px-6 py-4 border-b border-sand">
            <h2 className="text-lg font-semibold text-charcoal">
              Enquiries ({enquiries.length})
            </h2>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="px-6 py-12 text-center text-charcoal/60">
              Loading enquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="px-6 py-12 text-center text-charcoal/60">
              No enquiries yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-sand-light hover:bg-sand-light">
                    <TableHead className="py-4">
                      <SortHeader field="name" label="Name" />
                    </TableHead>
                    <TableHead className="py-4">Email</TableHead>
                    <TableHead className="py-4">
                      <SortHeader field="company" label="Company" />
                    </TableHead>
                    <TableHead className="py-4">Incentive Type</TableHead>
                    <TableHead className="py-4">
                      <SortHeader field="created_at" label="Date" />
                    </TableHead>
                    <TableHead className="py-4">
                      <SortHeader field="status" label="Status" />
                    </TableHead>
                    <TableHead className="py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getSortedEnquiries().map((enquiry) => (
                    <TableRow key={enquiry.id} className="border-b border-sand hover:bg-sand-lightest">
                      <TableCell className="font-medium text-charcoal">
                        {enquiry.name}
                      </TableCell>
                      <TableCell className="text-charcoal/60">{enquiry.email}</TableCell>
                      <TableCell className="text-charcoal/60">{enquiry.company}</TableCell>
                      <TableCell className="text-charcoal/60">
                        {enquiry.incentive_type || '-'}
                      </TableCell>
                      <TableCell className="text-charcoal/60">
                        {formatDate(enquiry.created_at)}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={enquiry.status}
                          onValueChange={(value) =>
                            handleStatusChange(enquiry.id, value)
                          }
                        >
                          <SelectTrigger className={`w-32 ${getStatusColor(enquiry.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in progress">In Progress</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enquiry);
                            setShowDetailModal(true);
                          }}
                          className="flex items-center gap-2 text-bronze hover:text-bronze/80 transition-colors"
                        >
                          <Eye size={18} />
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              Full information for this enquiry
            </DialogDescription>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <p className="text-charcoal">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <p className="text-charcoal">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <p className="text-charcoal">{selectedEnquiry.company}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    No. of Delegates
                  </label>
                  <p className="text-charcoal">
                    {selectedEnquiry.no_of_delegates || '-'}
                  </p>
                </div>
              </div>

              {/* Programme Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    Incentive Type
                  </label>
                  <p className="text-charcoal">
                    {selectedEnquiry.incentive_type || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <p className="text-charcoal">
                    {selectedEnquiry.meeting_date || '-'}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                  Message
                </label>
                <p className="text-charcoal bg-sand-lightest p-4 rounded">
                  {selectedEnquiry.message || '-'}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sand">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <Select
                    value={selectedEnquiry.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedEnquiry.id, value);
                    }}
                  >
                    <SelectTrigger className={`w-full ${getStatusColor(selectedEnquiry.status)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    Received
                  </label>
                  <p className="text-charcoal">
                    {formatDate(selectedEnquiry.created_at)}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setShowDetailModal(false)}
                className="w-full"
                variant="outline"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
