import data from '../data/offers.json';

export interface Offer {
	id: string;
	label: string;
	title: string;
	price: string;
	text: string;
	image: string;
	imageAlt: string;
	buttonText: string;
	href: string;
	external: boolean;
	showUntil: string;
}

const slug = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

// Offers switched on in Pages CMS ("Homepage offers") that haven't passed their "show until" date.
// The date is checked again in the browser, because the site is only rebuilt when something is saved.
export function getOffers(): Offer[] {
	const today = new Date().toISOString().slice(0, 10);
	return (data.offers ?? [])
		.filter((o) => o.show && o.title?.trim() && (!o.showUntil || o.showUntil >= today))
		.map((o) => {
			const id = `offer-${slug(o.title)}`;
			const link = o.buttonLink?.trim() ?? '';
			return {
				id,
				label: o.label?.trim() ?? '',
				title: o.title.trim(),
				price: o.price?.trim() ?? '',
				text: o.text?.trim() ?? '',
				image: o.image?.trim() ?? '',
				imageAlt: o.imageAlt?.trim() ?? '',
				buttonText: o.buttonText?.trim() || 'Find out more',
				href: link || `/contact/?course=${id}#enquiry`,
				external: /^https?:/.test(link),
				showUntil: o.showUntil ?? '',
			};
		});
}
