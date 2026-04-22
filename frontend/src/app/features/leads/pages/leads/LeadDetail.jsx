import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";

import {
  getLeadById,
  updateLead,
  addNote,
} from "../../services/lead.api";

import { useToast } from "../../components/ui/ToastContext";

function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [lead, setLead] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchLead = async () => {
    try {
      setLoading(true);
      const res = await getLeadById(id);
      setLead(res.data);
    } catch (error) {
      showToast("Failed to load lead", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  // ================= STATUS UPDATE =================
  const updateStatus = async (newStatus) => {
    try {
      await updateLead(id, { status: newStatus });
      showToast("Status updated", "success");
      fetchLead();
    } catch (error) {
      showToast("Status update failed", "error");
    }
  };

  // ================= ADD NOTE =================
  const handleAddNote = async () => {
    if (!note.trim()) return;

    try {
      await addNote(id, { text: note });
      showToast("Note added", "success");
      setNote("");
      fetchLead();
    } catch (error) {
      showToast("Failed to add note", "error");
    }
  };

  // ================= STATUS STYLE =================
  const getStatusVariant = (status) => {
    if (status === "Closed") return "success";
    if (status === "Site Visit") return "warning";
    if (status === "Contacted") return "secondary";
    return "error";
  };

  // ================= SKELETON =================
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">

        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            <Card>
              <div className="h-6 w-40 bg-gray-200 mb-4 rounded" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded" />
                ))}
              </div>
            </Card>

            <Card>
              <div className="h-6 w-40 bg-gray-200 mb-4 rounded" />
              <div className="h-10 bg-gray-200 rounded mb-3" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded mb-2" />
              ))}
            </Card>

          </div>

          <div className="space-y-6">
            <Card>
              <div className="h-6 w-32 bg-gray-200 mb-3 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
            </Card>

            <Card>
              <div className="h-6 w-32 bg-gray-200 mb-3 rounded" />
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </Card>
          </div>

        </div>
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-semibold text-[var(--primary)]">
            {lead.name}
          </h1>
          <p className="text-sm text-gray-500">
            Lead ID: {lead._id}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge type={getStatusVariant(lead.status)}>
            {lead.status}
          </Badge>

          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <Card noBorder>
            <h2 className="text-lg font-semibold mb-4">
              Lead Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Info label="Phone" value={lead.phone} />
              <Info label="Email" value={lead.email} />
              <Info label="Budget" value={`₹${lead.budget?.toLocaleString()}`} />
              <Info label="Location" value={lead.location} />
              <Info label="Property Type" value={lead.propertyType} />
              <Info label="Source" value={lead.source} />
            </div>
          </Card>

          {/* NOTES */}
          <Card noBorder>
            <h2 className="text-lg font-semibold mb-4">
              Activity / Notes
            </h2>

            <div className="flex gap-2 mb-5">
              <Input
                placeholder="Write a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button onClick={handleAddNote}>Add</Button>
            </div>

            <div className="space-y-4">

              {(!lead.notes || lead.notes.length === 0) && (
                <p className="text-sm text-gray-400">
                  No activity yet
                </p>
              )}

              {lead.notes?.map((n, i) => (
                <div key={i} className="flex gap-3">

                  <div className="w-2 h-2 mt-2 bg-[var(--primary)] rounded-full" />

                  <div className="flex-1 bg-gray-50 p-3 rounded-md border text-sm">
                    {n.text}

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.date).toLocaleString()}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </Card>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <Card noBorder>
            <h3 className="text-sm font-semibold mb-3 text-gray-600">
              Update Status
            </h3>

            <select
              value={lead.status}
              onChange={(e) => updateStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Site Visit</option>
              <option>Closed</option>
            </select>
          </Card>

          <Card noBorder>
            <h3 className="text-sm font-semibold mb-3 text-gray-600">
              Quick Actions
            </h3>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => window.open(`tel:${lead.phone}`)}
              >
                Call Lead
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(`mailto:${lead.email}`)}
              >
                Send Email
              </Button>

              <Button variant="outline">
                Schedule Visit
              </Button>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}

// REUSABLE FIELD
function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

export default LeadDetail;