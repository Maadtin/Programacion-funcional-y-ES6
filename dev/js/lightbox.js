const getImages = container => [...container.querySelectorAll("img")];

const getSrcImages = gallery => gallery.map( el => el.src );

const getDescriptions = gallery =>  gallery.map( el => el.alt );


const openLightBoxEvent = (container, gallery, images, descriptions) => {
	container.addEventListener('click', e => {
		let el = e.target,
			 i = gallery.indexOf(el);
		if ( el.tagName === 'IMG' ) {
			openLightBox(gallery, i, images, descriptions);
		}
	})
};

const openLightBox = (gallery, i, images, descriptions) => {

	let lightBoxElement = document.createElement('div');

	lightBoxElement.innerHTML = `
		<div class="lightbox-overlay">
			<figure class="lightbox-container">
				<div class="close-modal">✖</div>
				<img src="${images[i]}" class="lightbox-image">
				<figcaption>
					<p class="lightbox-description">${descriptions[i]}</p>
					<nav class="lightbox-navigation">
						<a href="" class="lightbox-navigation__button prev">↩</a>
						<span class="lightbox-navigation__counter">Imagen ${i + 1} de ${gallery.length}</span>
						<a href="" class="lightbox-navigation__button next">↪</a>
					</nav>
				</figcaption>
			</figure>
		</div>
		`;

	lightBoxElement.id = "lightbox";

	document.body.appendChild(lightBoxElement);

	closeModal(lightBoxElement);
	nagivateLighBox(lightBoxElement, i, images, descriptions)

};


const closeModal = modalElement => {
	let closeModal = modalElement.querySelector(".close-modal");
	closeModal.addEventListener('click', e => {
		e.preventDefault();
		document.body.removeChild(modalElement);
	});
};

const lightbox = container => {
	let images = getImages(container),
		 srcImages = getSrcImages(images),
		 descriptions = getDescriptions(images);

	openLightBoxEvent(container, images, srcImages, descriptions);
};

lightbox(document.getElementById("gallery-container"));

const nagivateLighBox = (lightBoxElement, i, images, descriptions) => {

	let prevButton = lightBoxElement.querySelector(".prev"),
		 nextButton = lightBoxElement.querySelector(".next"),
		 image = lightBoxElement.querySelector("img"),
		 description = lightBoxElement.querySelector("p"),
		 counter = lightBoxElement.querySelector("span");

	lightBoxElement.addEventListener('click', e => {
		e.preventDefault();
		if(e.target === prevButton) {
			if( i > 0 ) {
				image.src = images[i - 1];
				i--;
			} else {
				// al llegar a la primera imagen y darle hacía atrás te lleva hacía la última posición del lightbox y reseteamos i
				image.src = images[ images.length - 1]
				i =  images.length - 1;
			}

		} else if (e.target === nextButton) {

			if( i < images.length - 1) {
				image.src = images[i + 1];
				i++;
			} else {
				// volvemos al inicio...
				image.src = images[0];

				i = 0;
			}

		}

		description.textContent = descriptions[i];
		counter.textContent = `Imagen ${i + 1} de ${images.length}`;
	})

};