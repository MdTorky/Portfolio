module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            width: {
                "50%": "50%",
                "75%": "75%",
            },
            height: {
                "50%": "50%",
            },
            colors: {
                theme: "#F1F1FB",
                darktheme: "#2E3944",
                bluetheme: "#525CEB"
            },
            shadow: {
                'navbar': "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                'icon': '0px 0px 48px 7px rgba(45,255,196,0.9)'
            }
        },
    },
    plugins: [],
}