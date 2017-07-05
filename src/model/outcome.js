import Slug from './slug'

const Outcome = function (id, model, actualizer, slug) {
  this._id = id
  this._model = model
  this._actualizer = actualizer
  this._slug = slug || null
  this._type = 'outcome'
}
Outcome.prototype.getId = function () {
  return this._id
}
Outcome.prototype.setSlug = function (slug) {
  this._slug = slug
}
Outcome.prototype.test = function () {
  this._actualizer = this._actualizer || function () { return true }
  return !!this._actualizer.apply(this._model.getScope())
}
Outcome.prototype.toString = function () {
  return this._slug.toString()
}
Outcome.prototype.export = function () {
  return {
    id: this._id,
    actualizer: this._actualizer ? this._actualizer.toString() : null,
    slug: this._slug.export()
  }
}
// Static
Outcome.construct = function (outcomeIn, model) {
  const outcome = new Outcome(outcomeIn.id, model, null)
  outcome._actualizer = Outcome.parseActualizer(outcomeIn.actualizer)
  outcome._slug = Slug.construct(outcomeIn.slug, model)
  return outcome
}
Outcome.parseActualizer = function (fn) {
  let actualizer = null
  eval('actualizer = ' + fn) // eslint-disable-line no-eval
  return actualizer
}
export default Outcome
