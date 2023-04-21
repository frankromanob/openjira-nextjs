import { Entry } from '@/interfaces';
import { createContext } from 'react';

export interface contextProps {
    entries: Entry[];
}

export const EntriesContext = createContext({} as contextProps);

