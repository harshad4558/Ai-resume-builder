/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",         // Ensures index.html is scanned
	  "./src/**/*.{js,ts,jsx,tsx}"  // Scans all JavaScript and TypeScript files
	],
	theme: {
	  extend: {},
	},
	plugins: [],
  };
  