import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

import axios from "axios";
import { useToast } from "../../components/ui/ToastContext";

// Card
function Card({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {children}
    </div>
  );
}

// Skeleton
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
}

// Chart Skeleton
function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse h-[250px]" />
  );
}

function Dashboard() {
  const { showToast } = useToast();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#7A1CAC", "#AD49E1", "#EBD3F8", "#2E073F"];

  // ================= FETCH DASHBOARD =================
  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/leads/dashboard/stats"
      );

      setStats(res.data);
      showToast("Dashboard loaded", "success");
    } catch (error) {
      showToast("Failed to load dashboard", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ================= FORMAT DATA =================
  const sourceData =
    stats?.leadsBySource?.map((item) => ({
      name: item._id,
      value: item.count,
    })) || [];

  const statusData =
    stats?.statusDistribution?.map((item) => ({
      name: item._id,
      value: item.count,
    })) || [];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>

        <button
          onClick={fetchStats}
          className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"
        >
          Refresh
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <Card>
              <p className="text-sm text-gray-500">Total Leads</p>
              <h2 className="text-2xl font-bold mt-2">
                {stats?.totalLeads || 0}
              </h2>
            </Card>

            <Card>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <h2 className="text-2xl font-bold mt-2">
                {stats?.conversionRate || 0}%
              </h2>
            </Card>

            <Card>
              <p className="text-sm text-gray-500">Sources</p>
              <h2 className="text-2xl font-bold mt-2">
                {sourceData.length}
              </h2>
            </Card>
          </>
        )}
      </div>

      {/* EMPTY STATE */}
      {!loading && sourceData.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          No dashboard data available
        </div>
      )}

      {/* CHARTS */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Bar */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">
                Leads by Source
              </h2>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sourceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7A1CAC" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">
                Status Distribution
              </h2>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {(statusData || []).map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

          </div>

          {/* OPTIONAL LINE (only if you add API later) */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">
              Leads Trend
            </h2>

            <div className="text-center text-gray-400">
              Trend API not implemented yet
            </div>
          </Card>
        </>
      )}

    </div>
  );
}

export default Dashboard;