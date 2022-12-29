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
    updateItem(state, action) {
      const { id, ...data } = action.payload
      state = { 
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, ...data } : item
        )
      }
      return state
    },
    deleteItem(state, action) {
      const id = action.payload
      state = {
        ...state,
        items: state.items.filter(item => item.id !== id)
      }
      return state
    },
  },
})

export const { setStatus, setItems , updateItem, deleteItem } = resumeSlice.actions

export const fetchResumes = () => {
  return async dispatch => {
    dispatch(setStatus('loading'))
    const resumes = resumeLocalStore.all()
    dispatch(setItems(resumes))
    dispatch(setStatus('succeeded'))
  }
}

export const updateResume = (id, data) => {
  return async dispatch => {
    resumeLocalStore.update({ id, ...data })
    dispatch(updateItem({ id, ...data }))
  }
}

export const deleteResume = id => {
  return async dispatch => {
    resumeLocalStore._delete(id)
    dispatch(deleteItem(id))
  }
}

export const selectResumes = state => state.resumes.items
export const selectStatus = state => state.resumes.status

export default resumeSlice.reducer
