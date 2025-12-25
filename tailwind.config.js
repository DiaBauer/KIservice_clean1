/** @type {import('tailwindcss').Config} */
module.exports={
  content:["./pages/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme:{extend:{
    colors:{primary:"#17B4FF",accent:"#f5b800",dark:"#0b0f17"},
    fontFamily:{sans:["Inter","ui-sans-serif","system-ui","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif"]},
    boxShadow:{glow:"0 0 25px rgba(23,180,255,0.25)"},
    keyframes:{
      "pulse-glow":{"0%,100%":{boxShadow:"0 0 0px rgba(23,180,255,0.0)"},"50%":{boxShadow:"0 0 25px rgba(23,180,255,0.35)"}},
      "float":{"0%":{transform:"translateY(0px)"},"50%":{transform:"translateY(-6px)"},"100%":{transform:"translateY(0px)"}}
    },
    animation:{"pulse-glow":"pulse-glow 3s ease-in-out infinite","float":"float 6s ease-in-out infinite"}
  }},
  plugins:[require('@tailwindcss/forms')]
}
