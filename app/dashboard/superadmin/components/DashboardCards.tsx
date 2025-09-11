"use client";
import React from "react";
import { useThemeStore } from "@/lib/store/theme";

const DashboardCards: React.FC = () => {
  const { theme } = useThemeStore();
  const palette =
    theme === "light"
      ? {
          cardBg: "bg-white",
          border: "border-gray-200",
          textPrimary: "text-gray-900",
          textMuted: "text-gray-500",
          chartBg: "bg-gray-200",
          chartStroke: "#3b82f6", // Tailwind blue-500
          chartFill: "url(#paint_light)",
          chartFillId: "paint_light",
        }
      : {
          cardBg: "bg-[#111a22]",
          border: "border-[#324d67]",
          textPrimary: "text-white",
          textMuted: "text-[#92adc9]",
          chartBg: "bg-[#233648]",
          chartStroke: "#92adc9",
          chartFill: "url(#paint_dark)",
          chartFillId: "paint_dark",
        };

  const cardBase =
    "flex flex-col w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] gap-4 sm:gap-6 rounded-xl border p-4 sm:p-6";

  return (
    <div className="space-y-6 px-3 sm:px-4 py-4 sm:py-6">
      {/* Row 1 */}
      <div className="flex flex-wrap gap-4">
        {/* Total Bookings */}
        <div
          className={`${cardBase} ${palette.border} ${palette.cardBg} flex-1 min-w-[260px]`}
        >
          <p
            className={`${palette.textPrimary} text-sm sm:text-base font-medium`}
          >
            Total Bookings Over Time
          </p>
          <p
            className={`${palette.textPrimary} text-2xl sm:text-[32px] font-bold leading-tight truncate`}
          >
            1,234
          </p>
          <div className="flex gap-1 text-xs sm:text-sm">
            <p className={`${palette.textMuted}`}>Last 30 Days</p>
            <p className="text-green-500 font-medium">+15%</p>
          </div>

          <div className="flex min-h-[120px] sm:min-h-[180px] flex-col gap-6 sm:gap-8 py-3 sm:py-4">
            <svg
              className="w-full h-[100px] sm:h-[148px]"
              viewBox="-3 0 478 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                fill={palette.chartFill}
              />
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                stroke={palette.chartStroke}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex justify-around">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                <p
                  key={m}
                  className={`${palette.textMuted} text-[11px] sm:text-[13px] font-medium tracking-wide`}
                >
                  {m}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Trends */}
        <div
          className={`${cardBase} ${palette.border} ${palette.cardBg} flex-1 min-w-[260px]`}
        >
          <p
            className={`${palette.textPrimary} text-sm sm:text-base font-medium`}
          >
            Revenue Trends
          </p>
          <p
            className={`${palette.textPrimary} text-2xl sm:text-[32px] font-bold leading-tight truncate`}
          >
            $50,000
          </p>
          <div className="flex gap-1 text-xs sm:text-sm">
            <p className={`${palette.textMuted}`}>Last 30 Days</p>
            <p className="text-green-500 font-medium">+10%</p>
          </div>

          <div className="grid min-h-[120px] sm:min-h-[180px] grid-flow-col gap-4 sm:gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-2 sm:px-3">
            {[15, 30, 45, 60, 75, 90].map((h, i) => (
              <React.Fragment key={i}>
                <div
                  className={`${palette.chartBg} w-full`}
                  style={{
                    height: `${h}%`,
                    borderTop: `2px solid ${palette.chartStroke}`,
                  }}
                />
                <p
                  className={`${palette.textMuted} text-[11px] sm:text-[13px] font-medium tracking-wide`}
                >
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* Row 2 */}
      <div className="flex flex-wrap gap-4">
        {/* Popular Hotels */}
        <div
          className={`${cardBase} ${palette.border} ${palette.cardBg} flex-1 min-w-[260px]`}
        >
          <p
            className={`${palette.textPrimary} text-sm sm:text-base font-medium`}
          >
            Popular Hotels/Hostels
          </p>
          <p
            className={`${palette.textPrimary} text-2xl sm:text-[32px] font-bold leading-tight truncate`}
          >
            10
          </p>
          <div className="flex gap-1 text-xs sm:text-sm">
            <p className={palette.textMuted}>Last 30 Days</p>
            <p className="text-green-500 font-medium">+5%</p>
          </div>
          <div className="grid min-h-[120px] sm:min-h-[180px] gap-x-4 gap-y-4 sm:gap-y-6 grid-cols-[auto_1fr] items-center py-2 sm:py-3">
            {[
              { name: "Hotel A", w: "30%" },
              { name: "Hotel B", w: "20%" },
              { name: "Hotel C", w: "80%" },
              { name: "Hotel D", w: "80%" },
              { name: "Hotel E", w: "100%" },
            ].map((h) => (
              <React.Fragment key={h.name}>
                <p
                  className={`${palette.textMuted} text-[11px] sm:text-[13px] font-bold tracking-wide`}
                >
                  {h.name}
                </p>
                <div className="h-full flex-1">
                  <div
                    className={`${palette.chartBg} border-r-2 h-full`}
                    style={{ width: h.w, borderColor: palette.chartStroke }}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* User Registration Growth */}
        <div
          className={`${cardBase} ${palette.border} ${palette.cardBg} flex-1 min-w-[260px]`}
        >
          <p
            className={`${palette.textPrimary} text-sm sm:text-base font-medium`}
          >
            User Registration Growth
          </p>
          <p
            className={`${palette.textPrimary} text-2xl sm:text-[32px] font-bold leading-tight truncate`}
          >
            500
          </p>
          <div className="flex gap-1 text-xs sm:text-sm">
            <p className={palette.textMuted}>Last 30 Days</p>
            <p className="text-green-500 font-medium">+20%</p>
          </div>
          <div className="grid min-h-[120px] sm:min-h-[180px] grid-flow-col gap-4 sm:gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-2 sm:px-3">
            {[80, 50, 80, 50, 20, 60].map((h, i) => (
              <React.Fragment key={i}>
                <div
                  className={`${palette.chartBg} border-t-2 w-full`}
                  style={{ height: `${h}%`, borderColor: palette.chartStroke }}
                />
                <p
                  className={`${palette.textMuted} text-[11px] sm:text-[13px] font-bold tracking-wide`}
                >
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Rates */}
      <div
        className={`${cardBase} ${palette.border} ${palette.cardBg} flex-1 min-w-full`}
      >
        <p
          className={`${palette.textPrimary} text-sm sm:text-base font-medium`}
        >
          Conversion Rates
        </p>
        <p
          className={`${palette.textPrimary} text-2xl sm:text-[32px] font-bold leading-tight truncate`}
        >
          5%
        </p>
        <div className="flex gap-1 text-xs sm:text-sm">
          <p className={`${palette.textMuted}`}>Last 30 Days</p>
          <p className="text-green-500 font-medium">+2%</p>
        </div>

        <div className="grid min-h-[120px] sm:min-h-[180px] grid-flow-col gap-4 sm:gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-2 sm:px-3">
          {[20, 40, 10, 50, 60, 100].map((h, i) => (
            <React.Fragment key={i}>
              <div
                className={`border-t-2 w-full ${palette.chartBg}`}
                style={{ height: `${h}%`, borderColor: palette.chartStroke }}
              />
              <p
                className={`${palette.textMuted} text-[11px] sm:text-[13px] font-bold tracking-wide`}
              >
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
