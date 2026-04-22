// src/components/dashboard/StatsCard.jsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

function StatsCard({ title, value, gradient, change, icon }) {
  return (
    <div className={`p-4 rounded-xl text-white shadow ${gradient}`}>

      <p className="text-sm opacity-80">{title}</p>

      <h2 className="text-xl font-semibold mt-1">{value}</h2>

      {change && (
        <div className="flex items-center gap-1 text-sm mt-2">
          {icon}
          {change}
        </div>
      )}

    </div>
  );
}



export default StatsCard;