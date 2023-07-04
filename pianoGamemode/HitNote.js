import Note from './Note.js'

function HitNote(x, y, width, height, speed) {
	Note.call(this, x, y, width, height, speed)
}

HitNote.prototype.draw = function() {
	context.beginPath()
	context.fillRect(this.x, this.y, this.width, this.height)
}

Object.setPrototypeOf(HitNote.prototype, Note.prototype)

export default HitNote
