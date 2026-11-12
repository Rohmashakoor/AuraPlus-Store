/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Header collapses to the mobile menu below this width.
      screens: { nav: '860px' },
      colors: {
        // Palette from the reference image
        ink: '#1B1931',
        plum: '#44174E',
        wine: '#662249',
        rose: '#A34054',
        amber: '#ED9E59',
        blush: '#E9BCB9',
        // Theme tokens (values switch for light / dark in globals.css)
        page: 'var(--bg)',
        surface: 'var(--surface)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        accentfg: 'var(--accent-fg)',
        btn: 'var(--btn-bg)',
        btnfg: 'var(--btn-fg)',
        btnhover: 'var(--btn-hover)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        bump: { '40%': { transform: 'scale(1.45)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        rise: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        bump: 'bump .45s',
        fade: 'fadeIn .3s ease-out both',
        rise: 'rise .4s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
