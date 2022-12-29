import { resumeLocalStore } from '../utils/localStorage'

const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  items: []
}

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setResumes(state, action) {
      return { ...state, items: action.payload }
    },
    updateResume(state, action) {
      const updateItem = action.payload
      state = { 
        ...state,
        items: state.items.map(item =>
          item.id === updateItem.id ? { ...item, ...updateItem } : item
        )
      }
      resumeLocalStore.set(state.items)
      return state
    },
    deleteResume(state, action) {
      const id = action.payload
      state = {
        ...state,
        items: state.items.filter(item => item.id !== id)
      }
      resumeLocalStore.set(state.items)
      return state
    },
  },
})

export const { setResumes, updateResume, deleteResume } = resumeSlice.actions

export const selectResumes = state => state.resumes.items

export default resumeSlice.reducer
