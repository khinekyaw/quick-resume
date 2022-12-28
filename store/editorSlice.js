import { resumeLocalStore } from '../utils/localStorage'

const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  status: 'idle',
  currentResume: null,
  error: null
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setStatus (state, action) {
      state.status = action.payload
    },
    setCurrentResume(state, action) {
      state.currentResume = action.payload
    },
    updateResume(state, action) {
      state.currentResume = { ...state.currentResume, ...action.payload }
    }
  },
})

export const {
  setStatus,
  setCurrentResume,
  updateResume,
} = editorSlice.actions

export const fetchResume = id => {
  return async dispatch => {
    dispatch(setStatus('loading'))
    const resume = resumeLocalStore.get(String(id))
    if (resume) {
      dispatch(setCurrentResume(resume))
      dispatch(setStatus('succeeded'))
    } else {
      dispatch(setStatus('failed'))
    }
  }
}

export const updateCurrentResume = resume => {
  return async (dispatch, getState) => {
    dispatch(setStatus('saving'))
    const state = getState()
    const updatedResume = { ...state.editor.currentResume, ...resume }
    resumeLocalStore.update(updatedResume)
    dispatch(updateResume(updatedResume))
    dispatch(setStatus('succeeded'))
  }
}

export const selectCurrentResume = state => state.editor.currentResume
export const selectEditorStatus = state => state.editor.status

export default editorSlice.reducer
