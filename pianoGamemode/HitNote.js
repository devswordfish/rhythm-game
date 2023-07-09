import Note from './Note.js'

function HitNote(x, y, width, height, speed) {
	Note.call(this, x, y, width, height, speed)
}

HitNote.prototype.move = function() {
	this.y += this.speed
}

HitNote.prototype.draw = function() {
	context.beginPath()
	context.fillRect(this.x, this.y, this.width, this.height)
}

HitNote.prototype.hasReachedHitArea = function(hitArea) {
	return this.y > hitArea.y + hitArea.height
}

HitNote.prototype.getHitBox = function() {
	return {
		x: this.x,
		y: this.y,
		width: this.width,
		height: this.height
	}
}

Object.setPrototypeOf(HitNote.prototype, Note.prototype)

export default HitNote
