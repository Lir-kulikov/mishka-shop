( form => {

	if(!form) {

		return;

	}

	const quantity = form.querySelectorAll('.quantity'),
		  totalText = form.querySelector('.cart__total'),
		  totalCountItemText = form.querySelector('.cart__total-items');

	const result = () => {

		let s = 0;
		const items = form.querySelectorAll('.cart__item');

		Array.from(items, el => {

			const count = parseInt(el.querySelector('.quantity__count').value),
				  price = parseInt(el.querySelector('.quantity__price').value);

			if(isNaN(count)) {

				count = 1;
				el.querySelector('.quantity__count').value = 1;

			}

			el.querySelector('.cart__item-price--total').textContent = MI.sepNumber(count * price);

			s += count * price;

		});

	// total sum

		totalText.textContent = MI.sepNumber(s);

	// total item

		totalCountItemText.textContent = items.length;

	// hide form empty

		if(s === 0) {

			form.classList.add('is-empty');

		}

	}

	if(quantity.length) {

// quantity
		Array.from(quantity, el => {

			let value = null;
			const up = el.querySelector('.quantity__btn--up'),
				  down = el.querySelector('.quantity__btn--down'),
				  count = el.querySelector('.quantity__count');

			up.addEventListener('click', () => {

				value = parseInt(count.value) + 1;

				count.value = value;

				result();

			});

			down.addEventListener('click', () => {

				value = parseInt(count.value) - 1;

				if(value < 1) {

					value = 1;

				}

				count.value = value;

				result();

			});

			count.addEventListener('blur', () => result());

			count.addEventListener('focus', () =>
				setTimeout( () => count.setSelectionRange(0,9),100));

			count.addEventListener('keyup', () => {

				count.value = count.value.replace(/[\D]/g, '');

				result();

			});

		});

// remove
		Array.from(form.querySelectorAll('.cart__item-remove'), el => {

			const item = el.closest('.cart__item');

			el.addEventListener('click', () => {

				item.style.height = item.clientHeight + 'px';

				item.addEventListener(MI.cssAnimation('transition'), () => {

					if(item.clientHeight > 0) {

						item.style.height = 0;

					}
					else {

						item.remove();
						result();

					}

				});

				item.classList.add('cart__item--remove');

			});

		});

	}

})(document.querySelector('.cart'));