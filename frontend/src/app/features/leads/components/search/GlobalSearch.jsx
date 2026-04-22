import { useEffect } from "react";

function GlobalSearch({ open, setOpen }) {

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-32 z-50">
      
      <div className="w-[500px] bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-4">
        
        <input
          autoFocus
          placeholder="Search anything..."
          className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800 outline-none"
        />

        <div className="mt-4 text-sm text-gray-500">
          <p>Dashboard</p>
          <p>Users</p>
          <p>Analytics</p>
        </div>
      </div>

    </div>
  );
}

export default GlobalSearch;