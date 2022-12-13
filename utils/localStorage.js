// helpers for local storage

export const createListLocalStore = key => {
  const all = () => JSON.parse(localStorage.getItem(key)) || []

  const get = id => {
    return all().find(item => {
      return item.id === id
    })
  }

  const add = item => {
    const state = all()
    localStorage.setItem(key, JSON.stringify([...state, item]))
  }

  const update = updateItem => {
    const state = all().map(item =>
      item.id === updateItem.id ? updateItem : item
    )

    localStorage.setItem(key, JSON.stringify(state))
  }

  return { all, get, add, update }
}

export const resumeLocalStore = createListLocalStore('resumes')
