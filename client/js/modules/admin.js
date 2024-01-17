export function updateStatus() {
	const orderList = document.querySelector('.body-orders__list');

	if (!orderList || !orderList.querySelectorAll('.body-orders__item').length) {
		return;
	}

	orderList.addEventListener("click", async function (e) {
		const target = e.target;

		if (target.closest('.body-orders__menu-status')) {
			const menuStatusBtn = target.closest('.body-orders__menu-status');
			const adminPanel = menuStatusBtn.closest('.body-orders__admin-panel');
			adminPanel.classList.toggle('active');
		}

		if (target.closest('.body-orders__status-btn')) {
			const btn = target.closest('.body-orders__status-btn');
			const adminPanel = target.closest('.body-orders__admin-panel');
			const orderId = +adminPanel.id.split('-')[1];
			const status = btn.dataset.status;

			adminPanel.classList.toggle('active');

			await fetch('/update/order', {
				method: 'PUT',
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({id: orderId, status})
			}).then(_ => window.location.href = '/profile/orders');
		}
	});

}