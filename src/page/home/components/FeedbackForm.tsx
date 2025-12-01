/** @format */

import { FaQuestionCircle, FaBullseye, FaCogs } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMutateRequest } from "../../../service/requests";

export default function FeedbackForm() {
  const { t } = useTranslation();
  const { mutateAsync } = useMutateRequest();

  const [form, setForm] = useState({
    text: "",
    phone: "",
    rating: 5,
  });

  const handleChange = (key: any, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await mutateAsync({
        url: "/feedback/create",
        method: "POST",
        data: form,
      });
      if (res) {
        alert("send!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      icon: <FaQuestionCircle className="text-main" size={22} />,
      title: t("info_1_title"),
      text: t("info_1_text"),
    },
    {
      icon: <FaBullseye className="text-main" size={22} />,
      title: t("info_2_title"),
      text: t("info_2_text"),
    },
    {
      icon: <FaCogs className="text-main" size={22} />,
      title: t("info_3_title"),
      text: t("info_3_text"),
    },
  ];

  return (
    <div className="myContainer py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        <div className="md:col-span-6 space-y-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="
                border border-main/20 bg-white/60 backdrop-blur-xl
                p-5 rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.05)]
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                transition-all duration-300
              "
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-main/10 rounded-xl">{c.icon}</div>

                <div>
                  <h3 className="text-lg font-semibold text-main">{c.title}</h3>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-6">
          <div
            className="
              bg-white/80 backdrop-blur-xl p-8 
              border border-main/20 rounded-3xl 
              shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)]
            "
          >
            <h2 className="text-2xl font-semibold text-main mb-6">
              {t("feedback_title")}
            </h2>
            <label className="block text-sm text-gray-700 mb-1">
              {t("text_label")}
            </label>
            <textarea
              rows={4}
              className="
                w-full p-3 rounded-xl border border-main/20 bg-white/70 
                focus:ring-2 focus:ring-main/50 outline-none mb-5
              "
              placeholder={t("text_placeholder")}
              value={form.text}
              onChange={(e) => handleChange("text", e.target.value)}
            />
            <label className="block text-sm text-gray-700 mb-1">
              {t("phone_label")}
            </label>
            <input
              type="text"
              className="
                w-full p-3 rounded-xl border border-main/20 bg-white/70 
                focus:ring-2 focus:ring-main/50 outline-none mb-5
              "
              placeholder={t("phone_placeholder")}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <label className="block text-sm text-gray-700 mb-1">
              {t("rating_label")}
            </label>
            <select
              className="
                w-full p-3 rounded-xl border border-main/20 bg-white/70 
                focus:ring-2 focus:ring-main/50 outline-none mb-5
              "
              value={form.rating}
              onChange={(e) => handleChange("rating", Number(e.target.value))}
            >
              <option value={5}>⭐⭐⭐⭐⭐ — 5</option>
              <option value={4}>⭐⭐⭐⭐ — 4</option>
              <option value={3}>⭐⭐⭐ — 3</option>
              <option value={2}>⭐⭐ — 2</option>
              <option value={1}>⭐ — 1</option>
            </select>
            <button
              onClick={handleSubmit}
              className="
                w-full py-3 bg-main text-white font-semibold text-lg
                rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]
                hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              {t("submit_btn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
