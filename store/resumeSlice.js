import { newId } from '../utils/id'
import { resumeLocalStore } from '../utils/localStorage'

const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  status: 'idle',
  statusById: {},
  byId: {},
  errorById: {},
  recentlyActiveId: null,
}

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setStatus(state, action) {
      return { ...state, status: action.payload }
    },
    setStatusById(state, action) {
      const { id, status } = action.payload
      return {
        ...state,
        statusById: {
          ...state.statusById,
          [id]: status,
        }
      }
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
    setErrorById(state, action) {
      const { id, error } = action.payload
      return {
        ...state,
        errorById: {
          ...state.errorById,
          [id]: error,
        }
      }
    },
  },
})

const { setStatus, setStatusById, setErrorById, addItem, updateItem, deleteItem } = resumeSlice.actions

export const fetchResumes = () => {
  return async dispatch => {
    dispatch(setStatus('loading'))
    const resumes = resumeLocalStore.all()
    resumes.forEach(({ id, ...data }) => {
      dispatch(addItem({ id, ...data }))
      dispatch(setStatusById({ id, status: 'succeeded' }))
    });
    dispatch(setStatus('succeeded'))
  }
}

export const fetchResumeById = id => {
  return async (dispatch, getState) => {
    if (!id) {
      return
    }
    const { resumes: { statusById } } = getState()
    const status = statusById[id]
    if (status && status === 'succeeded') {
      return
    }
    dispatch(setStatusById({ id, status: 'loading' }))
    const resume = resumeLocalStore.get(id)
    if (resume) {
      dispatch(addItem(resume))
      dispatch(setStatusById({ id, status: 'succeeded' }))
    } else {
      dispatch(setStatusById({ id, status: 'failed' }))
      dispatch(setErrorById({ id, error: `Resume with id: ${id} not found.` }))
    }
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

export const updateResumeById = (id, data) => {
  return async dispatch => {
    resumeLocalStore.update({ id, ...data })
    dispatch(updateItem({ id, ...data }))
  }
}

export const deleteResumeById = id => {
  return async dispatch => {
    resumeLocalStore._delete(id)
    dispatch(deleteItem(id))
  }
}

export const selectResumes = state => Object.values(state.resumes.byId)
export const selectResumeById = id => state => state.resumes.byId[id]
export const selectStatus = state => state.resumes.status
export const selectStatusById = id => state => {
  const { resumes: { statusById }} = state
  if (statusById[id]) {
    return statusById[id]
  } else {
    return 'idle'
  }
}
export const selectErrorById = id => state => state.resumes.errorById[id]
export const selectRecentlyActiveId = state => state.resumes.recentlyActiveId

export default resumeSlice.reducer
