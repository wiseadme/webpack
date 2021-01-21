import jwtDecode from 'jwt-decode'

export function isJWTValid(token) {
  if (!token) {
    return false
  }
  const jwtData = jwtDecode(token) || {} as any
  const expires = jwtData.exp || 0

  return Date.now() < (expires * 1000)
}

export function copyWithoutLink(obj): string {
  return JSON.parse(JSON.stringify(obj))
}

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}
