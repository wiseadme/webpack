function getFromStore<T>(
  moduleName: string | null,
  type: any,
  map: any
) {
  if (moduleName) {
    return Object.keys(map).reduce((acc, curr) => {
      const methodName = `${ moduleName }/${ map[curr] }`
      acc[curr] = type[methodName][0]
      return acc
    }, {}) as T
  }
  return Object.keys(map).reduce((acc, curr) => {
    acc[curr] = type[map[curr]][0]
    return acc
  }, {}) as T
}

function wrapGettersInProxy<G>(
  moduleName: string,
  getters: G,
  isNamespaced: boolean
) {
  return new Proxy(getters as any, {
    get(_, prop: string) {
      if (isNamespaced) {
        return getters[`${ moduleName }/${ prop }`]
      }

      return getters[prop]
    }
  }) as G
}

function extractByType(
  moduleName: string | null,
  value: any,
  map: any,
  store
) {
  const isNamespaced = !!moduleName && store.hasModule(moduleName)

  if (isNamespaced) {
    return getFromStore(moduleName, value, map)
  }

  return getFromStore(null, value, map)
}

export function useActions<A>(
  store,
  moduleName: string | null = null,
  map: A
): any {
  return extractByType(moduleName, store._actions, map, store)
}

export function useMutations<M>(
  store,
  moduleName: string | null = null,
  map: M
): any {
  return extractByType(moduleName, store._mutations, map, store)
}

export function useState(store, moduleName: string | null = null) {
  return moduleName ? store.state[moduleName] : store.state
}

export function useGetters(store, moduleName: string | null = null) {
  return wrapGettersInProxy(
    moduleName!,
    store.getters,
    store.hasModule(moduleName)
  )
}
