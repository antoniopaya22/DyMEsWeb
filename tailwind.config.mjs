/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // DyMEs dark palette
        dymes: {
          bg: {
            primary: '#272519',
            secondary: '#1F1D14',
            card: '#323021',
            elevated: '#423E2B',
            subtle: 'rgba(255,255,255,0.03)',
            input: 'rgba(255,255,255,0.05)',
          },
          text: {
            primary: '#ffffff',
            secondary: '#AAA37B',
            muted: '#807953',
          },
          border: {
            DEFAULT: '#514D35',
            subtle: 'rgba(255,255,255,0.06)',
          },
          accent: {
            gold: '#CDC9B2',
            'gold-glow': 'rgba(178,172,136,0.2)',
            red: '#8f3d38',
            green: '#22c55e',
            blue: '#3b82f6',
            purple: '#a855f7',
            amber: '#f59e0b',
            orange: '#f97316',
            danger: '#ef4444',
            pink: '#ec4899',
          },
        },
        // Light mode overrides
        dymes_light: {
          bg: {
            primary: '#F0EFE8',
            secondary: '#E8E7DC',
            card: '#FAFAF7',
            elevated: '#FCFCFB',
          },
          text: {
            primary: '#272519',
            secondary: '#555137',
            muted: '#978F62',
          },
          border: {
            DEFAULT: '#D4D1BD',
            subtle: 'rgba(0,0,0,0.08)',
          },
          accent: {
            gold: '#978F62',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        body: ['Crimson Text', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'dymes-gradient': 'linear-gradient(180deg, #17160F 0%, #1F1D14 12%, #272519 30%, #272519 100%)',
        'dymes-gradient-light': 'linear-gradient(180deg, #E6E4D8 0%, #EDECE4 12%, #F0EFE8 30%, #F0EFE8 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'slide-up-sm': 'slideUpSm 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'spin-slower': 'spin 40s linear infinite reverse',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'blur-in': 'blurIn 0.8s ease-out both',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 30s linear infinite reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpSm: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(143,61,56,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(143,61,56,0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(12px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
