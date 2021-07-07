((header) => {

	"use strict";

	if(!header) {

		return;

	}

	const headerTop = header.querySelector('.header__top');

	MI.headerHeight = headerTop.clientHeight;

	PubSub.subscribe('windowScroll', () => headerTop.classList.toggle('is-scroll', window.pageYOffset > 0));

	PubSub.subscribe('windowWidthResize', () => {

		MI.headerHeight = headerTop.clientHeight;

		document.documentElement.style.setProperty("--heightHeader", MI.headerHeight + 'px');

	});

})(document.querySelector('.header'));