import { TOKEN_KEY } from "../constants";

export class TokenUtils {
    static setToken(token: string) {
      return localStorage.setItem(TOKEN_KEY, token)
    }
    static getToken() {
      return localStorage.getItem(TOKEN_KEY)
    }
    static isExpired() {
      let expired = true
      const token = localStorage.getItem(TOKEN_KEY)

      if (token) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        const actualDate = Math.floor((new Date()).getTime()/1000)
        expired = expiry <= actualDate
      }

      return expired
    }
  }