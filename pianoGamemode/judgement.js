const JUDGEMENT = {
    PERFECT: 'PERFECT',
    OK: 'OK',
    MISS: 'MISS',
}

const JUDGEMENT_DISTANCE = {
    PERFECT: 15,
    OK: 30,
    MISS: 60,
}

const MAX_JUDGE_DISTNCE = JUDGEMENT_DISTANCE.MISS

function Judger() {}

Judger.judgeHitNote = function(noteY, hitAreaY) {
    const distance = Math.abs(noteY - hitAreaY)

	if (distance < JUDGEMENT_DISTANCE.PERFECT) return JUDGEMENT.PERFECT
	else if (distance < JUDGEMENT_DISTANCE.OK) return JUDGEMENT.OK
	else if (distance < JUDGEMENT_DISTANCE.MISS) return JUDGEMENT.MISS
}

Judger.judgeStartHoldnote = function(noteStartY, hitAreaY) {
    const distance = Math.abs(noteStartY - hitAreaY)

	if (distance < JUDGEMENT_DISTANCE.PERFECT) return JUDGEMENT.PERFECT
	else if (distance < JUDGEMENT_DISTANCE.OK) return JUDGEMENT.OK
	else if (distance < JUDGEMENT_DISTANCE.MISS) return JUDGEMENT.MISS
}

Judger.judgeEndHoldNote = function(noteEndY, hitAreaY) {
    const distance = Math.abs(noteEndY - hitAreaY)

	if (distance < JUDGEMENT_DISTANCE.PERFECT) return JUDGEMENT.PERFECT
	else if (distance < JUDGEMENT_DISTANCE.OK) return JUDGEMENT.OK
	return JUDGEMENT.MISS
}

export {
    JUDGEMENT,
    MAX_JUDGE_DISTNCE,
    Judger
}

