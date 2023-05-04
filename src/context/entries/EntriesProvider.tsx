import { PropsWithChildren, useEffect, useReducer } from 'react';
import { entriesReducer, EntriesContext } from '.';
import { Entry } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '@/apis';

export interface EntriesState {
   entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: []
}

export const EntriesProvider = ({ children }: PropsWithChildren) => {

   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

   const addNewEntry = async (description: string) => {
      // const newEntry: Entry = {
      //    _id:uuidv4(),
      //    description: description,
      //    createdAt: Date.now(),
      //    status: 'pending'
      // }
      const { data } = await entriesApi.post<Entry>('/entries', { description })
      dispatch({ type: 'Entries - AddEntry', payload: data })
      //addEntryDb(newEntry)
   }

   const addEntryDb = async (entry: Entry) => {
      await entriesApi.post('/entries', entry)
   }

   const updateEntry = async (entry: Entry) => {
      try {
         const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, { description: entry.description, status: entry.status })
         await entriesApi.post('/entries', data)
         refreshEntries()
      } catch (error) {

      }
      //dispatch({ type: 'Entries - UpdateEntry', payload: entry })
   }

   const refreshEntries = async () => {
      const { data } = await entriesApi.get<Entry[]>('/entries')
      dispatch({ type: 'Entries - LoadEntries', payload: data })
   }

   useEffect(() => {
      refreshEntries()

   }, [])


   return (
      <EntriesContext.Provider value={{
         ...state,
         //Methods
         addNewEntry,
         updateEntry,
      }}>
         {children}
      </EntriesContext.Provider>
   )
}
