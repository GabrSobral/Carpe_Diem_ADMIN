import { setCookie, parseCookies, destroyCookie  } from 'nookies'

const TokenName = "@CarpeDiem-Token"
const RefreshTokenName = "@CarpeDiem-RefreshToken"

//Token
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

//Refresh Token
export function setRefreshToken(token: string){
  setCookie(undefined, RefreshTokenName, token, {
    maxAge: 60 * 60 * 24 * 10 //10 day
  })
}
export function getRefreshToken(){
  const { "@CarpeDiem-RefreshToken": refreshToken } = parseCookies()
  return refreshToken
}

export function removeRefreshToken(){
  destroyCookie(undefined, RefreshTokenName)
}