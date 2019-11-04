import looksLikeListItem from './list-detector'
import {
	DECIMAL,
	ORDERED,
	UNORDERED,
	LOWER_ALPHA,
	LOWER_ROMAN,
	UPPER_ALPHA,
	UPPER_ROMAN
} from './constants'

describe('List Detector', () => {
	test('looksLikeListItem will return false when text is not formatted property', () => {
		expect(looksLikeListItem('')).toBe(false)
		expect(looksLikeListItem(' ')).toBe(false)
		expect(looksLikeListItem('  ')).toBe(false)
		expect(looksLikeListItem('*')).toBe(false)
		expect(looksLikeListItem('*Text')).toBe(false)
		expect(looksLikeListItem('* Text')).toBe(false)
		expect(looksLikeListItem('1')).toBe(false)
		expect(looksLikeListItem('1Text')).toBe(false)
		expect(looksLikeListItem('1.')).toBe(false)
		expect(looksLikeListItem('1.Text')).toBe(false)
		expect(looksLikeListItem('1. Text')).toBe(false)
		expect(looksLikeListItem('1 ')).toBe(false)
		expect(looksLikeListItem('*. ')).toBe(false)
	})

	test('looksLikeListItem returns details about a text-representation of an unordered list', () => {
		expect(looksLikeListItem('* ')).toEqual({
			type: UNORDERED,
			symbol: '*',
			symbolIndex: 1,
			defaultSymbol: true,
			symbolStyle: ''
		})
	})

	test('looksLikeListItem returns details about a text-representation of an ordered list - Number', () => {
		expect(looksLikeListItem('1. ')).toEqual({
			type: ORDERED,
			symbol: '1',
			symbolIndex: 1,
			defaultSymbol: true,
			symbolStyle: DECIMAL
		})

		expect(looksLikeListItem('01. ')).toEqual({
			type: ORDERED,
			symbol: '01',
			symbolIndex: 1,
			defaultSymbol: false,
			symbolStyle: 'decimal-leading-zero'
		})

		expect(looksLikeListItem('2. ')).toEqual({
			type: ORDERED,
			symbol: '2',
			symbolIndex: 2,
			defaultSymbol: false,
			symbolStyle: DECIMAL
		})
	})

	test('looksLikeListItem returns details about a text-representation of an ordered list - Letter', () => {
		expect(looksLikeListItem('a. ')).toEqual({
			type: ORDERED,
			symbol: 'a',
			symbolIndex: 1,
			defaultSymbol: false,
			symbolStyle: LOWER_ALPHA
		})

		expect(looksLikeListItem('B. ')).toEqual({
			type: ORDERED,
			symbol: 'B',
			symbolIndex: 2,
			defaultSymbol: false,
			symbolStyle: UPPER_ALPHA
		})
	})

	test('looksLikeListItem returns details about a text-representation of an ordered list - Roman', () => {
		expect(looksLikeListItem('i. ')).toEqual({
			type: ORDERED,
			symbol: 'i',
			symbolIndex: 1,
			defaultSymbol: false,
			symbolStyle: LOWER_ROMAN
		})

		expect(looksLikeListItem('II. ')).toEqual({
			type: ORDERED,
			symbol: 'II',
			symbolIndex: 2,
			defaultSymbol: false,
			symbolStyle: UPPER_ROMAN
		})

		expect(looksLikeListItem('iii. ')).toEqual({
			type: ORDERED,
			symbol: 'iii',
			symbolIndex: 3,
			defaultSymbol: false,
			symbolStyle: LOWER_ROMAN
		})

		expect(looksLikeListItem('IV. ')).toEqual({
			type: ORDERED,
			symbol: 'IV',
			symbolIndex: 4,
			defaultSymbol: false,
			symbolStyle: UPPER_ROMAN
		})

		expect(looksLikeListItem('v. ')).toEqual({
			type: ORDERED,
			symbol: 'v',
			symbolIndex: 5,
			defaultSymbol: false,
			symbolStyle: LOWER_ROMAN
		})

		expect(looksLikeListItem('VI. ')).toEqual({
			type: ORDERED,
			symbol: 'VI',
			symbolIndex: 6,
			defaultSymbol: false,
			symbolStyle: UPPER_ROMAN
		})

		expect(looksLikeListItem('vii. ')).toEqual({
			type: ORDERED,
			symbol: 'vii',
			symbolIndex: 7,
			defaultSymbol: false,
			symbolStyle: LOWER_ROMAN
		})

		expect(looksLikeListItem('VIII. ')).toEqual({
			type: ORDERED,
			symbol: 'VIII',
			symbolIndex: 8,
			defaultSymbol: false,
			symbolStyle: UPPER_ROMAN
		})

		expect(looksLikeListItem('ix. ')).toEqual({
			type: ORDERED,
			symbol: 'ix',
			symbolIndex: 9,
			defaultSymbol: false,
			symbolStyle: LOWER_ROMAN
		})
	})
})
