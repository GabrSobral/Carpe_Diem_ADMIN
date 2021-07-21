import { setCookie, parseCookies, destroyCookie  } from 'nookies'

const TokenName = "@CarpeDiem-Token"

export function setToken(token: string){
  setCookie(undefined, TokenName, token, {
    maxAge: 60 * 60 * 24 //1 day
  })
}
export function getToken(){
  const { "@CarpeDiem-Token": token } = parseCookies()
  return token
}

export function removeToken(){
  destroyCookie(undefined, TokenName)
}