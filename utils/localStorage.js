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
      item.id === updateItem.id ? { ...item, ...updateItem } : item
    )

    localStorage.setItem(key, JSON.stringify(state))
  }

  const _delete = id => {
    const state = all().filter(item => item.id !== id)
    localStorage.setItem(key, JSON.stringify(state))
  }

  return { all, get, add, update, _delete }
}

export const resumeLocalStore = createListLocalStore('resumes')
