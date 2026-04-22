// src/components/notifications/NotificationPanel.jsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "../../components/ui/dropdown-menu";
import { Bell } from "lucide-react";

const notifications = [
  {
    name: "Jose Leos",
    message: 'Added you to an event "Project stand-up"',
    time: "a few moments ago",
    img: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "Neil Sims",
    message: "Assigned you a task",
    time: "2 hrs ago",
    img: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Roberta Casas",
    message: "Tagged you in a document",
    time: "5 hrs ago",
    img: "https://i.pravatar.cc/40?img=3",
  },
];

function NotificationPanel() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <Bell size={18} className="text-gray-700" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-0 bg-white border shadow-lg rounded-xl">
        
        {/* Header */}
        <div className="p-3 border-b font-semibold">
          Notifications
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 p-3 hover:bg-gray-50 cursor-pointer"
            >
              <img
                src={item.img}
                className="w-10 h-10 rounded-full"
              />

              <div className="text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 text-xs">
                  {item.message}
                </p>
                <p className="text-gray-400 text-xs">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-2 text-center text-sm text-purple-600 cursor-pointer hover:bg-gray-50">
          View all
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationPanel;