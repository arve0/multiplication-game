import seedrandom from 'seedrandom'  // predictable seeded random

/**
 * Create a simple x*y multiplication question.
 *
 * @param {int} min - Minimum of x and y. Default 0.
 * @param {int} max - Maximum of x and y. Default 10.
 * @returns {Object} - With props question (text) and answer (int).
 */
let rng = seedrandom()  // autoseed from time, dom state and entropy
const createQuestion = (min=0, max=10) => {
  let random = rng()
  max += 1  // random [0,1)
  random = random * (max - min) + min
  const x = parseInt(random)
  random = (random - x) * (max - min) + min
  const y = parseInt(random)
  return { question: `${x} x ${y}`,
           answer: x * y }
}

const questionInitialState = {
  question: '',
  answer: 0,
  seed: null,
  i: 0
}
const question = (state = questionInitialState, action) => {
  switch (action.type) {
    case 'SEED_QUESTION':
      rng = seedrandom(action.seed)
      return { ...state, seed: action.seed }
    case 'CREATE_QUESTION':
      return { ...state, ...createQuestion(), i: state.i + 1 }
    default:
      return state
  }
}


export default {question}
