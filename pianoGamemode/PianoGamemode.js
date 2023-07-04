import PianoLane from './Pianolane.js'

function PianoGamemode(noteWidth, noteHeight, noteSpeed) {
	this.noteWidth = noteWidth
	this.noteHeight = noteHeight
	this.noteSpeed = noteSpeed
	this.pianoLanes = {}
	this.score = 0
	this.combo = 0
}

PianoGamemode.prototype.clear = function() {
	context.save()
	context.beginPath()
	context.fillStyle = 'rgb(255, 255, 255)'
	context.fillRect(0, 0, canvas.width, canvas.height)
	context.restore()
}

PianoGamemode.prototype.draw = function() {
	drawBorder.call(this)
	drawPianoLanes.call(this)
}

function drawBorder() {
	context.save()
	context.lineWidth = 4
	context.strokeRect(0, 0, canvas.width, canvas.height)
	context.restore()
}

function drawPianoLanes() {
	Object.values(this.pianoLanes).forEach(pianoLane => {
		pianoLane.draw()
	})
}

PianoGamemode.prototype.drawScore = function() {
	const scoreStr = this.score.toString().padStart(7, '0')
	const styledScore = scoreStr[0] + '\'' + scoreStr.slice(1, 4) + '\'' + scoreStr.slice(4)

	context.textAlign = 'left'
	context.fillText(styledScore, canvas.width - 150, 50)
}

PianoGamemode.prototype.drawCombo = function() {
	context.textAlign = 'center'
	context.fillText('COMBO', canvas.width - 100, 200)
	context.fillText(this.combo, canvas.width - 100, 230)
}

PianoGamemode.prototype.createLane = function(key, x, notesSpawnTime) {
	this.pianoLanes[key] = new PianoLane(x, this.noteWidth, this.noteHeight, this.noteSpeed, notesSpawnTime)
}

PianoGamemode.prototype.createNotes = function(currentTime) {
	Object.values(this.pianoLanes).forEach(pianoLane => {
		pianoLane.createNotes(currentTime)
	})
}

PianoGamemode.prototype.moveNotes = function() {
	Object.values(this.pianoLanes).forEach(pianoLane => {
		pianoLane.moveNotes()
	})
}

PianoGamemode.prototype.pressKeyOnLane = function(key) {
	const judgment = this.pianoLanes[key].pressHitArea()

	switch (judgment) {
		case 'PERFECT':
			this.score += 10
			this.combo++
			break
		case 'OK':
			this.score += 4
			this.combo++
			break		
		case 'MISS':
			this.combo = 0
			break
	}
}

PianoGamemode.prototype.unpressKeyOnLane = function(key) {
	this.pianoLanes[key].unpressHitArea()
}

export default PianoGamemode
