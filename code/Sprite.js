/**
 * The Sprite!
 */
class Sprite {
	/**
	 * Creates a sprite, drawn with [spritename].draw()
	 * @param {String} resource the filename of an image or emoji to display
	 * @param {Number} width the width of the sprite, in pixels
	 * @param {Number} height the hight of the sprite, in pixels
	 * @param {('x'|'y'|'xy')} mirror pass to mirror the sprite about the respective axes
	 */
	constructor(resource, width, height, mirror = false) {
		this.canvas = document.getElementById('canvas')
		this.context = this.canvas.getContext('2d')

		// fancy one-liner to check if you passed an image, you can ask me about this
		this.isEmoji = !resource.match(/.(jpg|jpeg|png|gif)$/i)

		this.mirror = mirror // simply remember what was passed to this Sprite
		this.rotation = 0 // in degrees
		this.loaded = false // has the image loaded yet?

		if (this.isEmoji) {
			this.sprite = resource // we have passed an emoji to draw as text
			this.loaded = true // no need to load image data
			this.width = width
			this.height = height
		} else {
			// use the image function from 'helpers.js'
			this.sprite = image(resource)
			this.sprite.onload = () => {
				this.loaded = true
				this.width = width == undefined ? this.sprite.width : width
				this.height = height == undefined ? this.sprite.height : height
			}
		}
	}

	/**
	 * Draws this sprite to the canvas
	 * @param {Number} x x-Coordinate (width) on the canvas
	 * @param {Number} y y-Coordinate (height) on the canvas
	 */
	draw(x, y) {
		// this fancy line below makes it so that we don't have to
		// keep typing 'this.xxx', and just access the property directly
		const { isEmoji, context, sprite, width, height, mirror, rotation } = this

		context.save() // make context mirroring not affect other things

		context.translate(x, y) // makes our lives easier, see below
		context.rotate((rotation * Math.PI) / 180)

		if (mirror) {
			switch (mirror) {
				case 'x':
					context.scale(1, -1)
					break
				case 'y':
					context.scale(-1, 1)
					break
				case 'xy':
					context.scale(-1, -1)
					break
				default:
					console.warn(
						sprite,
						': Mirror parameter only understands "x", "y" and "xy"'
					)
					break
			}
		}

		if (isEmoji) {
			context.font = `${height}px serif`
			context.textAlign = 'center'
			context.textBaseline = 'top'
			context.fillText(sprite, 0, 0, width) // no need to specify location
		} else {
			// no need to specify location
			context.drawImage(sprite, 0, 0, width, height) // no need to specify location
		}

		context.restore() // restore weird stuff like scale and text styles
	}
}
