module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'black': '#272727',
				'staticPrimary': '#FF8B20',
				'passivePrimary': '#85A6F2',
				'lightGray': '#F8F8F8',
				'red': '#F64C4C',
			},  
		},
	},
	plugins: [],
};
