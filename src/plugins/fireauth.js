import { auth } from './firebase.js'

export default (context) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      resolve()
    })
  })
}