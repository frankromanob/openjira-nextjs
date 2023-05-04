import { UIState } from './';

type UIActionType =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - AddingEntry', payload: boolean }
    | { type: 'UI - StartDragging' }
    | { type: 'UI - StopDragging' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideBarOpen: true,
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideBarOpen: false,
            }
        case 'UI - AddingEntry':
            return {
                ...state,
                isAdding: action.payload,
            }
        case 'UI - StartDragging':
            return {
                ...state,
                isDragging: true
            }
        case 'UI - StopDragging':
            return {
                ...state,
                isDragging: false
            }
        default:
            return state;
    }
};