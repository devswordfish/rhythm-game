import HitNote from './HitNote.js'
import HitArea from './HitArea.js'

function PianoLane(x, hitAreaY, noteWidth, noteHeight, notespeed, notesSpawnTime) {
    this.x = x
    this.noteWidth = noteWidth
    this.noteHeight = noteHeight
    this.notespeed = notespeed
    this.notesSpawnTime = notesSpawnTime
    this.hitArea = new HitArea(x, hitAreaY, noteWidth, noteHeight)
    this.currentIndex = 0
    this.notes = []
}

PianoLane.prototype.draw = function() {
    const lineLeft = this.x - 10
    const lineRight = this.x + this.noteWidth + 10

    context.beginPath()
    context.moveTo(lineLeft, 0)
    context.lineTo(lineLeft, canvas.height)
    context.moveTo(lineRight, 0)
    context.lineTo(lineRight, canvas.height)
    context.stroke()
}

PianoLane.prototype.drawNotes = function() {
    for (const note of this.notes) {
        note.draw()
    }
}

PianoLane.prototype.drawHitArea = function() {
    this.hitArea.draw()
}

PianoLane.prototype.moveNotes = function() {
    for (const note of this.notes) {
        note.move()
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
    this.hitArea.press()
}

PianoLane.prototype.unpressHitArea = function() {
    this.hitArea.unpress()
}


export default PianoLane
