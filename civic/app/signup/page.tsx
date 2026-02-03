"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function CivicFlowApp() {
  const router = useRouter();

  const [step, setStep] = React.useState<"intro" | "login" | "signup">("intro");
  const [blurVisible, setBlurVisible] = React.useState(false);
  const [showContinue, setShowContinue] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [loginData, setLoginData] = React.useState({ email: "", password: "" });
  const [signupData, setSignupData] = React.useState({
    name: "",
    address: "",
    email: "",
    pinCode: "",
    password: "",
  });
  const [loginError, setLoginError] = React.useState("");

  React.useEffect(() => {
    setBlurVisible(true);
    setTimeout(() => setShowContinue(true), 2000);
    // 🔴 removed auto-redirect to feed here
  }, []);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    isSignup: boolean
  ) {
    const { name, value } = e.target;
    if (isSignup) {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleLogin() {
    const { email, password } = loginData;
    setLoginError("");

    if (!email || !password) return;

    const storedUser = localStorage.getItem("civicflowUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        router.push("/feed"); // ✅ redirect only after successful login
      } else {
        setLoginError("Incorrect email or password.");
      }
    } else {
      setLoginError("No account found. Please sign up first.");
      setTimeout(() => setStep("signup"), 1200);
    }
  }

  function handleSignup() {
    const { name, address, email, pinCode, password } = signupData;
    if (!name || !address || !email || !pinCode || !password) return;

    localStorage.setItem("civicflowUser", JSON.stringify(signupData));
    router.push("/feed"); // ✅ redirect only after signup
  }

  function handleLogout() {
    localStorage.removeItem("civicflowUser");
    setStep("login");
  }

  // ------------------- UI -------------------

  if (step === "intro") {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-white px-4 sm:px-6">
        <div
          className={`relative w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 transition-all duration-[1000ms] ${
            blurVisible
              ? "opacity-100 blur-0 scale-100"
              : "opacity-0 blur-3xl scale-75"
          }`}
        >
          <Image
            src="/Rectify SVG.svg"
            alt="Rectify Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        {showContinue && (
          <button
            onClick={() => setStep("login")}
            className="mt-12 bg-green-600 text-white py-3 px-10 sm:py-4 sm:px-14 rounded-2xl hover:bg-green-700 transition text-xl sm:text-2xl font-bold shadow-lg"
          >
            Get Started
          </button>
        )}
      </section>
    );
  }

  // ------------------- LOGIN -------------------

  if (step === "login") {
    return (
      <section className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6">
        <div className="w-full max-w-md p-6 sm:p-8 border rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-7 text-green-700">
            Login to Rectify
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full mb-4 p-3 sm:p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-base sm:text-lg"
              onChange={(e) => handleInputChange(e, false)}
              value={loginData.email}
              autoComplete="username"
              required
            />
            <div className="relative mb-6">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 sm:p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-base sm:text-lg"
                onChange={(e) => handleInputChange(e, false)}
                value={loginData.password}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-2xl font-semibold hover:bg-green-700 transition text-lg sm:text-xl shadow-lg"
            >
              Login
            </button>
            {loginError && (
              <p className="mt-5 text-sm text-red-600 font-medium transition-opacity">
                {loginError}
              </p>
            )}
          </form>
          <p className="mt-8 text-sm sm:text-base text-gray-600">
            New here?{" "}
            <button
              className="text-green-700 underline font-semibold"
              onClick={() => setStep("signup")}
            >
              Create Account
            </button>
          </p>
        </div>
      </section>
    );
  }

  // ------------------- SIGNUP -------------------

  if (step === "signup") {
    return (
      <section className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6">
        <div className="w-full max-w-md p-6 sm:p-8 border rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-7 text-green-700">
            Create Your Account
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 p-3 sm:p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-base sm:text-lg"
              onChange={(e) => handleInputChange(e, true)}
              value={signupData.name}
              autoComplete="name"
              required
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              className="w-full mb-4 p-3 sm:p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-base sm:text-lg"
              onChange={(e) => handleInputChange(e, true)}
              value={signupData.address}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full mb-4 p-3 sm:p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-base sm:text-lg"
              onChange={(e) => handleInputChange(e, true)}
              value={signupData.email}
              autoComplete="email"
              required
            />
            <input
              name="pinCode"
              type="text"
              placeholder="Pin Code"
              className="w-full mb-4 p-3 sm:p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-base sm:text-lg"
              onChange={(e) => handleInputChange(e, true)}
              value={signupData.pinCode}
              required
            />
            <div className="relative mb-6">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 sm:p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-base sm:text-lg"
                onChange={(e) => handleInputChange(e, true)}
                value={signupData.password}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-2xl font-semibold hover:bg-green-700 transition text-lg sm:text-xl shadow-lg"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-8 text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <button
              className="text-green-700 underline font-semibold"
              onClick={() => setStep("login")}
            >
              Login here
            </button>
          </p>
        </div>
      </section>
    );
  }

  return null;
}

