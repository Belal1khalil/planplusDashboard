import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".flowbite-react\\class-list.json"],
  theme: {
    extend: {
      backgroundImage: {
        'mainColor': 'linear-gradient(165.22deg, #1F2B43 40.11%, #1B3E3C 60.03%, #286447 79.96%, #329C4A 119.8%)',
      },
    },
  },
  plugins: [flowbiteReact],
}