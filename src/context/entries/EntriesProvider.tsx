import { PropsWithChildren, useEffect, useReducer } from 'react';
import { entriesReducer, EntriesContext } from '.';
import { Entry } from '@/interfaces';
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
      const { data } = await entriesApi.post<Entry>('/entries', { description })
      dispatch({ type: 'Entries - AddEntry', payload: data })
   }

   const addEntryDb = async (entry: Entry) => {
      await entriesApi.post('/entries', entry)
   }

   const deleteEntry = async (entry: Entry) => {
      //dispatch({ type: 'Entries - DeleteEntry', payload: entry })
      try{
         await entriesApi.delete<Entry>(`/entries/${entry._id}`)
         refreshEntries()
      }catch(error){

      }
   }

   const updateEntry = async (entry: Entry) => {
      try {
         await entriesApi.put<Entry>(`/entries/${entry._id}`, { description: entry.description, status: entry.status })
         //await entriesApi.post('/entries', data)
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
         deleteEntry,
         refreshEntries,
      }}>
         {children}
      </EntriesContext.Provider>
   )
}
