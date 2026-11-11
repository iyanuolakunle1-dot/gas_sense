import React from "react";
import BottomNav from "../components/BottomNav";

const AlertsPage = () => (
  <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
    <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-[26px] sm:text-3xl font-extrabold text-[#0D2329]">Alerts &amp; Activity</h1>
      <p className="text-xs sm:text-sm text-[#6C807D] font-medium mt-1">Alerts reported by your GasSense account.</p>
      <section className="mt-6 text-center py-16 bg-white rounded-[26px] border border-[#E9EFEF] text-[#6C807D] text-sm font-semibold">
        No alerts have been reported.
      </section>
    </main>
    <BottomNav active="home" />
  </div>
);

export default AlertsPage;
