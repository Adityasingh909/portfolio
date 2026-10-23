/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#09090c",
          pure: "#050507",
          card: "#101015",
          hover: "#171720",
          border: "rgba(255, 255, 255, 0.08)",
        },
        accent: {
          DEFAULT: "var(--accent, #6366f1)",
          violet: "#8b5cf6",
          cyan: "#06b6d4",
          emerald: "#10b981",
        },
        muted: {
          DEFAULT: "#ece9e4",
          dim: "#8e8c99",
        }
      },
      fontFamily: {
        display: ['"Inter Tight"', '"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'scan': 'scan 6s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
};
