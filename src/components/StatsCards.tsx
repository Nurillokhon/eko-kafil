/** @format */

import {
  FaBuilding,
  FaShieldAlt,
  FaCoins,
  FaHandHoldingUsd,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function StatsCards() {
  const items = [
    {
      title: "Sug‘urtalangan tashkilotlar soni",
      value: "1 250",
      icon: <FaBuilding size={28} />,
    },
    {
      title: "Sug‘urta javobgarligi",
      value: "45 mlrd so‘m",
      icon: <FaShieldAlt size={28} />,
    },
    {
      title: "Sug‘urta mukofotlari",
      value: "12 mlrd so‘m",
      icon: <FaCoins size={28} />,
    },
    {
      title: "Sug‘urta tovoni",
      value: "4.3 mlrd so‘m",
      icon: <FaHandHoldingUsd size={28} />,
    },
    {
      title: "Sug‘urta hodisalari",
      value: "93 ta",
      icon: <FaExclamationTriangle size={28} />,
    },
  ];

  return (
    <div className="myContainer">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-full  p-4 ">
        {items.map((item, i) => (
          <div
            key={i}
            className="
            flex items-center gap-4 p-5 rounded-2xl text-main border border-main shadow-sm
            transition-all duration-300 ease-out
            hover:shadow-lg hover:-translate-y-1 hover:bg-main/5
          "
          >
            <div className="text-main">{item.icon}</div>

            <div>
              <p className="text-sm opacity-90">{item.title}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
