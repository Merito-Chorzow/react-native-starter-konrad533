export interface SimpleNote {
    id: number;
    title: string;
    body: string;
}

export const truncateText = (text: string, limit: number = 50): string => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
};

export const validateNoteInput = (title: string, body: string): boolean => {
    const isTitleValid = title.trim().length > 0;
    const isBodyValid = body.trim().length > 0;
    return isTitleValid && isBodyValid;
};

export const calculateTotalCharacters = (notes: SimpleNote[]): number => {
    return notes.reduce((acc, note) => acc + note.body.length, 0);
};