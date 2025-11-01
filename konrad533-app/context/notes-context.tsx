import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
} from "react";

export interface ApiNote {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface NotesContext {
    notes: ApiNote[];
    isLoading: boolean;
    addNote: (NewNote: Omit<ApiNote, 'id' | 'userId'>) => void;
}

const NotesContext = createContext<NotesContext | undefined>(undefined);

export function NotesProvider({ children }: PropsWithChildren)  {
    const [notes, setNotes] = useState<ApiNote[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data: ApiNote[] = await response.json();
                setNotes(data.slice(0, 10));
            } catch (error) {
                console.error('Error fetching notes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const addNote = (NewNoteData: Omit<ApiNote, 'id' | 'userId'>) => {
        const newNote: ApiNote = {
            id: Date.now(),
            userId: 999,
            title: NewNoteData.title,
            body: NewNoteData.body,
        };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
    };

    const value = {
        notes,
        isLoading,
        addNote,
    };

    return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
}   