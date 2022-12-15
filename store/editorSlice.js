import { resumeLocalStore } from '../utils/localStorage'

const { createSlice } = require('@reduxjs/toolkit')

const initialState = {}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCurrentResume(state, action) {
      state.currentResume = action.payload
    },
    updateCurrentResumeContent(state, action) {
      state.currentResume = { ...state.currentResume, content: action.payload }
      resumeLocalStore.update(state.currentResume)
    },
    updateCurrentResumeTitle(state, action) {
      state.currentResume = { ...state.currentResume, title: action.payload }
      resumeLocalStore.update(state.currentResume)
    },
  },
})

export const {
  setCurrentResume,
  updateCurrentResumeContent,
  updateCurrentResumeTitle,
} = editorSlice.actions
export default editorSlice.reducer
