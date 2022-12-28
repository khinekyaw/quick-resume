import { getResumes, setResumes } from './data'

export default function handler(req, res) {
  const {
    body: postData,
    method,
  } = req

  const resumes = getResumes()

  switch(method) {
    case 'GET':
      return res.status(200).json(resumes)
    case 'POST':
      const id = new Date().getTime().toString()
      const resume = { ...postData, id }
      setResumes([...resumes, resume])
      return res.status(200).json(resume)
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${method} not allowed.`)
  }
}
