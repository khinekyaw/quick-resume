import { resumeLocalStore } from '../utils/localStorage'

const { createSlice } = require('@reduxjs/toolkit')

const initialState = []

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setResumes(state, action) {
      return action.payload
    },
    updateResume(state, action) {
      const updateItem = action.payload
      state = state.map(item =>
        item.id === updateItem.id ? { ...item, ...updateItem } : item
      )
      resumeLocalStore.set(state)
      return state
    },
    deleteResume(state, action) {
      const id = action.payload
      state = state.filter(item => item.id !== id)
      resumeLocalStore.set(state)
      return state
    },
  },
})

export const { setResumes, updateResume, deleteResume } = resumeSlice.actions
export default resumeSlice.reducer
