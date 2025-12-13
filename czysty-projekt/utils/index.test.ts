import { truncateText, validateNoteInput, calculateTotalCharacters, SimpleNote } from './index';

describe('Utils', () => {

    describe('truncateText', () => {
        it('should return original text if length is within limit', () => {
            expect(truncateText('Short text', 20)).toBe('Short text');
        });

        it('should truncate text and add ellipsis if length exceeds limit', () => {
            expect(truncateText('This is a long text', 10)).toBe('This is a ...');
        });

        it('should return empty string for empty input', () => {
            expect(truncateText('', 10)).toBe('');
        });
    });

    describe('validateNoteInput', () => {
        it('should return true for valid inputs', () => {
            expect(validateNoteInput('Valid Title', 'Valid Body')).toBe(true);
        });

        it('should return false for empty title', () => {
            expect(validateNoteInput('', 'Body')).toBe(false);
        });

        it('should return false for empty body', () => {
            expect(validateNoteInput('Title', '   ')).toBe(false);
        });
    });

    describe('calculateTotalCharacters', () => {
        it('should correctly sum characters', () => {
            const notes: SimpleNote[] = [
                { id: 1, title: 'A', body: 'abc' },
                { id: 2, title: 'B', body: 'de' }
            ];
            expect(calculateTotalCharacters(notes)).toBe(5);
        });

        it('should return 0 for empty array', () => {
            expect(calculateTotalCharacters([])).toBe(0);
        });
    });

});