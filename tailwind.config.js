import { addDynamicIconSelectors } from "@iconify/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
  ],
  theme: {
    extend: {  },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
};
