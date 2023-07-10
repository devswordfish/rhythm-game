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
pianoGamemode.createLane(KEYS[0], 50, [966, 2360, 4566, 5068, 5636, 6204, 17700], [[13349, 15599]])
pianoGamemode.createLane(KEYS[1], 130, [4784, 5352, 5920, 8966, 11166, 13349, 15599], [])
pianoGamemode.createLane(KEYS[2], 210, [83, 7050, 7552, 8120, 15599], [[966, 2360], [8966, 11166]])
pianoGamemode.createLane(KEYS[3], 290, [2360, 6766, 7268, 7836, 8404, 11166, 13349, 17700], [])

const music = new Audio('./perception.mp3')

const WAITING_TIME = 1000 // in mileseconds
const MUSIC_START_TIME = NOTE_DELAY + WAITING_TIME
let startTime = 0 // time when update function is called (mileseconds)
let started = false
let isPlaying = false

function update(timestamp) {
	if (!startTime) startTime = timestamp
	const frameTime = timestamp - startTime // real time (mileseconds)
	
	if (!started) {
		// wait some time before starting the game
		if (frameTime > WAITING_TIME) {
			started = true
		}
	} else {
		const currentTime = frameTime - WAITING_TIME // music time (mileseconds)

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

addEventListener('click', () => {
	if (!isPlaying) {
		requestAnimationFrame(update)
		isPlaying = true
	}
})
