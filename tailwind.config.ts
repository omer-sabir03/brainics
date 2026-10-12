import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070F22",
          900: "#0A1630",
          800: "#0F1F44",
          700: "#16295A",
          600: "#22397A",
        },
        gold: {
          300: "#F7D58E",
          400: "#F0BE5B",
          500: "#E8A93A",
          600: "#CF8E1F",
        },
        cream: "#FBF8F1",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
        urdu: ['"Noto Nastaliq Urdu"', "serif"],
      },
      boxShadow: {
        glow: "0 20px 60px -15px rgba(232, 169, 58, 0.45)",
        card: "0 10px 40px -12px rgba(10, 22, 48, 0.18)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        rise: "rise 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
