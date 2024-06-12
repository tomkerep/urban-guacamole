



module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],



	theme: { 
		extend: {
		fontFamily: {
		  poppins: ['Poppins', 'sans-serif'],
		},
	  },
	
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],	
	daisyui: {
		themes: ["bumblebee",
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
