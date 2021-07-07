((items)=>{

	"use strict";

	if(!items.length) {

		return;

	}

	Array.from(items, el => {

		const label = el.querySelector('.select__label'),
			  select = el.querySelector('select');

		select.addEventListener('change', () =>
			label.textContent = select.querySelector('[value="' + select.value + '"]').textContent);

	});

})(document.querySelectorAll('.select'));