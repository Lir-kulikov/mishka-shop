((menu) => {

	"use strict";

	if(!menu) {

		return;

	}

	// открыть|закрыть меню

	document.querySelector('.btn-menu-toggle').addEventListener('click', () => {

		if(document.body.classList.contains('menu-open')){

			setTimeout( () => window.scrollTo(0, MI.windowScrollOld));

		}
		else {

			MI.windowScrollOld = window.pageYOffset;

		}

		document.body.classList.toggle('menu-open');
		menu.classList.toggle('visuallyhidden');

	});

})(document.querySelector('.menu'));


// каталог на главной

((menu) => {

	"use strict";

	if(!menu.length) {

		return;

	}

	Array.from(menu, el => {

		el.addEventListener('click', evt => {

			evt.preventDefault();

			el.classList.toggle('is-open');

		});

	});

})(document.querySelectorAll('.main-catalog__head'));

// меню каталога

((btns) => {

	"use strict";

	if(!btns.length) {

		return;

	}

	const menu = document.querySelector('.menu-catalog'),
		  level1 = menu.querySelectorAll('.menu-catalog__head--arrow'),
		  level2 = menu.querySelectorAll('.menu-catalog__level2-link--arrow'),
		  btnClose = menu.querySelector('.menu-catalog__close'),
		  btnBack = menu.querySelector('.menu-catalog__back'),
		  category = menu.querySelector('.menu-catalog__current-category'),
		  categoryTextDefault = category.textContent;

	let	level1Scroll = 0,
		level2Scroll = 0,
		level1Open = null,
		level2Open = null;

	// открыть меню

	Array.from(btns, btn => btn.addEventListener('click', () => {

		MI.windowScrollOld = window.pageYOffset;
		window.scrollTo(0, 0);
		document.body.classList.add('menu-catalog-open');
		menu.classList.remove('visuallyhidden');

	}));

	// закрыть меню

	btnClose.addEventListener('click', () => {

		setTimeout( () => window.scrollTo(0, MI.windowScrollOld));

		document.body.classList.remove('menu-catalog-open');
		menu.classList.add('visuallyhidden');

	});

	// На уровень назад

	btnBack.addEventListener('click', () => {

		if(menu.classList.contains('is-level3')) {

			menu.style.height = level1Open.nextElementSibling.scrollHeight + "px";

			menu.classList.remove('is-level3');

			Array.from(level2, elem => elem.parentNode.classList.remove('is-open'));

			window.scrollTo(0, level2Scroll);

			category.textContent = level1Open.textContent;

		}
		else if (menu.classList.contains('is-level2')) {

			menu.style.height = menu.querySelector('.menu-catalog__inner').clientHeight + "px";

			menu.classList.remove('is-level2');

			Array.from(level1, elem => elem.classList.remove('is-open'));

			window.scrollTo(0, level1Scroll);

			btnBack.classList.add('hide');

			category.textContent = categoryTextDefault;

		}
		else {

			console.log('что-то не так');

		}

	});


	// первый уровень

	Array.from(level1, el => {

		el.addEventListener('click', evt => {

			evt.preventDefault();

			level1Scroll = window.pageYOffset;

			menu.style.height = el.nextElementSibling.scrollHeight + "px";

			menu.classList.add('is-level2');

			Array.from(level1, elem => elem.classList.toggle('is-open', elem === el));

			level1Open = el;

			btnBack.classList.remove('hide');

			category.textContent = el.textContent;

		});

	});

	// второй уровень

	Array.from(level2, el => {

		el.addEventListener('click', evt => {

			evt.preventDefault();

			level2Scroll = window.pageYOffset;

			menu.style.height = el.parentNode.nextElementSibling.scrollHeight + "px";

			menu.classList.add('is-level3');

			Array.from(level2, elem => elem.parentNode.classList.toggle('is-open', elem === el));

			level2Open = el;

			category.textContent = el.textContent;

		});

	});

})(document.querySelectorAll('.js-open-menu-catalog'));