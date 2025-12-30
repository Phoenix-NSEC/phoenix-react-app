/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            xsm: '350px',
            sm: '638px',
            md: '766px',
            lg: '1022px',
            xl: '1278px',
            '2xl': '1584px',
            hd: '1918px'
        },
        extend: {
            fontFamily: {
                
       sans: ['"JetBrains Mono"', 'monospace'], // default font
      mono: ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                background: '#050505',
                foreground: '#ffffff',
                card: '#0a0a0a',
                'card-foreground': '#ffffff',
                primary: '#00ffff',
                'primary-foreground': '#050505',
                secondary: '#0066ff',
                'secondary-foreground': '#ffffff',
                muted: '#1a1a1a',
                'muted-foreground': '#a0a0a0',
                accent: '#00ffff',
                'accent-foreground': '#050505',
                destructive: '#ff0055',
                'destructive-foreground': '#ffffff',
                border: '#1a1a2e',
                input: '#0a0a0a',
                ring: '#00ffff',
                'neon-blue': '#00ffff',
                'neon-blue-alt': '#00bfff',
                'dark-bg': '#050505',
            },
            height: {
                10: '10%',
                20: '20%',
                30: '30%',
                40: '40%',
                50: '50%',
                60: '60%',
                70: '70%',
                80: '80%',
                90: '90%'
            },
            width: {
                10: '10%',
                20: '20%',
                23: '23%',
                30: '30%',
                35: '35%',
                40: '40%',
                50: '50%',
                60: '60%',
                65: '65%',
                70: '70%',
                80: '80%',
                90: '90%'
            },
            boxShadow: {
                'glow': '0 0 20px rgba(0, 255, 255, 0.3)',
                'glow-lg': '0 0 40px rgba(0, 255, 255, 0.5)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        }
    },
    plugins: [],
}