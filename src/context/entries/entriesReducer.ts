import { EntriesState } from './';

type EntriesActionType =
| { type: 'Entries - ActionName' }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case 'Entries - ActionName':
            return {
                ...state,
               // sideBarOpen: true,
            }

        default:
            return state;
    }
};