import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
    | { type: 'Entries - AddEntry', payload: Entry }
    | { type: 'Entries - UpdateEntry', payload: Entry }
    | { type: 'Entries - LoadEntries', payload: Entry[] }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case 'Entries - AddEntry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
                // sideBarOpen: true,
            }
        case 'Entries - UpdateEntry':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry
                })
                // sideBarOpen: true,
            }
        case 'Entries - LoadEntries':
            return {
                ...state,
                entries: [...action.payload]
                // sideBarOpen: true,
            }
        default:
            return state;
    }
};