
const emptyImg = new Image();
emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

const initTransform = {
	translateX: 0,
	translateY: 0,
	scale: 1
};
let transform = { ...initTransform };

const video = document.querySelector('video');
const vidCover = document.elementFromPoint(...getMidpoint(video));
vidCover.setAttribute('draggable', true);

let startX, startY, startTX, startTY;
vidCover.addEventListener('dragstart', e => {
	e.dataTransfer.setDragImage(emptyImg, 0, 0);

	startTX = transform.translateX;
	startTY = transform.translateY;

	startX = e.pageX;
	startY = e.pageY;
});

vidCover.addEventListener('drag', e => e.preventDefault());

function adjustScale(e) {
	const delta = Math.sign(e.deltaY);
	const scaleFactor = 1.05;
	transform.scale *= delta < 0 ? scaleFactor : (1 / scaleFactor);
	updateVideo();
}

ticking = false;
vidCover.addEventListener('wheel', e => {
	e.preventDefault();

	if (!ticking) {
		window.requestAnimationFrame(() => {
			adjustScale(e);
			ticking = false;
		});

		ticking = true;
	}
});

document.addEventListener('dragover', e => {
	transform.translateX = startTX + ((e.pageX - startX) / transform.scale);
	transform.translateY = startTY + ((e.pageY - startY) / transform.scale);

	updateVideo();
});

// Reset
vidCover.addEventListener("dblclick", e => {
	e.preventDefault();
	transform = { ...initTransform };
	updateVideo();
	e.stopPropagation()
});

function updateVideo() {
	const x = transform.translateX;
	const y = transform.translateY;
	const scale = transform.scale;

	video.style['transform'] = `scale(${scale}) translate(${x}px, ${y}px)`;	
}

function getMidpoint(e) {
	const { x, y, width, height } = e.getBoundingClientRect();
	return [ x + 0.5*width, y + 0.5*height ];
}
