/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{ts,tsx}",
],
  
  theme: {
    
    extend: {
      fontFamily:{
        customtt:["Lily\\ Script\\ One"]
      },
      colors:{
        'OvsP':{
          'o100':"#ff6d00",
          'o200':"#ff7900",
          'o300':"#ff8500",
          'o400':"#ff9100",
          'o500':"#ff9e00",
          'p100':"#240046",
          'p200':"#3c096c",
          'p300':"#5a189a",
          'p400':"#7b2cbf",
          'p500':"#9d4edd"
        }
      },
    },
  },
  plugins: [],
};