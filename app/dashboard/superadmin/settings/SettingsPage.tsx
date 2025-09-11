// src/pages/Settings.tsx
"use client";
import { useState } from "react";
import { CreditCard, Globe } from "lucide-react";
import { useThemeStore } from "@/lib/store/theme";

export interface GlobalPlatformSettingsProps {
  theme: "light" | "dark";
  palette: {
    cardBg: string;
    border: string;
    textPrimary: string;
    textMuted: string;
    inputBg: string;
    inputText: string;
    inputPlaceholder: string;
    buttonBg: string;
    buttonText: string;
    buttonHover: string;
    tableBg: string;
    tableHeaderBg: string;
    tableBorder: string;
  };
}

const SettingsPage: React.FC = () => {
  const { theme } = useThemeStore();

  const palette =
    theme === "light"
      ? {
          cardBg: "bg-white",
          border: "border-gray-200",
          textPrimary: "text-gray-900",
          textMuted: "text-gray-500",
          inputBg: "bg-gray-100",
          inputText: "text-gray-900",
          inputPlaceholder: "placeholder:text-gray-500",
          buttonBg: "bg-gray-200",
          buttonText: "text-gray-900",
          buttonHover: "hover:bg-gray-300",
          tableBg: "bg-white",
          tableHeaderBg: "bg-gray-100",
          tableBorder: "border-gray-200",
        }
      : {
          cardBg: "bg-[#111a22]",
          border: "border-[#324d67]",
          textPrimary: "text-white",
          textMuted: "text-[#92adc9]",
          inputBg: "bg-[#233648]",
          inputText: "text-white",
          inputPlaceholder: "placeholder:text-[#92adc9]",
          buttonBg: "bg-[#233648]",
          buttonText: "text-white",
          buttonHover: "hover:bg-[#2d4a63]",
          tableBg: "bg-[#111a22]",
          tableHeaderBg: "bg-[#192633]",
          tableBorder: "border-[#324d67]",
        };
  return (
    <div
      className={`relative flex size-full min-h-screen flex-col overflow-x-hidden pb-10 sm:pb-0 ${palette.cardBg}`}
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Main Content */}
        <div className="flex flex-1 justify-center px-3 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 py-4 sm:py-6 lg:py-8">
          <div className="layout-content-container flex w-full max-w-[1280px] flex-col mb-16">
            {/* Title */}
            <div className="flex flex-wrap justify-between gap-4 p-4 sm:p-6 lg:p-8">
              <div className="flex min-w-full sm:min-w-[18rem] flex-col gap-2 sm:gap-3">
                <p
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug ${palette.textPrimary}`}
                >
                  Settings
                </p>
                <p
                  className={`text-xs sm:text-sm md:text-base lg:text-lg font-normal ${palette.textMuted}`}
                >
                  Configure and manage settings available on the website.
                </p>
              </div>
            </div>

            {/* Settings Sections */}
            <div
              className={`${palette.cardBg} rounded-xl ${palette.border} p-4 sm:p-6 flex flex-col gap-6`}
            >
              <GlobalPlatformSettings theme={theme} palette={palette} />
              <NotificationSettings theme={theme} palette={palette} />
              <PaymentSettingsPage theme={theme} palette={palette} />
            </div>
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

const GlobalPlatformSettings: React.FC<GlobalPlatformSettingsProps> = ({
  theme,
  palette,
}) => {
  const [settings, setSettings] = useState<GlobalSettings>({
    siteName: "",
    contactEmail: "",
    phoneNumber: "",
  });

  const handleChange = (field: keyof GlobalSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className={`w-full flex flex-col md:flex-row flex-wrap gap-3 py-4 sm:p-6 lg:p-8 border-b-2 ${palette.border}`}
    >
      {/* Site Name */}
      <div className="flex max-w-full flex-wrap items-end gap-3 sm:gap-4">
        <div className="flex flex-col flex-1">
          <p
            className={`${palette.textPrimary} text-sm sm:text-base font-medium leading-normal pb-2`}
          >
            Site Name
          </p>
          <input
            className={`form-input w-full rounded-lg ${palette.inputText} border ${palette.border} ${palette.inputBg} h-12 sm:h-14 px-3 sm:px-[15px] text-sm sm:text-base font-normal leading-normal focus:outline-0 focus:ring-0 focus:border-blue-500 placeholder:italic ${palette.inputPlaceholder}`}
            value={settings.siteName}
            placeholder="Enter site name"
            onChange={(e) => handleChange("siteName", e.target.value)}
          />
        </div>
      </div>

      {/* Contact Email */}
      <div className="flex max-w-full flex-wrap items-end gap-3 sm:gap-4">
        <div className="flex flex-col flex-1">
          <p
            className={`${palette.textPrimary} text-sm sm:text-base font-medium leading-normal pb-2`}
          >
            Contact Email
          </p>
          <input
            type="email"
            className={`form-input w-full rounded-lg ${palette.inputText} border ${palette.border} ${palette.inputBg} h-12 sm:h-14 px-3 sm:px-[15px] text-sm sm:text-base font-normal leading-normal focus:outline-0 focus:ring-0 focus:border-blue-500 placeholder:italic ${palette.inputPlaceholder}`}
            value={settings.contactEmail}
            placeholder="example@email.com"
            onChange={(e) => handleChange("contactEmail", e.target.value)}
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex max-w-full flex-wrap items-end gap-3 sm:gap-4">
        <div className="flex flex-col flex-1">
          <p
            className={`${palette.textPrimary} text-sm sm:text-base font-medium leading-normal pb-2`}
          >
            Phone Number
          </p>
          <input
            type="tel"
            className={`form-input w-full rounded-lg ${palette.inputText} border ${palette.border} ${palette.inputBg} h-12 sm:h-14 px-3 sm:px-[15px] text-sm sm:text-base font-normal leading-normal focus:outline-0 focus:ring-0 focus:border-blue-500 placeholder:italic ${palette.inputPlaceholder}`}
            value={settings.phoneNumber}
            placeholder="+1 234 567 890"
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentSettingsPage = ({
  theme,
  palette,
}: GlobalPlatformSettingsProps) => {
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

  return (
    <div
      className={`w-full ${palette.cardBg} flex justify-center border-b-2 ${palette.border}`}
    >
      <div
        className={`w-full ${palette.cardBg} border ${palette.border} rounded-xl shadow-lg p-4 sm:p-6 lg:p-8`}
      >
        {/* Payment Gateways Section */}
        <div className="mb-6 sm:mb-12">
          <h2
            className={`${palette.textPrimary} text-lg sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3`}
          >
            Payment Gateways
          </h2>

          {/* Stripe Gateway */}
          <div
            className={`${
              theme === "dark"
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
                    className={`${palette.textPrimary} text-base sm:text-lg font-semibold mb-1 sm:mb-2`}
                  >
                    Stripe
                  </h3>
                  <p
                    className={`${palette.textMuted} text-xs sm:text-sm leading-relaxed`}
                  >
                    Enable or disable Stripe as a payment method.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    stripeEnabled ? "text-green-500" : palette.textMuted
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
                  />
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
              <div
                className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t ${palette.border}`}
              >
                <label className="block">
                  <p
                    className={`${palette.textPrimary} text-sm sm:text-base font-medium mb-2 sm:mb-3`}
                  >
                    Stripe API Key
                  </p>
                  <input
                    type="password"
                    placeholder="sk_test_..."
                    className={`w-full lg:max-w-lg rounded-lg sm:rounded-xl border ${palette.inputBg} ${palette.inputText} ${palette.inputPlaceholder} h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                  />
                </label>
                <button
                  className={`inline-flex items-center justify-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg border transition-all duration-200 ${palette.buttonBg} ${palette.buttonText} hover:shadow-sm mt-2`}
                >
                  Test
                </button>
              </div>
            )}
          </div>

          {/* PayPal Gateway */}
          <div
            className={`${
              theme === "dark"
                ? "bg-gradient-to-tr from-transparent via-transparent to-blue-500/15"
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
                    className={`${palette.textPrimary} text-base sm:text-lg font-semibold mb-1 sm:mb-2`}
                  >
                    PayPal
                  </h3>
                  <p
                    className={`${palette.textMuted} text-xs sm:text-sm leading-relaxed`}
                  >
                    Enable or disable PayPal as a payment method.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    paypalEnabled ? "text-green-500" : palette.textMuted
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
                  />
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
              <div
                className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t ${palette.border}`}
              >
                <label className="block">
                  <p
                    className={`${palette.textPrimary} text-sm sm:text-base font-medium mb-2 sm:mb-3`}
                  >
                    PayPal Client ID
                  </p>
                  <input
                    type="password"
                    placeholder="AY_..."
                    className={`w-full lg:max-w-lg rounded-lg sm:rounded-xl border ${palette.inputBg} ${palette.inputText} ${palette.inputPlaceholder} h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                  />
                </label>
                <button
                  className={`inline-flex items-center justify-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg border transition-all duration-200 ${palette.buttonBg} ${palette.buttonText} hover:shadow-sm mt-2`}
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
            className={`${palette.textPrimary} text-lg sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3`}
          >
            Configuration
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Currency Selection */}
            <div>
              <label className="block">
                <p
                  className={`${palette.textPrimary} text-sm sm:text-base font-semibold mb-2 sm:mb-4`}
                >
                  Default Currency
                </p>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={`w-full rounded-md border ${palette.inputBg} ${palette.inputText} ${palette.inputPlaceholder} h-12 px-3 text-base sm:rounded-lg sm:h-14 sm:px-4 sm:text-sm transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>

                <p
                  className={`${palette.textMuted} text-xs sm:text-sm mt-1 sm:mt-2`}
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
                    className={`${palette.textPrimary} text-sm sm:text-base font-semibold mb-2 sm:mb-4`}
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
                    className={`w-full rounded-md border ${palette.inputBg} ${palette.inputText} ${palette.inputPlaceholder} h-12 px-3 text-base sm:rounded-lg sm:h-14 sm:px-4 sm:text-sm transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                  />
                  <p
                    className={`${palette.textMuted} text-xs sm:text-sm mt-1 sm:mt-2`}
                  >
                    Commission percentage deducted from each booking
                  </p>
                </label>
              </div>

              {/* Payout Schedule */}
              <div>
                <label className="block">
                  <p
                    className={`${palette.textPrimary} text-sm sm:text-base font-semibold mb-2 sm:mb-4`}
                  >
                    Payout Schedule
                  </p>
                  <select
                    value={payoutSchedule}
                    onChange={(e) => setPayoutSchedule(e.target.value)}
                    className={`w-full rounded-md border ${palette.inputBg} ${palette.inputText} ${palette.inputPlaceholder} h-12 px-3 text-base sm:rounded-lg sm:h-14 sm:px-4 sm:text-sm transition-all duration-200 focus:ring-4 focus:ring-blue-500/20`}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <p
                    className={`${palette.textMuted} text-xs sm:text-sm mt-1 sm:mt-2`}
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
            className={`px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl border transition-all duration-200 ${palette.buttonBg} ${palette.buttonText} hover:shadow-md`}
          >
            Reset to Default
          </button>
          <button
            className={`px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-200 ${palette.buttonBg} ${palette.buttonText} hover:shadow-md sm:hover:shadow-lg transform sm:hover:scale-105 `}
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

export const NotificationSettings = ({
  theme,
  palette,
}: GlobalPlatformSettingsProps) => {
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
    <div className={`py-4 sm:p-6 lg:p-8 pt-4 border-b-2 ${palette.border}`}>
      <h3
        className={`text-lg sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3 ${palette.textPrimary}`}
      >
        Email/SMS Notification Settings
      </h3>

      {settings.map((setting) => (
        <div
          key={setting.id}
          className={`flex items-center gap-4 ${palette.cardBg} px-1 min-h-[72px] py-2 justify-between`}
        >
          <div className="flex flex-col justify-center">
            <p
              className={`text-base font-medium leading-normal line-clamp-1 ${palette.textPrimary}`}
            >
              {setting.title}
            </p>
            <p
              className={`text-sm font-normal leading-normal line-clamp-2 ${palette.textMuted}`}
            >
              {setting.description}
            </p>
          </div>

          <div className="shrink-0">
            <label
              className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${
                setting.enabled
                  ? "justify-end bg-blue-600" // you can also add palette.activeToggleBg if you want dynamic
                  : palette.inputBg
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
