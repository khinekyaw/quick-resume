import { getResumes, setResumes } from "../data"


export default function resumeHandler(req, res) {
  const {
    query: { id },
    body: postData,
    method,
  } = req

  const resumes = getResumes()
  const filtered = resumes.filter(r => r.id === id)

  if (filtered.length === 0) {
    return res.status(404).json({ message: `Resume with id: ${id} not found.` })
  }

  const resume = filtered.shift()

  switch(method) {
    case 'GET':
      return res.status(200).json(resume)
    case 'PUT':
      const updatedResume = { ...resume, ...postData }
      const newResumes = resumes.map(r => r.id === id ? updatedResume : r)
      setResumes(newResumes)
      return res.status(200).json(updatedResume)
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      return res.status(405).end(`Method ${method} not allowed.`)
  }
}
