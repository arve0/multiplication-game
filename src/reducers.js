/**
 * Create a simple x*y multiplication question.
 *
 * @param {float} seed - Seed from Math.random(). Range should be [0, 1).
 * @param {int} min - Minimum of x and y. Default 0.
 * @param {int} max - Maximum of x and y. Default 10.
 * @returns {Object} - With props question (text) and answer (int).
 */
const createQuestion = (seed, min=0, max=10) => {
  max += 1  // seed [0,1)
  seed = seed * (max - min) + min
  const x = parseInt(seed)
  seed = (seed - x) * (max - min) + min
  const y = parseInt(seed)
  return { question: `${x} x ${y}`,
           answer: x * y }
}

const questionInitialState = {
  question: '',
  answer: 0
}
const question = (state = questionInitialState, action) => {
  switch (action.type) {
    case 'CREATE_QUESTION':
      return createQuestion(action.seed)
    case 'ANSWER':
        const i = parseInt(action.answer)
        if (i === state.answer) {
          return createQuestion(Math.random())  // FIXME: Move random to component
        }
    default:
      return state
  }
}

export default {question}
