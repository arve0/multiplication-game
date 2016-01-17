/**
 * SEED
 */
export function seed (seed) {
  return {
    type: 'SEED',
    seed: seed
  }
}

/**
 * CREATE QUESTION
 */
export function createQuestion () {
  return {
    type: 'CREATE_QUESTION'
  }
}

/**
 * WRONG ANSWER
 */
export function wrongAnswer () {
  return {
    type: 'WRONG_ANSWER'
  }
}

/**
 * CORRECT ANSWER
 */
export function correctAnswer (inc) {
  return {
    type: 'CORRECT_ANSWER',
    inc: inc
  }
}

/**
 * NUMBER CLICKED
 */
export function numberClicked (num) {
  return {
    type: 'NUMBER_CLICKED',
    num: num
  }
}

/**
 * BACKSPACE
 */
export function backspace () {
  return {
    type: 'BACKSPACE'
  }
}

/**
 * DELETE_ANSWER
 */
export function deleteAnswer () {
  return {
    type: 'DELETE_ANSWER'
  }
}

/**
 * LOGIN
 */
export function uid (uid) {
  return {
    type: 'UID',
    uid: uid
  }
}

/**
 * NICKNAME
 */
export function nickname (name) {
  return {
    type: 'NICKNAME',
    name
  }
}

/**
 * USERS
 */
export function users (users) {
  return {
    type: 'USERS',
    users
  }
}

/**
 * ABOVE_BELOW
 */
export function aboveBelow (ab) {
  return {
    type: 'ABOVE_BELOW',
    ab
  }
}
