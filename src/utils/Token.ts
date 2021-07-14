import cookies from 'js-cookie'

const TokenName = "@CarpeDiem-Token"

export function setToken(token: string){
  cookies.set(TokenName, token, { expires: 1 })
}
export function getToken(){
  const token = cookies.get(TokenName)
  return token
}

export function removeToken(){
  cookies.remove(TokenName)
}