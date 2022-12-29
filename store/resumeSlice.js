import { resumeLocalStore } from '../utils/localStorage'

const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  status: 'idle',
  items: [],
}

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setStatus(state, action) {
      return { ...state, status: action.payload }
    },
    setItems(state, action) {
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

export const { setStatus, setItems , updateResume, deleteResume } = resumeSlice.actions

export const fetchResumes = () => {
  return async dispatch => {
    dispatch(setStatus('loading'))
    const resumes = resumeLocalStore.all()
    dispatch(setItems(resumes))
    dispatch(setStatus('succeeded'))
  }
}

export const selectResumes = state => state.resumes.items
export const selectStatus = state => state.resumes.status

export default resumeSlice.reducer
