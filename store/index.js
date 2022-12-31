import { configureStore } from '@reduxjs/toolkit'
import resumeSlice from './resumeSlice'

const store = configureStore({
  reducer: {
    resumes: resumeSlice,
  },
})

export default store
