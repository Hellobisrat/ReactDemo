const { color } = require('@mui/system');
const { fontSize } = require('@mui/system');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
       animation:{
        myanimation:'myanimation 30s linear infinite'
       },
       keyframes:{
        myanimation:{
          '0%' :{transform:'translateX(100%)'},
          '25%' : {color:'light-blue'},
          '50%': { color: 'blue' },
          '100%':{transform:'translateX(-100%)'},
        }
       }
    },
  },
  plugins: [],
}

