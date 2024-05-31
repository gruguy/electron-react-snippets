import { DataType } from '@renderer/data'
import { create } from 'zustand'

interface StateProps {
  data: DataType[]
  setData: (data: DataType[]) => void
  search: string
  setSearch: (search: string) => void
  id: number
  setId: (id: number) => void
  currentCategoryId: number
  setCurrentCategoryId: (index: number) => void
}

export const useStore = create<StateProps>((set) => ({
  data: [],
  setData: (data) => set({ data }),
  search: '',
  setSearch: (search) => set({ search }),
  id: 0,
  setId: (id) => set({ id }),
  currentCategoryId: 0,
  setCurrentCategoryId: (id) => set({ currentCategoryId: id })
}))
