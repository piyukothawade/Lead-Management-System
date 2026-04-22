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

function Profile() {
  const [tab, setTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Bonnie Green",
    email: "bonnie@example.com",
    phone: "+91 9876543210",
    avatar: "https://i.pravatar.cc/100?img=5",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: url });
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <h1 className="text-xl font-semibold text-gray-800">
        Profile
      </h1>

      {/* 🔥 Tabs (Improved UI) */}
      <div className="flex gap-6 border-b">
        <button
          onClick={() => setTab("profile")}
          className={`pb-2 text-sm font-medium transition-all ${
            tab === "profile"
              ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Profile
        </button>

        <button
          onClick={() => setTab("security")}
          className={`pb-2 text-sm font-medium transition-all ${
            tab === "security"
              ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Security
        </button>
      </div>

      {/* ================= PROFILE TAB ================= */}
      {tab === "profile" && (
        <Card>

          <div className="flex flex-col md:flex-row gap-6">

            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">

              <img
                src={profile.avatar}
                className="w-24 h-24 rounded-full object-cover border"
              />

              <label className="text-sm text-[var(--primary)] cursor-pointer hover:underline">
                Change Photo
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Form */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-600">
                  Full Name
                </label>
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Email
                </label>
                <Input
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Phone
                </label>
                <Input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                />
              </div>

            </div>

          </div>

          {/* ✅ Save Button */}
          <div className="flex justify-end mt-6">
            <Button>
              Save Changes
            </Button>
          </div>

        </Card>
      )}

      {/* ================= SECURITY TAB ================= */}
      {tab === "security" && (
        <Card>

          <h2 className="text-lg font-semibold mb-4">
            Change Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">
                Current Password
              </label>
              <Input
                type="password"
                value={password.current}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    current: e.target.value,
                  })
                }
              />
            </div>

            <div />

            <div>
              <label className="text-sm text-gray-600">
                New Password
              </label>
              <Input
                type="password"
                value={password.new}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    new: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Confirm Password
              </label>
              <Input
                type="password"
                value={password.confirm}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirm: e.target.value,
                  })
                }
              />
            </div>

          </div>

          {/* ✅ Update Button */}
          <div className="flex justify-end mt-6">
            <Button>
              Update Password
            </Button>
          </div>

        </Card>
      )}

    </div>
  );
}

export default Profile;