import { MAX_JUDGE_DISTNCE } from './judgement.js'

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

HitArea.prototype.hasHitNote = function(noteY) {
	return Math.abs(noteY - this.y) < MAX_JUDGE_DISTNCE
}

export default HitArea
