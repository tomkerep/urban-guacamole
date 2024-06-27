



module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
<<<<<<< HEAD
	theme: {
		
=======



	theme: { 
		extend: {
		fontFamily: {
		  poppins: ['Poppins', 'sans-serif'],
		},
	  },
>>>>>>> Contact_page
	
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],	
	daisyui: {
		themes: ["nord",
			/*{
			  light: {
				...require("daisyui/src/theming/themes")["light"],
				primary: "blue",
				secondary: "teal",
			  },
			},*/
		   ],
	},

};
