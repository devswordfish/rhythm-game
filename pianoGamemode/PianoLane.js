import HitNote from './HitNote.js'
import HoldNote from './HoldNote.js'
import HitArea from './HitArea.js'

import { JUDGEMENT, Judger } from './judgement.js'

function PianoLane(x, noteWidth, noteHeight, noteSpeed, hitNotesTime, holdNotesTime) {
	this.x = x
	this.border = {
		left: x - 10,
		right: x + noteWidth + 10
	}
	this.noteWidth = noteWidth
	this.noteHeight = noteHeight
	this.noteSpeed = noteSpeed

	this.hitNotesTime = hitNotesTime
	this.holdNotesTime = holdNotesTime
	this.hitIndex = 0
	this.holdIndex = 0

	this.hitArea = new HitArea(x, canvas.height - 10 - noteHeight, noteWidth, noteHeight)
	this.notes = []
}
	
PianoLane.prototype.draw = function() {
	drawLane.call(this)
	drawNotes.call(this)
	this.hitArea.draw()
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

PianoLane.prototype.moveNotes = function(resetComboFunc) {
	for (const note of this.notes) {
		if (note.hasReachedHitArea(this.hitArea)) {
			this.notes = this.notes.filter(n => n !== note)
			resetComboFunc()
		} else {
			note.move()
		}
	}
}

PianoLane.prototype.createNotes = function(currentTime) {
	createHitNotes.call(this, currentTime)
	createHoldNotes.call(this, currentTime)
}

function createHitNotes(currentTime) {
	if (
		this.hitNotesTime.length !== this.hitIndex &&
		currentTime > this.hitNotesTime[this.hitIndex]
	) {
		this.notes.push(
			new HitNote(this.x, -this.noteHeight, this.noteWidth, this.noteHeight, this.noteSpeed)
		)
		this.hitIndex++
	}
}

function createHoldNotes(currentTime) {
	if (
		this.holdNotesTime.length !== this.holdIndex &&
		currentTime > this.holdNotesTime[this.holdIndex][0]
	) {
		const [startTime, finalTime] = this.holdNotesTime[this.holdIndex]
		const length = (finalTime - startTime) * this.noteSpeed * (60 / 1000)

		this.notes.push(
			new HoldNote(this.x, -this.noteHeight, -(length + this.noteHeight), this.noteWidth, this.noteHeight, this.noteSpeed)
		)
		this.holdIndex++
	}
}

PianoLane.prototype.pressHitArea = function() {
	let judgement = ''

	if (this.notes.length !== 0) {
		const firstNote = this.notes[0]

		if (!this.hitArea.pressed) {
			if (HitNote.prototype.isPrototypeOf(firstNote)) {
				if (this.hitArea.hasHitNote(firstNote.y)) {
					judgement = Judger.judgeHitNote(firstNote.y, this.hitArea.y)
					this.notes.shift()
				}
			} else if (HoldNote.prototype.isPrototypeOf(firstNote)) {
				if (this.hitArea.hasHitNote(firstNote.y)) {
					judgement = Judger.judgeStartHoldnote(firstNote.y, this.hitArea.y)

					if (judgement === JUDGEMENT.MISS) this.notes.shift()
					else firstNote.lockStartNote(this.hitArea.y)
				}
			}
		}
	}

	this.hitArea.press()

	return judgement
}

PianoLane.prototype.unpressHitArea = function() {
	let judgement = ''

	if (this.notes.length !== 0) {
		const firstNote = this.notes[0]
		
		if (HoldNote.prototype.isPrototypeOf(firstNote)) {
			if (firstNote.isLocked) {
				judgement = Judger.judgeEndHoldNote(firstNote.endY, this.hitArea.y)
				this.notes.shift()
			}
		}
	}

	this.hitArea.unpress()

	return judgement
}

export default PianoLane
