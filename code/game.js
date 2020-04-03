/**
 * Hello Traf!
 * Find below the main game file. It sets up audio, images,
 * game variables and the game loop iteslf.
 */

// load sounds
const audioFlap = sound('fly.mp3')
const audioScore = sound('score.mp3')
const audioDeath = sound('grunt.wav')
const audioMuzak = sound('muzak.wav')

audioMuzak.loop = true
// audioMuzak.play()


const canvas = createCanvas('canvas')
const context = canvas.getContext('2d')


// Game Variables
let heightGap = 200 // gap between upper and lower pipes
let widthGap = 200 // gap between pipe intervals
let birdSize = 30 // size of player collision box
let birdX = birdSize + 10 // player X coordinate (fixed)
let birdY = 150 // player Y coordinate
let gravity = 1.8 // units player falls per frame
let score = 0 // pipes passed
let lift = 30 // how much each tap raises the player
let gameover = false


// Load sprites (see ./Sprites.js & Rect)
const bird = new Sprite('🍪', birdSize, birdSize - 10, 'y')
const background = new Sprite('bg_classic.png')
const nPipe = new Sprite('pipe_top.png', 80, 500)// try new Rect(80, 500, 'green')
const sPipe = new Sprite('pipe.png', 80, 500)
const foreground = new Sprite('fg.png')


// Interaction!
document.addEventListener('keydown', onFlap) // any key triggers 'moveup'
document.addEventListener('click', onFlap) // mouse clicks & taps trigger 'moveup'


// pipes array
const pipes = []


// The game loop, that runs every frame
function loop() {
	background.draw(0, 0)

	pipes.forEach(pipe => {
		let constant = nPipe.height + heightGap
		nPipe.draw(pipe.x, pipe.y)
		sPipe.draw(pipe.x, pipe.y + constant)

		pipe.x--

		if (hasCollided()) {
			onGameOver()
		}

		// push another pipe to the pies array
		if (pipe.x == canvas.width / 2) {
			pipes.push({
				x: canvas.width + widthGap,
				y: -nPipe.height + Math.floor(Math.random() * nPipe.height) - heightGap,
			})
		}

		// the last pipe is behind you, you scored!
		if (pipe.x == (birdSize + 10 - nPipe.width)) onChangeScore()
	})

	// memory management
	if (pipes.length > 10) pipes.shift()

	foreground.draw(0, canvas.height - foreground.height)
	bird.draw(birdX, birdY)

	birdY += gravity

	// draw the score
	context.fillStyle = '#000' // try 'blue'!
	context.font = '20px Arial'
	context.fillText('Score: ' + score, 10, canvas.height - 20)

	if (!gameover)
		requestAnimationFrame(loop)
}


// grab all our images
let images = [background, foreground, bird, nPipe, sPipe]
let imagesLoaded = false // assume they are not loaded yet

let int = setInterval(() => {
	imagesLoaded = images.every(image => image.loaded) // check if they are
	if (imagesLoaded) { // if so,
		// set first pipe
		pipes[0] = {
			x: canvas.width,
			y: -nPipe.height + Math.floor(Math.random() * nPipe.height) - heightGap,
		}
		clearInterval(int) // stop checking
		loop() // run the game!
	}
}, 50) // ... else, do this check again every 50 ms


// called every time you lose
function onGameOver() {
	gameover = true
	// audioDeath.play()
	// // reload the page when audio finishes playing
	// audioDeath.onended = () => location.reload()

	location.reload() // reload the page immediately
}


// Called every time you score
function onChangeScore () {
	audioScore.play()
	score++
}


// called every time you try to fly up
function onFlap() {
	birdY -= lift
	// audioFlap.play()
}


// -------------------------------------------
function hasCollided () {
	return (
		(birdX + bird.width >= pipe.x && // bird is within pipe x-space AND
			birdX <= pipe.x + nPipe.width && // not beyond it, AND
			(birdY <= pipe.y + nPipe.height || // bird's Y is within the north pipe's, OR
				birdY + bird.height >= pipe.y + sPipe.height + heightGap)) || // within the south pipe's Y. OR ...
		birdY + bird.height >= canvas.height - foreground.height // ... bird crashed into the ground!
	) // returns whether all of this is either true (crashed) or false (still flying!)
}
