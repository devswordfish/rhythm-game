import Note from './Note.js'

function HoldNote(x, y, endY, width, height, speed) {
	Note.call(this, x, y, width, height, speed)
    this.endY = endY
	this.isLocked = false
}

HoldNote.prototype.move = function() {
	if (!this.isLocked) this.y += this.speed
	this.endY += this.speed
}

HoldNote.prototype.draw = function() {
	context.beginPath()
	context.fillRect(this.x, this.y, this.width, this.height)
	context.fillRect(this.x + 10, this.endY + this.height, this.width - 20, this.y - this.endY - this.height)
	context.fillRect(this.x, this.endY, this.width, this.height)
}

HoldNote.prototype.hasReachedHitArea = function(hitArea) {
	return (this.isLocked ? this.endY : this.y) > hitArea.y + hitArea.height
}

HoldNote.prototype.lockStartNote = function(y) {
	this.isLocked = true
	this.y = y
}

Object.setPrototypeOf(HoldNote.prototype, Note.prototype)

export default HoldNote
