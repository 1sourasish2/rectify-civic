"use client";

import React, { useReducer, useState } from "react";

// Define supported translations inline
const translations: Record<string, Record<string, string>> = {
  en: {
    settings: "Settings",
    description: "Customize your preferences, privacy, and app appearance.",
    account: "Account Information",
    username: "Username",
    email: "Email Address",
    preferences: "Preferences",
    darkMode: "Enable Dark Mode",
    notifications: "Enable Notifications",
    privacy: "Privacy",
    privacyQuestion: "Who can see your profile?",
    public: "Public",
    friends: "Friends Only",
    private: "Private",
    save: "Save Settings",
    saved: "Settings saved successfully!",
    language: "Language",
  },
  bn: {
    settings: "সেটিংস",
    description: "আপনার পছন্দ, গোপনীয়তা এবং অ্যাপ কাস্টমাইজ করুন।",
    account: "অ্যাকাউন্ট তথ্য",
    username: "ব্যবহারকারীর নাম",
    email: "ইমেইল ঠিকানা",
    preferences: "পছন্দসমূহ",
    darkMode: "ডার্ক মোড চালু করুন",
    notifications: "নোটিফিকেশন চালু করুন",
    privacy: "গোপনীয়তা",
    privacyQuestion: "কে আপনার প্রোফাইল দেখতে পারবে?",
    public: "সবার জন্য উন্মুক্ত",
    friends: "শুধু বন্ধুরা",
    private: "ব্যক্তিগত",
    save: "সেটিংস সংরক্ষণ করুন",
    saved: "সেটিংস সফলভাবে সংরক্ষিত হয়েছে!",
    language: "ভাষা",
  },
  ta: {
    settings: "அமைப்புகள்",
    description: "உங்கள் விருப்பங்கள், தனியுரிமை மற்றும் செயலியை தனிப்பயனாக்குங்கள்.",
    account: "கணக்கு தகவல்",
    username: "பயனர்பெயர்",
    email: "மின்னஞ்சல் முகவரி",
    preferences: "விருப்பத்தேர்வுகள்",
    darkMode: "டார்க் மோட் இயக்கு",
    notifications: "அறிவிப்புகளை இயக்கு",
    privacy: "தனியுரிமை",
    privacyQuestion: "உங்கள் சுயவிவரத்தை யார் பார்க்கலாம்?",
    public: "அனைவரும்",
    friends: "நண்பர்கள் மட்டும்",
    private: "தனிப்பட்டது",
    save: "அமைப்புகளை சேமிக்கவும்",
    saved: "அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டது!",
    language: "மொழி",
  },
};

// Define the shape of your settings state
interface SettingsState {
  username: string;
  email: string;
  darkMode: boolean;
  notificationsEnabled: boolean;
  privacyLevel: "public" | "friends" | "private";
}

// Define actions for reducer
type SettingsAction =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "TOGGLE_NOTIFICATIONS" }
  | { type: "SET_PRIVACY_LEVEL"; payload: SettingsState["privacyLevel"] }
  | { type: "RESET" };

// Initial state for settings
const initialState: SettingsState = {
  username: "User",
  email: "user@example.com",
  darkMode: false,
  notificationsEnabled: true,
  privacyLevel: "friends",
};

// Reducer function
function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "TOGGLE_NOTIFICATIONS":
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    case "SET_PRIVACY_LEVEL":
      return { ...state, privacyLevel: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function SettingsPage() {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [language, setLanguage] = useState<"en" | "bn" | "ta">("en");

  const t = translations[language]; // pick current language translations

  // Save handler
  function handleSave() {
    setSaveStatus(t.saved);
    setTimeout(() => setSaveStatus(""), 3000);
  }

  return (
    <section className="container mx-auto p-8 max-w-3xl bg-white rounded-lg shadow-md">
      {/* Language selector */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 font-medium">{t.language}:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "bn" | "ta")}
          className="border rounded px-2 py-1"
        >
          <option value="en">English</option>
          <option value="bn">বাংলা</option>
          <option value="ta">தமிழ்</option>
        </select>
      </div>

      <h1 className="text-3xl font-bold mb-6">{t.settings}</h1>
      <p className="mb-8 text-gray-700">{t.description}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-8"
      >
        {/* Account section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">{t.account}</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block font-medium mb-1">
                {t.username}
              </label>
              <input
                id="username"
                type="text"
                value={state.username}
                onChange={(e) => dispatch({ type: "SET_USERNAME", payload: e.target.value })}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                value={state.email}
                onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
          </div>
        </section>

        {/* Preferences section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">{t.preferences}</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                id="darkMode"
                type="checkbox"
                checked={state.darkMode}
                onChange={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
                className="w-5 h-5"
              />
              <label htmlFor="darkMode" className="font-medium">
                {t.darkMode}
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                id="notifications"
                type="checkbox"
                checked={state.notificationsEnabled}
                onChange={() => dispatch({ type: "TOGGLE_NOTIFICATIONS" })}
                className="w-5 h-5"
              />
              <label htmlFor="notifications" className="font-medium">
                {t.notifications}
              </label>
            </div>
          </div>
        </section>

        {/* Privacy section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">{t.privacy}</h2>
          <fieldset className="space-y-3">
            <legend className="font-medium mb-2">{t.privacyQuestion}</legend>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="privacy"
                checked={state.privacyLevel === "public"}
                onChange={() => dispatch({ type: "SET_PRIVACY_LEVEL", payload: "public" })}
                className="w-5 h-5"
              />
              <span>{t.public}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="privacy"
                checked={state.privacyLevel === "friends"}
                onChange={() => dispatch({ type: "SET_PRIVACY_LEVEL", payload: "friends" })}
                className="w-5 h-5"
              />
              <span>{t.friends}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="privacy"
                checked={state.privacyLevel === "private"}
                onChange={() => dispatch({ type: "SET_PRIVACY_LEVEL", payload: "private" })}
                className="w-5 h-5"
              />
              <span>{t.private}</span>
            </label>
          </fieldset>
        </section>

        {/* Save button */}
        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold text-lg shadow"
        >
          {t.save}
        </button>
      </form>

      {/* Status message */}
      {saveStatus && (
        <p className="mt-6 text-green-700 font-semibold text-center transition-opacity">{saveStatus}</p>
      )}
    </section>
  );
}
