/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
              },
        },
        colors: {
            transparent: 'transparent',
            black: 'red',
            white: '#fff',
            gray: {
              100: '#f7fafc',
              // ...
              900: '#1a202c',
            },
            current: 'currentColor',
            'purple': '#3f3cbb',
            'midnight': '#121063',
            'metal': '#565584',
            'tahiti': '#3ab7bf',
            'silver': '#ecebff',
            'bubble-gum': '#ff77e9',
            'bermuda': '#78dcca',
            // ...
        },
        screens: {
            //https://tailwindcss.com/docs/screens#adding-larger-breakpoints
          },
        extend: {},
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [require("daisyui")],
};
