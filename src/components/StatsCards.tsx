/** @format */

import {
  FaBuilding,
  FaShieldAlt,
  FaCoins,
  FaHandHoldingUsd,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function StatsCards() {
  const { t } = useTranslation();

  const items = [
    {
      title: t("insured_companies"),
      value: "1 250",
      icon: <FaBuilding size={28} />,
    },
    {
      title: t("insurance_liability"),
      value: "45 mlrd so‘m",
      icon: <FaShieldAlt size={28} />,
    },
    {
      title: t("insurance_premiums"),
      value: "12 mlrd so‘m",
      icon: <FaCoins size={28} />,
    },
    {
      title: t("insurance_compensation"),
      value: "4.3 mlrd so‘m",
      icon: <FaHandHoldingUsd size={28} />,
    },
    {
      title: t("insurance_cases"),
      value: "93 ta",
      icon: <FaExclamationTriangle size={28} />,
    },
  ];

  return (
    <div className="myContainer">
      <h2 className="text-main text-2xl font-bold mb-6">
        {t("insurance_statistics")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-full p-4">
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
