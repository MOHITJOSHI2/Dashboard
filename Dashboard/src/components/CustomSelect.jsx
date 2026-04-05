import React from "react";

const geoData = {
  Koshi: [
    "Bhojpur",
    "Dhankuta",
    "Ilam",
    "Jhapa",
    "Khotang",
    "Morang",
    "Okhaldhunga",
    "Panchthar",
    "Sankhuwasabha",
    "Solukhumbu",
    "Sunsari",
    "Taplejung",
    "Tehrathum",
    "Udayapur",
  ],
  Madhesh: [
    "Bara",
    "Dhanusha",
    "Mahottari",
    "Parsa",
    "Rautahat",
    "Saptari",
    "Sarlahi",
    "Siraha",
  ],
  Bagmati: [
    "Bhaktapur",
    "Chitwan",
    "Dhading",
    "Dolakha",
    "Kathmandu",
    "Kavrepalanchok",
    "Lalitpur",
    "Makwanpur",
    "Nuwakot",
    "Ramechhap",
    "Rasuwa",
    "Sindhuli",
    "Sindhupalchok",
  ],
  Gandaki: [
    "Baglung",
    "Gorkha",
    "Kaski",
    "Lamjung",
    "Manang",
    "Mustang",
    "Myagdi",
    "Nawalpur",
    "Parbat",
    "Syangja",
    "Tanahun",
  ],
  Lumbini: [
    "Arghakhanchi",
    "Banke",
    "Bardiya",
    "Dang",
    "Eastern Rukum",
    "Gulmi",
    "Kapilvastu",
    "Parasi",
    "Palpa",
    "Pyuthan",
    "Rolpa",
    "Rupandehi",
  ],
  Karnali: [
    "Dailekh",
    "Dolpa",
    "Humla",
    "Jajarkot",
    "Jumla",
    "Kalikot",
    "Mugu",
    "Salyan",
    "Surkhet",
    "Western Rukum",
  ],
  Sudurpashchim: [
    "Achham",
    "Baitadi",
    "Bajhang",
    "Bajura",
    "Dadeldhura",
    "Darchula",
    "Doti",
    "Kailali",
    "Kanchanpur",
  ],
};

const CustomSelect = ({ filters, setFilters, onExplore }) => {
  const handleProvinceChange = (e) => {
    setFilters({ province: e.target.value, district: "" });
  };

  const handleDistrictChange = (e) => {
    setFilters({ ...filters, district: e.target.value });
  };

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[1002] w-[90%] max-w-4xl">
      <div className="bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[2rem] p-3 flex items-center gap-3 border border-white/40">
        <div className="flex-1 flex items-center gap-2">
          {/* Province Dropdown */}
          <div className="relative flex-1 group">
            <select
              value={filters.province}
              onChange={handleProvinceChange}
              className="w-full appearance-none bg-slate-50/50 border border-slate-100 text-slate-900 py-3 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer text-xs font-black uppercase tracking-widest"
            >
              <option value="">Select Province</option>
              {Object.keys(geoData).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <DropdownArrow />
          </div>

          {/* District Dropdown */}
          <div className="relative flex-1 group">
            <select
              value={filters.district}
              onChange={handleDistrictChange}
              disabled={!filters.province}
              className="w-full appearance-none bg-slate-50/50 border border-slate-100 text-slate-900 py-3 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer text-xs font-black uppercase tracking-widest disabled:opacity-40"
            >
              <option value="">Select District</option>
              {filters.province &&
                geoData[filters.province].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
            <DropdownArrow />
          </div>
        </div>

        <button
          onClick={onExplore}
          className="bg-slate-900 hover:bg-emerald-500 text-white px-10 py-3 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

const DropdownArrow = () => (
  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

export default CustomSelect;
