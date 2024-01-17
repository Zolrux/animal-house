import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'

export default function initGallery() {
	lightGallery(document.querySelector('.gallery__body'), {
		plugins: [lgThumbnail],
		licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
		speed: 500,
		backdropDuration: 400,
		download: false,
		mode: "lg-fade",
	});
}