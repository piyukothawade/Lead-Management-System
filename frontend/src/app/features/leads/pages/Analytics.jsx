// src/pages/Analytics.jsx
import RevenueChart from "@/components/charts/RevenueChart";

function Analytics() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <RevenueChart />
      <RevenueChart />
    </div>
  );
}

export default Analytics;