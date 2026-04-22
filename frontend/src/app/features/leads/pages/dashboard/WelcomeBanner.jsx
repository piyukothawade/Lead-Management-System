// src/components/dashboard/WelcomeBanner.jsx
function WelcomeBanner() {
  return (
    <div className="w-full rounded-2xl p-6 mb-6 text-white 
      bg-gradient-to-r from-[#7A1CAC] to-[#AD49E1] 
      flex justify-between items-center"
    >
      {/* Left Content */}
      <div>
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, Admin 👋
        </h2>
        <p className="text-sm opacity-90">
          Here's what's happening with your dashboard today.
        </p>

        {/* Small Card */}
        <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
          <span className="text-lg font-semibold">28°</span>
          <span className="ml-2 text-sm">System Health Good</span>
        </div>
      </div>

      {/* Right Image (Optional Placeholder) */}
      <div className="hidden md:block">
        <div className="w-40 h-24 bg-white/20 rounded-xl flex items-center justify-center">
          <span className="text-sm">Analytics</span>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;