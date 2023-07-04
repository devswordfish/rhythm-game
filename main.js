import PianoGamemode from './pianoGamemode/PianoGamemode.js'

const canvas = document.getElementById('game')
const context = canvas.getContext('2d')

canvas.width = 600
canvas.height = 500

window.canvas = canvas
window.context = context

const NOTE_SPEED = 3
const NOTE_WIDTH = 50
const NOTE_HEIGHT = 20
const KEYS = ['d', 'f', 'j', 'k']

const pianoGamemode = new PianoGamemode(NOTE_WIDTH, NOTE_HEIGHT, NOTE_SPEED)

pianoGamemode.createLane(KEYS[0], 50, 450, [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000])
pianoGamemode.createLane(KEYS[1], 130, 450, [250, 1250, 2250, 3250, 4250, 5250, 6250, 7250, 8250, 9250])
pianoGamemode.createLane(KEYS[2], 210, 450, [500, 1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500, 9500])
pianoGamemode.createLane(KEYS[3], 290, 450, [750, 1750, 2750, 3750, 4750, 5750, 6750, 7750, 8750, 9750])

const music = new Audio('./music_test.mp3')
music.volume = 0
const WAITING_TIME = 0 // in mileseconds
let startTime = 0 // time when update function is called (mileseconds)
let started = false

function update(timestamp) {
	if (!startTime) startTime = timestamp
	const frameTime = timestamp - startTime // real time (mileseconds)
	const currentTime = frameTime - WAITING_TIME // music time (mileseconds)

	// play the music after some time
	if (!started && frameTime > WAITING_TIME) {
		started = true
		music.play()
	}

	// when the music is playing
	if (!music.ended) {
		pianoGamemode.clear()

		pianoGamemode.createNotes(currentTime)
		pianoGamemode.moveNotes()

		pianoGamemode.draw()

		requestAnimationFrame(update)
	} else {
		console.log('MUSIC ENDED')
		console.log('start time: ', startTime)
		console.log('current time: ', currentTime)
		console.log('frame time: ', frameTime)
	}
}

addEventListener('keydown', e => {
	const key = e.key
	
	if (KEYS.includes(key))	pianoGamemode.pressKeyOnLane(key)
})

addEventListener('keyup', e => {
	const key = e.key

	if (KEYS.includes(key)) pianoGamemode.unpressKeyOnLane(key)
})

requestAnimationFrame(update)
