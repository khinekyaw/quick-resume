import { configureStore } from '@reduxjs/toolkit'
import editorSlice from './editorSlice'
import resumeSlice from './resumeSlice'

const store = configureStore({
  reducer: {
    resumes: resumeSlice,
    editor: editorSlice,
  },
})

export default store
