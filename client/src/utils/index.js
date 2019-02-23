export function isShallowEqual(v, o) {
  for (let key in v) if (!(key in o) || v[key] !== o[key]) return false
  for (let key in o) if (!(key in v) || v[key] !== o[key]) return false
  return true
}
