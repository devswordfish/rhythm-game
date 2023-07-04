import PianoGamemode from './pianoGamemode/PianoGamemode.js'

const canvas = document.getElementById('game')
const context = canvas.getContext('2d')

canvas.width = 600
canvas.height = 500
context.font = '26px monospace'

window.canvas = canvas
window.context = context

const NOTE_SPEED = 10
const NOTE_WIDTH = 50
const NOTE_HEIGHT = 50
const NOTE_DELAY = Math.round(canvas.height / NOTE_SPEED * (1000 / 60))
const KEYS = ['d', 'f', 'j', 'k']

const pianoGamemode = new PianoGamemode(NOTE_WIDTH, NOTE_HEIGHT, NOTE_SPEED)

pianoGamemode.createLane(KEYS[0], 50, [])
pianoGamemode.createLane(KEYS[1], 130, [])
pianoGamemode.createLane(KEYS[2], 210, [])
pianoGamemode.createLane(KEYS[3], 290, [3600, 5900, 8100])

const music = new Audio('./music_test.mp3')
// music.volume = 0
const WAITING_TIME = 3000 // in mileseconds
const MUSIC_START_TIME = NOTE_DELAY + WAITING_TIME
let startTime = 0 // time when update function is called (mileseconds)
let started = false

function update(timestamp) {
	if (!startTime) startTime = timestamp
	const frameTime = timestamp - startTime // real time (mileseconds)
	const currentTime = frameTime - MUSIC_START_TIME // music time (mileseconds)

	if (!started) {
		// wait some time before starting the game
		if (frameTime > WAITING_TIME) {
			started = true
		}
	} else {
		// wait some time to sync the notes
		if (music.paused && frameTime > MUSIC_START_TIME) {
			music.play()
		}

		pianoGamemode.clear()

		pianoGamemode.drawScore()
		pianoGamemode.drawCombo()

		pianoGamemode.createNotes(currentTime)
		pianoGamemode.moveNotes()

		pianoGamemode.draw()
	}

	requestAnimationFrame(update)
}

addEventListener('keydown', e => {
	const key = e.key

	if (KEYS.includes(key))	pianoGamemode.pressKeyOnLane(key)
})

addEventListener('keyup', e => {
	const key = e.key

	if (KEYS.includes(key)) pianoGamemode.unpressKeyOnLane(key)
})

pianoGamemode.draw()
pianoGamemode.drawScore()
pianoGamemode.drawCombo()

requestAnimationFrame(update)
