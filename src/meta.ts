export const keywords = 'chemical sales,chemical manufacturer,chemical supplier,bulk lubricants,bulk chemicals,bulk degreasers';
export const description = 'Zenex International is a diversied supplier of industrial chemicals and commercial cleaning solutions operating in Cleveland, Ohio.';
export const title = "Zenex International: Private Label Manufacturer of Aerosols, Liquids, Wipes, and Industrial Hand Soaps";

export var About = {
	title: 'About Us',
	keywords: keywords,
	description: description
};

export var Contact = {
	title: 'Contact Us',
	keywords: keywords,
	description: description,
	data: {
		departments: [
			{ name: "Sales", id: 1, value: 'sales@zenexint.com' },
			{ name: "Support", id : 2, value: 'support@zenexint.com' },					
			{ name: "Shipping", id: 3, value: 'shipping@zenexint.com' }
		]
	}
};

export var Dashboard = {
	title: 'User Dashboard',
	keywords: keywords,
	description: description
};

export var Error = {
	title: 'Error',
	keywords: '',
	description: 'Error processing request.'
};

export var Login = {
	title: 'Secure Login',
	keywords: keywords,
	description: description
};

export var Products = {
	title: 'Products: Private Label Aerosols, Liquids, Wipes, and Hand Soaps',
	keywords: keywords,
	description: description,
	overrides: {}
};

export var MetaProducts = Products;

export var Register = {
	title: 'Register Account',
	keywords: keywords,
	description: description
};

export var Users = {
	title: 'Site Users',
	keywords: keywords,
	description: description
};