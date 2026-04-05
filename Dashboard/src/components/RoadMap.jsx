import React, { useRef } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Legislation",
    status: "Completed",
    icon: "✅",
    desc: "Operationalization of the WSS act and regulations. Establishment of the SRIMS Section.",
  },
  {
    id: 2,
    title: "Methodology",
    status: "Completed",
    icon: "✅",
    desc: "Development of new methodology for KPI measurement in line with Regulations 2081.",
  },
  {
    id: 3,
    title: "Mobilization",
    status: "Completed",
    icon: "✅",
    desc: "Workshops targeting 75 service providers across all 7 provinces. Data collection phase.",
  },
  {
    id: 4,
    title: "Validation",
    status: "In Progress",
    icon: "⏳",
    desc: "Independent validation of methodology and data through field visits to operators.",
  },
  {
    id: 5,
    title: "Research & Planning",
    status: "Pending",
    icon: "🔒",
    desc: "Data analysis of 87 operators. Development of Business plan templates.",
  },
  {
    id: 6,
    title: "Incentivize",
    status: "Pending",
    icon: "🔒",
    desc: "Budget allocation prioritization based on readiness metrics and business plans.",
  },
  {
    id: 7,
    title: "Governance",
    status: "Pending",
    icon: "🔒",
    desc: "Deployment of Live dashboard. Real-time milestone and contribution tracking.",
  },
  {
    id: 8,
    title: "Publication & Policy",
    status: "Pending",
    icon: "🔒",
    desc: "Peer-reviewed journal publication. Policy dialogues and framework reformations.",
  },
];

const RoadMap = () => {
  const scrollRef = useRef(null);

  return (
    <div className="py-20">
      {/* Title Section */}
      <div className="px-6 lg:px-20 mb-16">
        <h3 className="text-4xl font-black uppercase tracking-tighter text-blue-400 italic mb-4">
          Workflow Progression
        </h3>
        <p className="text-blue-100/60 font-medium max-w-2xl">
          Nepal's Regulatory Stride in WASH. Use shift + scroll or drag to
          explore the journey from legislation to policy reformation.
        </p>
      </div>

      {/* Horizontal Scroll Container - Now transparent and flush with the main container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden gap-8 px-6 lg:px-20 pb-20 no-scrollbar cursor-grab active:cursor-grabbing relative"
      >
        {/* The Animated Connecting Path Line */}
        <div className="absolute top-[60px] left-0 h-1 bg-white/10 w-[3200px] z-0" />
        <div className="absolute top-[60px] left-0 h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-transparent w-[1200px] z-0 shadow-[0_0_15px_rgba(34,197,94,0.4)]" />

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative min-w-[380px] z-10"
          >
            {/* The Node Marker */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-xl mb-10 mx-auto border-2 transition-all duration-500
              ${
                step.status === "Completed"
                  ? "border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] bg-green-950/20"
                  : step.status === "In Progress"
                  ? "border-yellow-500 text-yellow-400 animate-pulse bg-yellow-950/20"
                  : "border-white/20 text-white/30 bg-white/5"
              }`}
            >
              {step.icon}
            </div>

            {/* The Content Card */}
            <div
              className={`p-8 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 group hover:-translate-y-3
              ${
                step.status === "Completed"
                  ? "bg-white/10 border-white/20"
                  : step.status === "In Progress"
                  ? "bg-white/10 border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "bg-white/5 border-white/10 opacity-60"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.2em] 
                  ${
                    step.status === "Completed"
                      ? "text-green-400"
                      : step.status === "In Progress"
                      ? "text-yellow-400"
                      : "text-white/40"
                  }`}
                >
                  Phase {String(step.id).padStart(2, "0")}
                </span>
                <span className="text-3xl font-black text-white/5 italic opacity-20 group-hover:opacity-100 transition-opacity">
                  {String(step.id).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-black mb-4 text-white">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed text-blue-100/70 font-medium">
                {step.desc}
              </p>

              <button className="mt-6 text-[10px] font-black tracking-widest text-blue-400 hover:text-white transition-all uppercase">
                View Details —
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadMap;
