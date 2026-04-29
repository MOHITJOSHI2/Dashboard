import React from "react";
import { motion } from "framer-motion";
import worldBank from "../assets/worldBank.jpeg";
import waterAid from "../assets/wateraid.jpeg";
import whh from "../assets/whh.jpeg";

const partners = [
  {
    name: "The World Bank",
    role: "Strategy & Finance",
    desc: "Primary stakeholder in the validation and mobilization phases.",
    icon: worldBank,
    progress: "80%",
    barColor: "bg-blue-400",
    tags: [{ text: "$1.5M Commitment", pos: "top-0 -left-10" }],
  },
  {
    name: "WaterAid",
    role: "Technical Support",
    desc: "Crucial partner in mobilization and on-ground validation workshops.",
    icon: waterAid,
    progress: "60%",
    barColor: "bg-purple-400",
    tags: [
      { text: "Field Pilots", pos: "-top-10 left-10" },
      { text: "Live Dashboard", pos: "top-10 -right-10" },
      { text: "Methodology Validation", pos: "top-30 -left-8" },
      { text: "Workshop Support", pos: "top-60 -right-12" },
    ],
  },
  {
    name: "WHH",
    role: "Digital Solutions",
    desc: "Technical leadership in GIS mapping and dashboard governance.",
    icon: whh,
    progress: "40%",
    barColor: "bg-indigo-400",
    tags: [
      { text: "GIS Mapping", pos: "-top-6 -left-12" },
      { text: "Tech Training", pos: "bottom-20 -right-10" },
    ],
  },
];

const Partners = () => {
  return (
    <div className="py-24 px-6 lg:px-20">
      <div className="mb-16">
        <h3 className="text-4xl font-black uppercase tracking-tighter text-blue-400 italic mb-4">
          Partners Dashboard
        </h3>
        <p className="text-blue-100/60 font-medium max-w-2xl">
          Tracking the financial commitment and legacy of each helping hand in
          streamlining regulation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 mt-16">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] flex flex-col items-center text-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
          >
            {/* The Floating Bubble Orbs */}
            {partner.tags.map((tag, i) => (
              <div
                key={i}
                className={`absolute ${tag.pos} opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-20 
                w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/80 to-blue-900/90 backdrop-blur-md 
                flex items-center justify-center p-3 text-[10px] font-black leading-tight text-white shadow-2xl border border-white/20`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {tag.text}
              </div>
            ))}

            {/* Icon Container */}
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-6 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <img src={partner.icon} alt="" className="w-full rounded-full" />
            </div>

            <h4 className="text-2xl font-black mb-2 text-white">
              {partner.name}
            </h4>
            <p className="text-sm font-bold text-blue-300 mb-6 uppercase tracking-widest opacity-60">
              {partner.role}
            </p>

            <p className="text-sm leading-relaxed text-blue-100/70 font-medium mb-8">
              {partner.desc}
            </p>

            {/* Progress Bar Section */}
            <div className="w-full mt-auto">
              <div className="flex justify-between text-[10px] font-black tracking-widest text-blue-400 mb-2 uppercase">
                <span>Contribution Level</span>
                <span>{partner.progress}</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: partner.progress }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full ${partner.barColor}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
