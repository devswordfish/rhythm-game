import HitNote from './HitNote.js'
import HitArea from './HitArea.js'

function PianoLane(x, hitAreaY, noteWidth, noteHeight, notespeed, notesSpawnTime) {
	this.x = x
	this.border = {
		left: x - 10,
		right: x + noteWidth + 10
	}
	this.noteWidth = noteWidth
	this.noteHeight = noteHeight
	this.notespeed = notespeed
	this.notesSpawnTime = notesSpawnTime
	this.hitArea = new HitArea(x, hitAreaY, noteWidth, noteHeight)
	this.currentIndex = 0
	this.notes = []
}
	
PianoLane.prototype.draw = function() {
	drawLane.call(this)
	drawNotes.call(this)
	drawHitArea.call(this)
}

function drawLane() {
	context.beginPath()
	context.moveTo(this.border.left, 0)
	context.lineTo(this.border.left, canvas.height)
	context.moveTo(this.border.right, 0)
	context.lineTo(this.border.right, canvas.height)
	context.stroke()
}

function drawNotes() {
	for (const note of this.notes) {
		note.draw()
	}
}

function drawHitArea() {
	this.hitArea.draw()
}

PianoLane.prototype.moveNotes = function() {
	for (const note of this.notes) {
		if (note.hasReachedHitArea(this.hitArea)) {
			this.notes = this.notes.filter(n => n !== note)
		} else {
			note.move()
		}
	}
}

PianoLane.prototype.createNotes = function(currentTime) {
	if (this.notesSpawnTime.length !== this.currentIndex) {   
		if (currentTime > this.notesSpawnTime[this.currentIndex]) {
			this.notes.push(
				new HitNote(
					this.x, -this.noteHeight, this.noteWidth, this.noteHeight, this.notespeed
				)
			)
			this.currentIndex++
		}
	}
}

PianoLane.prototype.pressHitArea = function() {
	if (this.notes.length !== 0 && this.hitArea.hasHitNote(this.notes[0])) {
		console.log(this.hitArea.judgeNote(this.notes[0]))
		this.notes.shift()
	}
		
	this.hitArea.press()
}

PianoLane.prototype.unpressHitArea = function() {
	this.hitArea.unpress()
}

export default PianoLane
