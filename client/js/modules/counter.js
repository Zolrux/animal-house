import PureCounter from '@srexi/purecounterjs';

export default function initCounter() {
	new PureCounter({
		selector: '.purecounter',
		start: 0, 
		end: 100,
		duration: 1,
		delay: 10,
		once: true,
		repeat: false,
	});
}
