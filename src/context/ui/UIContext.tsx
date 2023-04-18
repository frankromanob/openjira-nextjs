import { createContext } from 'react';

export interface contextProps {
    sideBarOpen:boolean;
    openSideMenu: ()=> void;
    closeSideMenu: ()=> void;
}

export const UIContext = createContext({} as contextProps);