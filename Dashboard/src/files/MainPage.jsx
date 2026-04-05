import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import RoadMap from "../components/RoadMap";
import Leaderboard from "../components/Leaderboard";
import Partners from "../components/Partners";

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const colors = {
    bg: "#1E3A8A",
    textPrimary: "#FFFFFF",
  };

  const steps = [
    { id: 1, title: "Step 01", desc: "Legislation" },
    { id: 2, title: "Step 02", desc: "Methodology" },
    { id: 3, title: "Step 03", desc: "Mobilization" },
    { id: 4, title: "Step 04", desc: "Validation" },
    { id: 5, title: "Step 05", desc: "Research and Planning" },
    { id: 6, title: "Step 06", desc: "Governance" },
    { id: 7, title: "Step 07", desc: "Incentivize" },
    { id: 8, title: "Step 08", desc: "Publication and Policy" },
  ];

  return (
    <div
      className="flex min-h-screen font-sans overflow-hidden"
      style={{ backgroundColor: colors.bg, color: colors.textPrimary }}
    >
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 overflow-y-auto h-screen scroll-smooth">
        {/* HERO SECTION - FORCED TO FULL HEIGHT */}
        <section className="min-h-[calc(100vh-40px)] flex flex-col justify-center p-6 lg:p-20 max-w-7xl mx-auto">
          {/* Glass Tag Container */}
          <div className="inline-block w-fit px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="text-[10px] font-bold tracking-widest text-blue-200 uppercase">
              DWSSM / SRIMS
            </span>
          </div>

          {/* Main Hero Text */}
          <h2 className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-8 max-w-5xl uppercase">
            Regulatory Roadmap & <br />
            Partner Coordination <br />
            Dashboard (RRPCD)
          </h2>

          {/* Action Button */}
          <button className="w-fit px-8 py-4 bg-white/20 backdrop-blur-md rounded-xl font-bold border border-white/20 hover:bg-blue-500 transition-all shadow-lg text-sm uppercase tracking-wider mb-20">
            Learn more about our mission
          </button>

          {/* Search Inputs Row */}
          <div className="flex flex-wrap gap-8 items-center w-full">
            {/* Search Operators Bar */}
            <div className="flex-1 min-w-[320px] relative group">
              <div className="flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1 pl-6 shadow-2xl transition-all hover:scale-[1.01] focus-within:bg-white/20 focus-within:border-blue-400">
                <span className="text-xl opacity-50 mr-3">🔍</span>
                <input
                  type="text"
                  placeholder="SEARCH OPERATORS"
                  className="bg-transparent border-none outline-none flex-1 text-sm font-black tracking-widest uppercase placeholder:text-white/30"
                />
                <button className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-500 transition-all">
                  <div className="w-5 h-5 flex items-center justify-center">
                    🚪
                  </div>
                </button>
              </div>
            </div>

            {/* Search Partners Bar (Peach/Gradient style) */}
            <div className="flex-1 min-w-[320px] relative group">
              <div className="flex items-center bg-gradient-to-r from-blue-200/20 to-orange-200/20 backdrop-blur-xl border border-white/30 rounded-full p-1 pl-6 shadow-2xl transition-all hover:scale-[1.01]  focus-within:bg-white/20 focus-within:border-blue-400">
                <span className="text-xl opacity-50 mr-3">🔍</span>
                <input
                  type="text"
                  placeholder="SEARCH OUR PARTNERS"
                  className="bg-transparent border-none outline-none flex-1 text-sm font-black tracking-widest uppercase placeholder:text-blue-900/60"
                />
                <button className="bg-gradient-to-tr from-orange-300 to-rose-400 text-white p-4 rounded-full shadow-lg hover:brightness-110 transition-all">
                  <div className="w-5 h-5 flex items-center justify-center">
                    🚪
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW TIMELINE*/}
        <section className="relative w-full py-32 px-10 mt-15 overflow-hidden rounded-[4rem] bg-blue-700/30 border border-white/10 max-w-7xl mx-auto mb-20">
          <RoadMap />
        </section>

        {/* Partners Dashboard*/}
        <section className="relative w-full py-10 px-10 mt-15 overflow-hidden bg-slate-900/40 mx-auto mb-20">
          <Partners />
        </section>

        {/* Leadrboard and charts*/}
        <section className="relative w-full py-12 px-10 mt-15 overflow-hidden rounded-[4rem] bg-blue-700/30 border border-white/10 max-w-7xl mx-auto mb-10">
          <Leaderboard />
        </section>

        {/* Footer Status */}
        <div className="pb-10 pr-10 flex justify-end max-w-7xl mx-auto">
          <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs font-bold tracking-widest uppercase">
              System Status: Online
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
