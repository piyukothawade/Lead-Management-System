import { useState, useEffect } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmationModal";
import Skeleton from "../../components/ui/Skeleton";
import { Badge } from "../../components/ui/badge";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

import {
  getLeads,
  createLead,
  deleteLead,
  updateLead,
} from "../../services/lead.api";

import { useToast } from "../../components/ui/ToastContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema } from "../../components/validation/lead.schema";

function Leads() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [sourceFilter, setSourceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("latest");

  const [leads, setLeads] = useState([]);

  // ✅ PAGINATION
  const [page, setPage] = useState(1);
  const limit = 5;

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
  });

  // ================= DEBOUNCE =================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ================= FETCH =================
  const fetchLeads = async () => {
    try {
      setLoading(true);

      const params = {
        search: debouncedSearch,
        sortBy: sort === "latest" ? "date" : "budget",
      };

      if (sourceFilter !== "All") params.source = sourceFilter;
      if (statusFilter !== "All") params.status = statusFilter;

      const res = await getLeads(params);
      setLeads(res.data || []);
    } catch {
      showToast("Failed to fetch leads", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch, sourceFilter, statusFilter, sort]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sourceFilter, statusFilter, sort]);

  // ================= PAGINATION LOGIC =================
  const totalPages = Math.ceil(leads.length / limit);

  const paginatedLeads = leads.slice(
    (page - 1) * limit,
    page * limit
  );

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateLead(selectedId, data);
        showToast("Lead updated", "success");
      } else {
        await createLead(data);
        showToast("Lead added", "success");
      }

      setOpenModal(false);
      fetchLeads();
      reset();
      setIsEdit(false);
      setSelectedId(null);
    } catch {
      showToast("Save failed", "error");
    }
  };

  // ================= EDIT =================
  const handleEdit = (lead) => {
    setIsEdit(true);
    setSelectedId(lead._id);

    Object.keys(lead).forEach((key) => {
      setValue(key, lead[key]);
    });

    setOpenModal(true);
  };

  // ================= DELETE =================
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteLead(selectedId);
      showToast("Lead deleted", "info");
      fetchLeads();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setConfirmOpen(false);
    }
  };

  // ================= STATUS =================
  const getStatusVariant = (status) => {
    if (status === "Closed") return "success";
    if (status === "Site Visit") return "warning";
    if (status === "Contacted") return "secondary";
    return "error";
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <Card noBorder>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[var(--primary)]">
          Leads
        </h1>

        <Button onClick={() => setOpenModal(true)}>
          <Plus size={16} className="mr-1" /> Add Lead
        </Button>
      </div>

      <Card noBorder>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-4">

          <Input
            placeholder="Search name or phone..."
            className="w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="border px-3 py-2 rounded-md text-sm">
            <option>All</option>
            <option>Facebook</option>
            <option>Google</option>
            <option>Referral</option>
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded-md text-sm">
            <option>All</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Site Visit</option>
            <option>Closed</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border px-3 py-2 rounded-md text-sm">
            <option value="latest">Latest</option>
            <option value="budget">Budget</option>
          </select>

        </div>

        {/* TABLE */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedLeads.map((lead) => (
              <TableRow key={lead._id} onClick={() => navigate(`/leads/${lead._id}`)}>
                <TableCell >
                  {lead.name}
                </TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>₹{lead.budget}</TableCell>
                <TableCell>{lead.location}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <Badge type={getStatusVariant(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEdit(lead)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(lead._id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ✅ PAGINATION (PRODUCT STYLE) */}
        <div className="flex justify-between items-center mt-4">

          <p className="text-sm text-gray-500">
            Showing {(page - 1) * limit + 1}–
            {Math.min(page * limit, leads.length)} of {leads.length}
          </p>

          <div className="flex items-center gap-1">

            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-2 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border text-sm ${
                  page === i + 1
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </div>

      </Card>

      {/* MODALS */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Lead?"
        description="Are you sure you want to delete this lead?"
      />

    </div>
  );
}

export default Leads;