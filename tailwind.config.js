/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        // colors: {
        //   'primary': "#1d50c3"
        // },
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
                Montserrat: "'Montserrat', 'sans-serif'",
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
            }

        }
    },
    plugins: [],
}