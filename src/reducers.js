import seedrandom from 'seedrandom'  // predictable seeded random

/**
 * Create a simple x*y multiplication question.
 *
 * @param {int} min - Minimum of x and y. Default 0.
 * @param {int} max - Maximum of x and y. Default 10.
 * @returns {Object} - With props question and answer, both strings.
 */
let rng = seedrandom()  // autoseed from time, dom state and entropy
const createQuestion = (min = 0, max = 10) => {
  max += 1  // random [0,1)
  const x = parseInt(rng() * (max - min) + min, 10)
  const y = parseInt(rng() * (max - min) + min, 10)
  return { question: `${x} x ${y}`,
           answer: `${x * y}` }
}

const questionInitialState = {
  question: '',
  answer: '',
  seed: null,
  i: 0
}
const question = (state = questionInitialState, action) => {
  switch (action.type) {
    case 'SEED_QUESTION':
      rng = seedrandom(action.seed)
      return { ...state, seed: action.seed }
    case 'CREATE_QUESTION':
      console.log(state.question)
      return { ...state, ...createQuestion(), i: state.i + 1 }
    default:
      return state
  }
}

const scoreInitialState = {
  correct: 0,
  wrong: 0,
  subsequentCorrect: 1,
  diff: 0,
  points: 0
}
const score = (state = scoreInitialState, action) => {
  switch (action.type) {
    case 'CORRECT_ANSWER':
      return {
        ...state,
        correct: state.correct + 1,
        diff: action.inc,
        points: state.points + action.inc,
        subsequentCorrect: state.subsequentCorrect + 1 }

    case 'WRONG_ANSWER':
      return { ...state,
        diff: 0,
        subsequentCorrect: 1,
        wrong: state.wrong + 1 }

    default:
      return state
  }
}

const answer = (state = '', action) => {
  switch (action.type) {
    case 'NUMBER_CLICKED':
      return state + action.num.toString()
    case 'BACKSPACE':
      if (state === '') return state
      return state.substring(0, state.length - 1)
    case 'CREATE_QUESTION':
      return ''
    case 'DELETE_ANSWER':
      return ''
    default:
      return state
  }
}

export default { question, score, answer }
