/**
 * Rect class
 * @description Used for debugging your game without images
 */
class Rect {
	constructor(width, height, fill = 'blue') {
		this.width = width
		this.height = height
		this.fill = fill
		this.loaded = true
	}

	draw(x, y) {
		context.save()
		context.translate(x, y)
		context.fillStyle = this.fill
		context.fillRect(0, 0, this.width, this.height)
		context.restore()
	}
}
