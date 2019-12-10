import axios from 'axios'
import {apiDomain} from '../../config'
//
let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'client':'web'

  }
}
export default {
  logout () {
    this.clearStorage()
  },
  clearStorage () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('date')
    localStorage.removeItem('account_type')
    localStorage.removeItem('account_id')
    localStorage.removeItem('user_id')
    localStorage.removeItem('username')
  },
  isLoguedIn () {
    return !!localStorage.getItem('token')
  },
  login (user, password) {
    return new Promise((resolve, reject) => {
      axios.post(apiDomain + '/auth', {email: user, password: password}, axiosConfig)
        .then((response) => {
          // console.log(response)
          localStorage.setItem('token', response.data.session.token)
          localStorage.setItem('date', response.data.session.date)
          localStorage.setItem('account_type', response.data.session.role)
          localStorage.setItem('account_id', response.data.session.role_id)
          localStorage.setItem('user_id', response.data.session.user_id)
          localStorage.setItem('username', response.data.session.username)
          let token = localStorage.getItem('token')
          resolve(response)
        })
        .catch((error) => {
          // reject(new Error(error.response))
          reject(error.response)
        })
    })
  },
    autoLogin (token) {
    let axiosConfig_ = {
      headers: {
        'Content-Type': 'application/json',
        'client':'web',
        'token': token

      }
    }
    // console.log(axiosConfig_)
    return new Promise((resolve, reject) => {
      axios.get(apiDomain + '/auth', axiosConfig_)
        .then((response) => {
          // console.log(response)
          localStorage.setItem('token', response.data.session.token)
          localStorage.setItem('date', response.data.session.date)
          localStorage.setItem('account_type', response.data.session.role)
          localStorage.setItem('account_id', response.data.session.role_id)
          localStorage.setItem('user_id', response.data.session.user_id)
          localStorage.setItem('username', response.data.session.username)
          let token = localStorage.getItem('token')
          resolve(response)
        })
        .catch((error) => {
          // reject(new Error(error.response))
          reject(error.response)
        })
    })
  },
}
