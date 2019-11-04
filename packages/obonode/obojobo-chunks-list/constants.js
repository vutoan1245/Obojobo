const LIST_NODE = 'ObojoboDraft.Chunks.List'
const LIST_LINE_NODE = 'ObojoboDraft.Chunks.List.Line'
const LIST_LEVEL_NODE = 'ObojoboDraft.Chunks.List.Level'

const ALPHA = 'alpha'
const CIRCLE = 'circle'
const DECIMAL = 'decimal'
const DISC = 'disc'
const ORDERED = 'ordered'
const UNORDERED = 'unordered'
const SQUARE = 'square'
const LOWER_ALPHA = 'lower-alpha'
const LOWER_ROMAN = 'lower-roman'
const UPPER_ALPHA = 'upper-alpha'
const UPPER_ROMAN = 'upper-roman'

const unorderedBullets = [DISC, CIRCLE, SQUARE]
const orderedBullets = [DECIMAL, UPPER_ALPHA, UPPER_ROMAN, LOWER_ALPHA, LOWER_ROMAN]

export {
	LIST_NODE,
	LIST_LINE_NODE,
	LIST_LEVEL_NODE,
	ALPHA,
	CIRCLE,
	DECIMAL,
	DISC,
	ORDERED,
	UNORDERED,
	SQUARE,
	LOWER_ALPHA,
	LOWER_ROMAN,
	UPPER_ALPHA,
	UPPER_ROMAN,
	unorderedBullets,
	orderedBullets
}
