import initGallery from './modules/gallery';
import initCounter from './modules/counter';
import { orderFormMasks, inputsMasks } from './modules/order-form';
import { togglePasswordType, inputPhoneMask, inputFullNameMask, removeCyrrilicInputMask } from './modules/form';
import { updateStatus } from './modules/admin';


window.addEventListener('DOMContentLoaded', () => {
	initGallery();
	initCounter();
	
	orderFormMasks();
	inputsMasks();

	inputPhoneMask();
	inputFullNameMask();
	togglePasswordType();
	removeCyrrilicInputMask();

	updateStatus();
})