import { Entry } from '@/interfaces';
import { createContext } from 'react';

export interface contextProps {
    entries: Entry[];
    //Methods
    addNewEntry: (description: string) => void;
    updateEntry: (entry:Entry) => void;
    deleteEntry: (entry:Entry) => void;
    refreshEntries:()=> void;
}

export const EntriesContext = createContext({} as contextProps);

