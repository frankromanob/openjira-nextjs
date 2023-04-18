import { PropsWithChildren, useReducer } from 'react';
import { uiReducer, UIContext  } from '.';

export interface UIState {
     sideBarOpen:boolean
}

const UI_INITIAL_STATE : UIState={
     sideBarOpen:false,
}

export const UIProvider = ({children}:PropsWithChildren) => {

     const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

     const openSideMenu =()=>{
         dispatch({type:'UI - Open Sidebar'})
     }

     const closeSideMenu =()=>{
      dispatch({type:'UI - Close Sidebar'})
   }

  return (
     <UIContext.Provider value={{
        ...state,
        openSideMenu,
        closeSideMenu
     }}>
        {children}
     </UIContext.Provider>
)
}
