class Storage {
  set(key, item) {
    localStorage.setItem(key, JSON.stringify(item))
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key) as string)
  }

  remove(key) {
    localStorage.removeItem(key)
  }

  replace(key, item) {
    this.remove(key)
    this.set(key, item)
  }
}

export const lStorage = new Storage()

export default new Storage()
