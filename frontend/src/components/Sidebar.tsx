import {
  LayoutDashboard,
  Activity,
  Brain,
  ClipboardList,
} from "lucide-react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-[#efeafb] border-r border-[#ddd6fe] p-6 shadow-sm">

      <h1 className="text-3xl font-bold text-violet-700 mb-12">
        Femisync
      </h1>

      <nav className="space-y-6">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-gray-700 hover:text-violet-700 transition font-medium"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/checkin"
          className="flex items-center gap-3 text-gray-700 hover:text-violet-700 transition font-medium"
        >
          <ClipboardList size={22} />
          Check-In
        </Link>

        <Link
          to="/analytics"
          className="flex items-center gap-3 text-gray-700 hover:text-violet-700 transition font-medium"
        >
          <Activity size={22} />
          Analytics
        </Link>

        <Link
          to="/insights"
          className="flex items-center gap-3 text-gray-700 hover:text-violet-700 transition font-medium"
        >
          <Brain size={22} />
          AI Insights
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;