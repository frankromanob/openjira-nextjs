import { PropsWithChildren, useReducer } from 'react';
import { uiReducer, UIContext } from '.';

export interface UIState {
   sideBarOpen: boolean,
   isAdding: boolean,
   isDragging:boolean
}

const UI_INITIAL_STATE: UIState = {
   sideBarOpen: false,
   isAdding:false,
   isDragging:false
}

export const UIProvider = ({ children }: PropsWithChildren) => {

   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

   const openSideMenu = () => {
      dispatch({ type: 'UI - Open Sidebar' })
   }

   const closeSideMenu = () => {
      dispatch({ type: 'UI - Close Sidebar' })
   }

   const setIsAddingEntry = (isAdding:boolean)=>{
      dispatch ({type:'UI - AddingEntry',payload:isAdding})
   }

   const startDragging =() =>{
      dispatch({type: 'UI - StartDragging'})
   }

   const stopDragging =() =>{
      dispatch({type: 'UI - StopDragging'})
   }
   return (
      <UIContext.Provider value={{
         ...state,
         openSideMenu,
         closeSideMenu,
         setIsAddingEntry,
         startDragging,
         stopDragging,
      }}>
         {children}
      </UIContext.Provider>
   )
}
