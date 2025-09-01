// src/pages/Settings.tsx
"use client";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { CreditCard, Globe } from "lucide-react";

const SettingsPage: React.FC = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: `Inter, "Noto Sans", sans-serif` }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#233648] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              Byte
              <span className=" ">
                <span className=" text-gray-400">Devs</span>
                {"/>"}
              </span>
            </h2>
          </div>

          {/* Nav + User */}
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              {[
                "Dashboard",
                "Bookings",
                "Hotels",
                "Users",
                "Reviews",
                "Payments",
              ].map((item) => (
                <a
                  key={item}
                  className="text-white text-sm font-medium"
                  href="#"
                >
                  {item}
                </a>
              ))}
            </div>

            <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#233648] px-2.5 text-sm font-bold text-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </button>

            <div
              className="size-10 rounded-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8beSaNnMYe6RYvlaDtSvbEn1aCoKEk_pcnDpkxcoP5k6EHwnrNBs3tw2xeByvSbZnn-nOFE_I_vDG450WfFnadEqYO0Hx-XbXkWPINLjqip_1ABJuznCo8lx9JJ_LZzrnB1_9Jq6XE6FiRzxUkxprc_znMwm6SBlcvMYnKsOKHBU8P3Tfzbg5cBKMb_zMqo8cn8d-4Z1a6QLp1xdxhGJY2Or7LfUzkv-Z6Yh1tPmOgS61f6KDvrbPpMRHYQ6L-B-hA9Y-FkH_qgM")`,
              }}
            />
          </div>
        </header>

        {/* Mobile Bottom Nav */}
        <MobileNav />

        {/* Main Content */}
        <div className="flex flex-1 justify-center px-3 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 py-4 sm:py-6 lg:py-8">
          <div className="layout-content-container flex w-full max-w-[1280px] flex-col mb-16 ">
            {/* Title */}
            <div className="flex flex-wrap justify-between gap-4 p-4 sm:p-6 lg:p-8">
              <div className="flex min-w-full sm:min-w-[18rem] flex-col gap-2 sm:gap-3">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-white">
                  Settings
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal text-[#92adc9]">
                  Configure and manage settings available on the website.
                </p>
              </div>
            </div>
            <GlobalPlatformSettings />
            <PaymentSettingsPage />
            <NotificationSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

interface GlobalSettings {
  siteName: string;
  contactEmail: string;
  phoneNumber: string;
}

const GlobalPlatformSettings: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings>({
    siteName: "",
    contactEmail: "",
    phoneNumber: "",
  });

  const handleChange = (field: keyof GlobalSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap p-1 sm:p-4 lg:p-6">
      {/* Site Name */}
      <div className="flex max-w-full  flex-wrap items-end gap-3 sm:gap-4 px-3 sm:px-4 py-3">
        <div className="flex flex-col  flex-1">
          <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
            Site Name
          </p>
          <input
            className="form-input w-full rounded-lg text-white border border-[#324d67] bg-[#192633] h-12 sm:h-14 placeholder:text-[#92adc9] px-3 sm:px-[15px] text-sm sm:text-base font-normal leading-normal focus:outline-0 focus:ring-0 focus:border-[#324d67]"
            value={settings.siteName}
            placeholder="Enter site name"
            onChange={(e) => handleChange("siteName", e.target.value)}
          />
        </div>
      </div>

      {/* Contact Email */}
      <div className="flex max-w-full  flex-wrap items-end gap-3 sm:gap-4 px-3 sm:px-4 py-3">
        <div className="flex flex-col  flex-1">
          <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
            Contact Email
          </p>
          <input
            type="email"
            className="form-input w-full rounded-lg text-white border border-[#324d67] bg-[#192633] h-12 sm:h-14 placeholder:text-[#92adc9] px-3 sm:px-[15px] text-sm sm:text-base font-normal leading-normal focus:outline-0 focus:ring-0 focus:border-[#324d67]"
            value={settings.contactEmail}
            placeholder="example@email.com"
            onChange={(e) => handleChange("contactEmail", e.target.value)}
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex max-w-full  flex-wrap items-end gap-3 sm:gap-4 px-3 sm:px-4 py-3">
        <div className="flex flex-col  flex-1">
          <p className="text-white text-sm sm:text-base font-medium leading-normal pb-2">
            Phone Number
          </p>
          <input
            type="tel"
            className="form-input w-full rounded-lg text-white border border-[#324d67] bg-[#192633] h-12 sm:h-14 placeholder:text-[#92adc9] px-3 sm:px-[15px] text-sm sm:text-base font-normal leading-normal focus:outline-0 focus:ring-0 focus:border-[#324d67]"
            value={settings.phoneNumber}
            placeholder="+1 234 567 890"
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentSettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [transactionFee, setTransactionFee] = useState(10);
  const [payoutSchedule, setPayoutSchedule] = useState("daily");
  const [paymentMethods, setPaymentMethods] = useState<Record<string, boolean>>(
    {
      creditCard: true,
      debitCard: true,
      bankTransfer: false,
    }
  );

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handlePaymentMethodChange = (method: any) => {
    setPaymentMethods((prev: any) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const themeClasses = {
    background: isDarkMode ? "bg-[#111a22]" : "bg-gray-50",
    card: isDarkMode
      ? "bg-[#111a22] border-0 shadow-none"
      : "bg-white border-gray-200",
    text: {
      primary: isDarkMode ? "text-gray-100" : "text-gray-900",
      secondary: isDarkMode ? "text-gray-400" : "text-gray-600",
      muted: isDarkMode ? "text-gray-500" : "text-gray-500",
    },
    input: isDarkMode
      ? "bg-[#2d3748] border-[#4a5568] text-gray-100 placeholder:text-gray-500 focus:border-blue-400"
      : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500",
    button: {
      primary: isDarkMode
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: isDarkMode
        ? "border-[#4a5568] text-gray-300 hover:bg-[#2d3748]"
        : "border-gray-300 text-gray-700 hover:bg-gray-50",
    },
  };

  return (
    <div
      className={` w-full ${themeClasses.background} flex justify-center px-1 lg:px-2 `}
    >
      <div
        className={`w-full ${themeClasses.card} border rounded-xl shadow-lg p-1 sm:p-4 lg:p-6`}
      >
        {/* Payment Gateways Section */}
        <div className="">
          <h2
            className={`${themeClasses.text.primary} text-lg sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3`}
          >
            Payment Gateways
          </h2>

          {/* Stripe Gateway */}
          <div
            className={`${
              isDarkMode
                ? "bg-transparent bg-gradient-to-tr from-blue-500/15 via-transparent to-transparent"
                : "bg-gray-50"
            } rounded-lg p-3 sm:p-6 mb-4 sm:mb-6 transition-all duration-200 shadow hover:shadow-md sm:hover:shadow-lg max-w-4xl`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-6 lg:gap-8">
              <div className="flex items-center gap-3 sm:gap-5 flex-1">
                <div className="flex items-center justify-center rounded-lg shadow-md size-10 sm:size-16">
                  <CreditCard className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`${themeClasses.text.primary} text-base sm:text-lg font-semibold mb-1 sm:mb-2`}
                  >
                    Stripe
                  </h3>
                  <p
                    className={`${themeClasses.text.secondary} text-xs sm:text-sm leading-relaxed`}
                  >
                    Enable or disable Stripe as a payment method.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    stripeEnabled ? "text-green-500" : themeClasses.text.muted
                  }`}
                >
                  {stripeEnabled ? "Enabled" : "Disabled"}
                </span>
                <label className="relative flex h-6 sm:h-8 w-10 sm:w-14 cursor-pointer items-center rounded-full bg-gray-300 p-0.5 sm:p-1 transition-colors duration-200 has-[:checked]:bg-blue-500">
                  <div
                    className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                      stripeEnabled
                        ? "translate-x-4 sm:translate-x-6"
                        : "translate-x-0"
                    }`}
                  ></div>
                  <input
                    type="checkbox"
                    className="invisible absolute"
                    checked={stripeEnabled}
                    onChange={(e) => setStripeEnabled(e.target.checked)}
                  />
                </label>
              </div>
            </div>

            {/* Stripe API Key Input */}
            {stripeEnabled && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-300/20">
                <label className="block">
                  <p
                    className={`${themeClasses.text.primary} text-sm sm:text-base font-medium mb-2 sm:mb-3`}
                  >
                    Stripe API Key
                  </p>
                  <input
                    type="password"
                    placeholder="sk_test_..."
                    className={`w-full lg:max-w-lg rounded-lg sm:rounded-xl border ${themeClasses.input} h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                  />
                </label>
                <button
                  className={`inline-flex items-center justify-center 
    px-2 sm:px-3 py-1 sm:py-1.5 
    text-xs sm:text-sm 
    font-medium rounded-md sm:rounded-lg 
    border transition-all duration-200 
    ${themeClasses.button.secondary} 
    hover:shadow-sm mt-2`}
                >
                  Test
                </button>
              </div>
            )}
          </div>

          {/* PayPal Gateway */}
          <div
            className={`${
              isDarkMode
                ? " bg-gradient-to-tr from-transparent via-transparent to-blue-500/15"
                : "bg-gray-50"
            } max-w-4xl rounded-lg mb-4 p-3 sm:p-6 transition-all duration-200 shadow hover:shadow-md sm:hover:shadow-lg`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-6 lg:gap-8">
              <div className="flex items-center gap-3 sm:gap-5 flex-1">
                <div className="flex items-center justify-center rounded-lg shadow-md size-10 sm:size-16">
                  <Globe className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`${themeClasses.text.primary} text-base sm:text-lg font-semibold mb-1 sm:mb-2`}
                  >
                    PayPal
                  </h3>
                  <p
                    className={`${themeClasses.text.secondary} text-xs sm:text-sm leading-relaxed`}
                  >
                    Enable or disable PayPal as a payment method.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    paypalEnabled ? "text-green-500" : themeClasses.text.muted
                  }`}
                >
                  {paypalEnabled ? "Enabled" : "Disabled"}
                </span>
                <label className="relative flex h-6 sm:h-8 w-10 sm:w-14 cursor-pointer items-center rounded-full bg-gray-300 p-0.5 sm:p-1 transition-colors duration-200 has-[:checked]:bg-blue-500">
                  <div
                    className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                      paypalEnabled
                        ? "translate-x-4 sm:translate-x-6"
                        : "translate-x-0"
                    }`}
                  ></div>
                  <input
                    type="checkbox"
                    className="invisible absolute"
                    checked={paypalEnabled}
                    onChange={(e) => setPaypalEnabled(e.target.checked)}
                  />
                </label>
              </div>
            </div>

            {/* PayPal API Key Input */}
            {paypalEnabled && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-300/20">
                <label className="block">
                  <p
                    className={`${themeClasses.text.primary} text-sm sm:text-base font-medium mb-2 sm:mb-3`}
                  >
                    PayPal Client ID
                  </p>
                  <input
                    type="password"
                    placeholder="AY_..."
                    className={`w-full lg:max-w-lg rounded-lg sm:rounded-xl border ${themeClasses.input} h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                  />
                </label>
                <button
                  className={`inline-flex items-center justify-center 
    px-2 sm:px-3 py-1 sm:py-1.5 
    text-xs sm:text-sm 
    font-medium rounded-md sm:rounded-lg 
    border transition-all duration-200 
    ${themeClasses.button.secondary} 
    hover:shadow-sm mt-2`}
                >
                  Test
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Section */}
        <div className="mb-6 sm:mb-12">
          <h2
            className={`${themeClasses.text.primary} text-lg sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3`}
          >
            Configuration
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Currency Selection */}
            <div>
              <label className="block">
                <p
                  className={`${themeClasses.text.primary} text-sm sm:text-base font-semibold mb-2 sm:mb-4`}
                >
                  Default Currency
                </p>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={`w-full rounded-md border ${themeClasses.input} 
    h-12 px-3 text-base
    sm:rounded-lg sm:h-14 sm:px-4 sm:text-sm
    transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>

                <p
                  className={`${themeClasses.text.muted} text-xs sm:text-sm mt-1 sm:mt-2`}
                >
                  Primary currency for transactions and reporting
                </p>
              </label>
            </div>
            {/* Transaction Fee & Payout Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Transaction Fee */}
              <div>
                <label className="block">
                  <p
                    className={`${themeClasses.text.primary} text-sm sm:text-base font-semibold mb-2 sm:mb-4`}
                  >
                    Transaction Fee (%)
                  </p>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={transactionFee}
                    onChange={(e) => setTransactionFee(Number(e.target.value))}
                    placeholder="e.g., 10"
                    className={`w-full rounded-md border ${themeClasses.input} 
          h-12 px-3 text-base
          sm:rounded-lg sm:h-14 sm:px-4 sm:text-sm
          transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                  />
                  <p
                    className={`${themeClasses.text.muted} text-xs sm:text-sm mt-1 sm:mt-2`}
                  >
                    Commission percentage deducted from each booking
                  </p>
                </label>
              </div>

              {/* Payout Schedule */}
              <div>
                <label className="block">
                  <p
                    className={`${themeClasses.text.primary} text-sm sm:text-base font-semibold mb-2 sm:mb-4`}
                  >
                    Payout Schedule
                  </p>
                  <select
                    value={payoutSchedule}
                    onChange={(e) => setPayoutSchedule(e.target.value)}
                    className={`w-full rounded-md border ${themeClasses.input} 
          h-12 px-3 text-base
          sm:rounded-lg sm:h-14 sm:px-4 sm:text-sm
          transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <p
                    className={`${themeClasses.text.muted} text-xs sm:text-sm mt-1 sm:mt-2`}
                  >
                    How often the host receives earnings after commission
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
          <button
            className={`px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl border transition-all duration-200 ${themeClasses.button.secondary} hover:shadow-md`}
          >
            Reset to Default
          </button>
          <button
            className={`px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-200 ${themeClasses.button.primary} hover:shadow-md sm:hover:shadow-lg transform sm:hover:scale-105`}
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "booking",
      title: "New Booking Confirmation",
      description:
        "Send confirmation email to users after a successful booking.",
      enabled: true,
    },
    {
      id: "paymentFailed",
      title: "Payment Failed",
      description: "Notify users when their payment fails.",
      enabled: false,
    },
    {
      id: "adminApproval",
      title: "Admin Approval Needed",
      description: "Alert admins when a booking requires manual approval.",
      enabled: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div>
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-1 pb-2 pt-4">
        Email/SMS Notification Settings
      </h3>

      {settings.map((setting) => (
        <div
          key={setting.id}
          className="flex items-center gap-4 bg-[#111a22] px-1 min-h-[72px] py-2 justify-between"
        >
          <div className="flex flex-col justify-center">
            <p className="text-white text-base font-medium leading-normal line-clamp-1">
              {setting.title}
            </p>
            <p className="text-[#92adc9] text-sm font-normal leading-normal line-clamp-2">
              {setting.description}
            </p>
          </div>
          <div className="shrink-0">
            <label
              className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${
                setting.enabled
                  ? "justify-end bg-[#1172d4]"
                  : "justify-start bg-[#233648]"
              }`}
              onClick={() => toggleSetting(setting.id)}
            >
              <div
                className="h-full w-[27px] rounded-full bg-white shadow-md"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px",
                }}
              ></div>
              <input
                type="checkbox"
                checked={setting.enabled}
                onChange={() => toggleSetting(setting.id)}
                className="invisible absolute"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
