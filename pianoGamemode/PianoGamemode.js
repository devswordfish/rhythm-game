import PianoLane from './Pianolane.js'

function PianoGamemode(noteWidth, noteHeight, noteSpeed) {
	this.noteWidth = noteWidth
	this.noteHeight = noteHeight
	this.noteSpeed = noteSpeed
	this.pianoLanes = {}
}

PianoGamemode.prototype.clear = function() {
	context.save()
	context.beginPath()
	context.fillStyle = 'rgb(255, 255, 255)'
	context.fillRect(0, 0, canvas.width, canvas.height)
	context.restore()
}

PianoGamemode.prototype.drawBorder = function() {
	context.save()
	context.lineWidth = 4
	context.strokeRect(0, 0, canvas.width, canvas.height)
	context.restore()
}

PianoGamemode.prototype.drawNotes = function() {
	Object.values(this.pianoLanes).forEach(pianoLane => {
		pianoLane.drawNotes()
	})
}

PianoGamemode.prototype.drawPianoLanes = function() {
	Object.values(this.pianoLanes).forEach(pianoLane => {
		pianoLane.draw()
	})
}

PianoGamemode.prototype.drawHitAreas = function() {
	Object.values(this.pianoLanes).forEach(pianoLane => {
		pianoLane.drawHitArea()
	})
}

PianoGamemode.prototype.createLane = function(key, x, hitAreaY, notesSpawnTime) {
	this.pianoLanes[key] = new PianoLane(x, hitAreaY, this.noteWidth, this.noteHeight, this.noteSpeed, notesSpawnTime)
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
	this.pianoLanes[key].pressHitArea()
}

PianoGamemode.prototype.unpressKeyOnLane = function(key) {
	this.pianoLanes[key].unpressHitArea()
}

export default PianoGamemode
