const { fontFamily } = require("tailwindcss/defaultTheme")

// @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./ui/**/*.{ts,tsx}",
        "./content/**/*.{md,mdx}",
    ],
    darkMode: ["class"],
    theme: {
        container: {
            center: true,
            padding: "16px",
            screens: {
                "2xl": "1300px",
            },
        },
        extend: {
            gridTemplateColumns: {
                // Complex site-specific row configuration
                'main-content-grid': '1fr .7fr',
            },
            maxWidth: {
                'main-content': "70rem"
            },
            colors: {
                heading: "hsl(var(--heading))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                "Grey": {
                    "grey-50": "#e9e9e9",
                    "grey-100": "#bcbbbb",
                    "grey-200": "#9c9a9a",
                    "grey-300": "#6e6c6c",
                    "grey-400": "#524f50",
                    "grey-500": "#272324",
                    "grey-600": "#232021",
                    "grey-700": "#1c191a",
                    "grey-800": "#151314",
                    "grey-900": "#100f0f"
                }
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                heading: ["var(--font-heading)", ...fontFamily.sans],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
