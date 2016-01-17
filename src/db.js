import Firebase from 'firebase'
import { uid, users, aboveBelow } from './actions.js'
import store from './store.js'

const fb = new Firebase('https://blazing-heat-4109.firebaseio.com/')

window.fb = fb  // REMOVE ME

/**
 * Log into /online/uid when connection is established. Dispatch the uid.
 */
function login () {
  // login once
  fb.authAnonymously((err, auth) => {
    if (err) {
      console.log('login failed', err)  // TODO: handle error
    } else {
      // remove presence on disconnect
      fb.child('online').child(auth.uid).onDisconnect().remove()

      console.log('login ok', auth.uid)
      store.dispatch(uid(auth.uid))

      updateStateOnFirebaseChange()

      // everytime we connect, attach onDisconnect handler
      fb.child('.info/connected').on('value', connected => {
        if (connected.val()) {
          console.log('connected')
          fb.child('online').child(auth.uid).onDisconnect().remove()
        } else {
          console.log('disconnected')
        }
      })
    }
  })
}

/**
 * Update firebase state changes.
 */
function updateFirebaseOnStateChanges () {
  let prevState
  let lock = false  // prevent incoming dispatches from firebase to trigger loop
  store.subscribe(() => {
    const state = store.getState()
    if (lock) {
      return
    }
    if (prevState && state.login.uid) {
      if (state.score.points !== prevState.score.points) {
        lock = true
        set('score', state.score.points, state.login.uid)
      }
      if (state.login.nickname !== prevState.login.nickname) {
        lock = true
        setOnConnected('nickname', state.login.nickname, state.login.uid)
        set('score', 0, state.login.uid)
      }
    }
    lock = false
    prevState = state
  })
}

/**
 * Update state on fb update.
 */
function updateStateOnFirebaseChange () {
  fb.child('online').on('value', (snap) => {
    const u = sortUsers(snapToArray(snap))
    store.dispatch(users(u))
    store.dispatch(aboveBelow(getAboveBelow(u)))
  })
}

/**
 * Set key=val on /online/ref.
 *
 * @parameter key {string}
 * @parameter val
 * @parameter ref {string}
 */
function set (key, val, ref) {
  console.log(`setting ${ref}/${key}=${val}`)
  fb.child(`online/${ref}/${key}`).set(val)
}

/**
 * Set key=val when connecting. Will set once initially also.
 */
function setOnConnected (key, val, ref) {
  fb.child('.info/connected').on('value', (connected) => {
    if (connected.val()) {
      console.log(`connected`)
      set(key, val, ref)
    }
  })
}

export {
  fb,
  login,
  set,
  setOnConnected,
  updateFirebaseOnStateChanges
}

/**
 * Helper functions
 */
function snapToArray (snap) {
  const objs = snap.val()
  let arr = []
  for (let key in objs) {
    let val = objs[key]
    val.uid = key
    arr.push(val)
  }
  return arr
}
function sortUsers (arr) {
  arr = arr.sort((a, b) => {
    if (typeof a.score === 'undefined' && typeof b.score === 'undefined') {
      return 0
    }
    if (typeof a.score === 'undefined') {
      return 1
    }
    if (typeof b.score === 'undefined') {
      return -1
    }
    if (a.score > b.score) {
      return -1
    }
    if (a.score < b.score) {
      return 1
    }
    return 0
  })
  return arr
}
function getAboveBelow (users) {
  let res = {
    above: false,
    below: false
  }
  const length = users.length
  if (length === 0) {
    return res
  }
  const uid = store.getState().login.uid
  let i = 0
  while (i < length) {
    let user = users[i]
    if (user.uid === uid) {
      break
    }
    ++i
  }
  if (i === 0) {
    res.below = users[i + 1]
  } else if (i === (length - 1)) {
    res.above = users[i - 1]
  } else {
    res.below = users[i + 1]
    res.above = users[i - 1]
  }
  return res
}
