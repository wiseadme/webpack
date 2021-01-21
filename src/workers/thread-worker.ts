const setThreadsBySwimLanes = ({ swimLanes, threads }) => {
  const result = {}
  swimLanes.forEach(sl => {
    result[sl.id] = threads.filter(it => {
      return it.swimlane_index === sl.id
    })
  })
  return result
}

onmessage = ({ data: { swimLanes, threads } }) => {
  const params = { swimLanes, threads }
  postMessage(setThreadsBySwimLanes(params))
}
