import Outcome from './outcome'

const Fork = function (id, model) {
  this._id = id
  this._model = model
  this._outcomes = []
  this._type = 'fork'
}
Fork.prototype.addOutcome = function (outcome) {
  this._outcomes.push(outcome)
}
Fork.prototype.removeOutcome = function (outcome) {
  const id = outcome.getId()
  this._outcomes = this._outcomes.filter(outcome => { return outcome.getId() !== id })
}
Fork.prototype.toString = function () {
  let content = []
  for (let i = 0; i < this._outcomes.length; i++) {
    const outcome = this._outcomes[i]
    if (outcome.test()) {
      content.push(outcome.toString())
      // assuming that only one outcome should succeed per fork so stop trying for others
      break
    }
  }
  return content.join('')
}
Fork.prototype.export = function () {
  return {
    id: this._id,
    outcomes: this._outcomes.map(outcome => outcome.export())
  }
}
// Static
Fork.construct = function (forkIn, model) {
  const fork = new Fork(forkIn.id, model)
  fork._outcomes = forkIn.outcomes.map(outcomeIn => Outcome.construct(outcomeIn, model))
  return fork
}
export default Fork
