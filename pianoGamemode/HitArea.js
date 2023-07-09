function HitArea(x, y, width, height) {
	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.pressed = false
}

HitArea.prototype.draw = function() {
	context.beginPath()
	context.rect(this.x, this.y, this.width, this.height)

	if (this.pressed) {		
		context.save()
		context.fillStyle = 'rgb(0, 0, 0)'
		context.fill()
		context.restore()
	} else {
		context.stroke()
	}
}

HitArea.prototype.press = function() {
	this.pressed = true
}

HitArea.prototype.unpress = function() {
	this.pressed = false
}

HitArea.prototype.hasHitNote = function(note) {
	return Math.abs(note.y - this.y + (note.height - this.height) / 2) < note.height + this.height / 2
}

HitArea.prototype.judgeNote = function(note) {
	const distance = Math.abs(note.y - this.y + (note.height - this.height) / 2)

	if (distance < (note.height + this.height) / 4) return 'PERFECT'
	else if (distance < (note.height + this.height) / 2) return 'OK'
	else if (distance < note.height + this.height / 2) return 'MISS'
}

export default HitArea
