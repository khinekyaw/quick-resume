import { newId } from '../utils/id'
import { resumeLocalStore } from '../utils/localStorage'

const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  status: 'idle',
  statusById: {},
  byId: {},
  recentlyActiveId: null,
}

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setStatus(state, action) {
      return { ...state, status: action.payload }
    },
    addItem(state, action) {
      return {
        ...state,
        byId: { ...state.byId, [action.payload.id]: action.payload },
        recentlyActiveId: action.payload.id,
      }
    },
    updateItem(state, action) {
      const { id, ...data } = action.payload
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: { ...state.byId[id], ...data }
        },
        recentlyActiveId: id,
      }
    },
    deleteItem(state, action) {
      const id = action.payload
      const {
        [id]: _,
        ...rest
      } = state.byId
      return {
        ...state,
        byId: rest,
      }
    },
  },
})

const { setStatus, addItem, updateItem, deleteItem } = resumeSlice.actions

export const fetchResumes = () => {
  return async dispatch => {
    dispatch(setStatus('loading'))
    const resumes = resumeLocalStore.all()
    resumes.forEach(r => {
      dispatch(addItem(r))
    });
    dispatch(setStatus('succeeded'))
  }
}

export const createResume = data => {
  return async dispatch => {
    const id = newId()
    const updatedAt = new Date().toLocaleString()
    resumeLocalStore.add({ id, updatedAt, ...data })
    dispatch(addItem({ id, ...data }))
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

export const selectResumes = state => Object.values(state.resumes.byId)
export const selectStatus = state => state.resumes.status
export const selectRecentlyActiveId = state => state.resumes.recentlyActiveId

export default resumeSlice.reducer
