import { PropsWithChildren, useReducer } from 'react';
import { entriesReducer, EntriesContext } from '.';
import { Entry } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
   entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [
      {
         _id: uuidv4(),
         description: 'Pending - Loren Ipsum bla bla bla',
         createdAt: Date.now(),
         status: 'pending'
      },
      {
         _id: uuidv4(),
         description: 'In progress - Loren Ipsum bla bla bla22',
         createdAt: Date.now() - 1000000,
         status: 'in-progress'
      },
      {
         _id: uuidv4(),
         description: 'Done - Loren Ipsum bla bla bla33',
         createdAt: Date.now() - 100000,
         status: 'finished'
      },]
}

export const EntriesProvider = ({ children }: PropsWithChildren) => {

   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

   return (
      <EntriesContext.Provider value={{
         ...state,
      }}>
         {children}
      </EntriesContext.Provider>
   )
}
