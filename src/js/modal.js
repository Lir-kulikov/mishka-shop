((modal)=>{

	"use strict";

	if(!modal) {

		return;

	}

	var items = modal.querySelectorAll('.modal__item'),
		btns = document.querySelectorAll('[data-modal]'),
		box = modal.querySelector('.modal__box'),
		wrapper = document.querySelector('.wrapper'),
		windowScroll = window.pageYOffset;

	modal.addEventListener('click', evt => {

		if(evt.target.classList.contains('modal') || evt.target.closest('.modal__close')){

			MI.hideModal();

		}

	});

	MI.hideModal = () => {

		document.body.classList.remove('modal-show');
		wrapper.style.top = 0;
		window.scrollTo(0,windowScroll);

		MI.activeModal = false;

	};

	MI.modalShow = selector => {

		if(!MI.activeModal){

			windowScroll = window.pageYOffset;

			wrapper.style.top = -windowScroll + 'px';

		}

		MI.activeModal = modal.querySelector('.modal__item--' + selector);

		Array.from(items, el =>
			el.classList.toggle('visuallyhidden', el !== MI.activeModal));

		document.body.classList.add('modal-show');
		window.scrollTo(0,0);

		MI.activeModal.focus();

	};

	Array.from(btns, el =>
		el.addEventListener('click', () =>
			MI.modalShow(el.getAttribute('data-modal'))));

})(document.querySelector('.modal'));