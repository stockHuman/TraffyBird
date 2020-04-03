/**
 *
 */

/**
 * Returns a path-prefixed Audio element
 * @param {String} filename
 */
function sound(filename) {
	let a = new Audio()
	a.src = 'assets/sounds/' + filename
	return a
}

/**
 * Returns a path-prefixed Image element
 * @param {String} filename
 */
function image(filename) {
	let i = new Image()
	i.src = 'assets/images/' + filename
	return i
}

/**
 * Creates and scales a canvas for 4K displays
 * @param {String} id DOM id of the canvas we're using
 */
function createCanvas(id) {
	let canvas = document.getElementById(id)
	let context = canvas.getContext('2d')

	// get current size of the canvas
	let rect = canvas.getBoundingClientRect()

	// increase the actual size of our canvas
	canvas.width = rect.width * devicePixelRatio
	canvas.height = rect.height * devicePixelRatio
	canvas.imageSmoothingEnabled = false

	// ensure all drawing operations are scaled
	context.scale(devicePixelRatio, devicePixelRatio)

	// scale everything down using CSS
	canvas.style.width = rect.width + 'px'
	canvas.style.height = rect.height + 'px'

	return canvas
}
