const Outcome = function (id, model, actualizer, slug) {
  this._id = id
  this._model = model
  this._actualizer = actualizer
  this._sequence = []
  if (slug) {
    this._sequence.push(slug)
  }
  this._type = 'outcome'
}
Outcome.prototype.getId = function () {
  return this._id
}
Outcome.prototype.addSlug = function (slug) {
  this._sequence.push(slug)
}
Outcome.prototype.test = function () {
  this._actualizer = this._actualizer || function () { return true }
  return !!this._actualizer.apply(this._model.getScope())
}
Outcome.prototype.toString = function () {
  const content = []
  this._sequence.map(item => { content.push(item.toString()) })
  return content.join('')
}
export default Outcome
