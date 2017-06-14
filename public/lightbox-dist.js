'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getImages = function getImages(container) {
	return [].concat(_toConsumableArray(container.querySelectorAll("img")));
};

var getSrcImages = function getSrcImages(gallery) {
	return gallery.map(function (el) {
		return el.src;
	});
};

var getDescriptions = function getDescriptions(gallery) {
	return gallery.map(function (el) {
		return el.alt;
	});
};

var openLightBoxEvent = function openLightBoxEvent(container, gallery, images, descriptions) {
	container.addEventListener('click', function (e) {
		var el = e.target,
		    i = gallery.indexOf(el);
		if (el.tagName === 'IMG') {
			openLightBox(gallery, i, images, descriptions);
		}
	});
};

var openLightBox = function openLightBox(gallery, i, images, descriptions) {

	var lightBoxElement = document.createElement('div');

	lightBoxElement.innerHTML = '\n\t\t<div class="lightbox-overlay">\n\t\t\t<figure class="lightbox-container">\n\t\t\t\t<div class="close-modal">\u2716</div>\n\t\t\t\t<img src="' + images[i] + '" class="lightbox-image">\n\t\t\t\t<figcaption>\n\t\t\t\t\t<p class="lightbox-description">' + descriptions[i] + '</p>\n\t\t\t\t\t<nav class="lightbox-navigation">\n\t\t\t\t\t\t<a href="" class="lightbox-navigation__button prev">\u21A9</a>\n\t\t\t\t\t\t<span class="lightbox-navigation__counter">Imagen ' + (i + 1) + ' de ' + gallery.length + '</span>\n\t\t\t\t\t\t<a href="" class="lightbox-navigation__button next">\u21AA</a>\n\t\t\t\t\t</nav>\n\t\t\t\t</figcaption>\n\t\t\t</figure>\n\t\t</div>\n\t\t';

	lightBoxElement.id = "lightbox";

	document.body.appendChild(lightBoxElement);

	closeModal(lightBoxElement);
	nagivateLighBox(lightBoxElement, i, images, descriptions);
};

var closeModal = function closeModal(modalElement) {
	var closeModal = modalElement.querySelector(".close-modal");
	closeModal.addEventListener('click', function (e) {
		e.preventDefault();
		document.body.removeChild(modalElement);
	});
};

var lightbox = function lightbox(container) {
	var images = getImages(container),
	    srcImages = getSrcImages(images),
	    descriptions = getDescriptions(images);

	openLightBoxEvent(container, images, srcImages, descriptions);
};

lightbox(document.getElementById("gallery-container"));

var nagivateLighBox = function nagivateLighBox(lightBoxElement, i, images, descriptions) {

	var prevButton = lightBoxElement.querySelector(".prev"),
	    nextButton = lightBoxElement.querySelector(".next"),
	    image = lightBoxElement.querySelector("img"),
	    description = lightBoxElement.querySelector("p"),
	    counter = lightBoxElement.querySelector("span");

	lightBoxElement.addEventListener('click', function (e) {
		e.preventDefault();
		if (e.target === prevButton) {
			if (i > 0) {
				image.src = images[i - 1];
				i--;
			} else {
				// al llegar a la primera imagen y darle hacía atrás te lleva hacía la última posición del lightbox y reseteamos i
				image.src = images[images.length - 1];
				i = images.length - 1;
			}
		} else if (e.target === nextButton) {

			if (i < images.length - 1) {
				image.src = images[i + 1];
				i++;
			} else {
				// volvemos al inicio...
				image.src = images[0];

				i = 0;
			}
		}

		description.textContent = descriptions[i];
		counter.textContent = 'Imagen ' + (i + 1) + ' de ' + images.length;
	});
};