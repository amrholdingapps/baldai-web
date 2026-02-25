/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			/* Figma: SF Pro Display. Loaded in globals.css as SFProDisplay (400, 500). */
  			sfProDisplay: ["SFProDisplay", "sans-serif"]
  		},
  		fontWeight: {
  			regular: '400',
  			medium: '500',
  			bold: '700'
  		},
  		/* Design typography: Figma uses 12, 14, 16, 18px; line-height 100% (1) or 160% (1.6) for long text */
  		fontSize: {
  			'ds-12': ['12px', { lineHeight: '1' }],
  			'ds-14': ['14px', { lineHeight: '1' }],
  			'ds-16': ['16px', { lineHeight: '1' }],
  			'ds-18': ['18px', { lineHeight: '1' }],
  			'ds-body-14': ['14px', { lineHeight: '1.6' }],
  			'ds-body-16': ['16px', { lineHeight: '1.6' }],
  		},
  		maxWidth: {
  			screen: '1000px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			/* Design tokens (Figma). Home page. */
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			brand: {
  				DEFAULT: 'hsl(var(--brand))',
  				foreground: 'hsl(var(--brand-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			/* Legacy: terms, privacy, referrals, not-found. Replace when migrating. */
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))'
  		},
  		animation: {
  			rainbow: 'rainbow var(--speed, 2s) infinite linear'
  		},
  		keyframes: {
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
