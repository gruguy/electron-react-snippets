import { DataType } from '@renderer/data'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface StateProps {
  config: ConfigDataType
  setConfig: (config: ConfigDataType) => void
  data: DataType[]
  setData: (data: DataType[]) => void
  search: string
  setSearch: (search: string) => void
  id: number
  setId: (id: number) => void
  currentCategoryId: number
  setCurrentCategoryId: (index: number) => void
  error: string
  setError: (error: string) => void
}

export const useStore = create(
  persist<StateProps>(
    (set) => ({
      config: { shorCut: '', directory: '' },
      setConfig: (config) => set({ config }),
      data: [],
      setData: (data) => set({ data }),
      search: '',
      setSearch: (search) => set({ search }),
      id: 0,
      setId: (id) => set({ id }),
      currentCategoryId: 0,
      setCurrentCategoryId: (id) => set({ currentCategoryId: id }),
      error: '',
      setError: (error) => set({ error })
    }),
    {
      name: 'gruguy-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
