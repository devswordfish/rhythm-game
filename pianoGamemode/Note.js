function Note(x, y, width, height, speed) {
	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.speed = speed
}

Note.prototype.move = function() {
	this.y += this.speed
}

Note.prototype.hasReachedHitArea = function(hitArea) {
	return this.y > hitArea.y + hitArea.height
}

export default Note
