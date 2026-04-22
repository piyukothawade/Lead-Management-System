import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

// Card Wrapper
function Card({ children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
      {children}
    </div>
  );
}

// 🔥 Toggle (THEME BASED)
function Toggle({ enabled, setEnabled }) {
  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`w-11 h-6 flex items-center rounded-full cursor-pointer p-1 transition ${
        enabled ? "bg-[var(--primary)]" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </div>
  );
}

function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [appNotif, setAppNotif] = useState(true);
  const [language, setLanguage] = useState("English");

  const [account, setAccount] = useState({
    name: "Bonnie Green",
    email: "bonnie@example.com",
  });

  return (
    <div className="space-y-6">

      <h1 className="text-xl font-semibold text-gray-800">
        Settings
      </h1>

      {/* ================= GENERAL ================= */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">
          General Settings
        </h2>

        <div className="flex justify-between items-center">
          <p className="font-medium">Language</p>

          <select
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>
      </Card>

      {/* ================= NOTIFICATIONS ================= */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">
          Notifications
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">
                Receive updates via email
              </p>
            </div>
            <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">App Notifications</p>
              <p className="text-sm text-gray-500">
                Push notifications in app
              </p>
            </div>
            <Toggle enabled={appNotif} setEnabled={setAppNotif} />
          </div>

        </div>
      </Card>

      {/* ================= ACCOUNT ================= */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">
          Account Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600">
              Name
            </label>
            <Input
              value={account.name}
              onChange={(e) =>
                setAccount({ ...account, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>
            <Input
              value={account.email}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
          </div>

        </div>

        {/* ✅ Button Fixed */}
        <div className="flex justify-end mt-6">
          <Button>
            Save Changes
          </Button>
        </div>
      </Card>

    </div>
  );
}

export default Settings;