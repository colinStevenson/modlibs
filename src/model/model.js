import Slug from './slug'
import Fork from './fork'
import Outcome from './outcome'

const Model = function (id, name) {
  // Generate random id?
  this.id = id
  this._internalId = 0
  this._outcome = this.createOutcome()
  this._components = {}
  this._name = name
  this._scope = {}
}
// Internal
//
Model.prototype._generateId = function () {
  return this._internalId++
}
// Public misc
//
Model.prototype.toString = function () {
  return this._outcome.toString()
}
Model.prototype.setName = function (name) {
  this._name = name
}
Model.prototype.getName = function () {
  return this._name
}
Model.prototype.addSlug = function (content, fork) {
  const slug = this.createSlug(content, fork)
  this._outcome.addSlug(slug)
  this._components[slug.getId()] = slug
  return slug
}
// Get scope for actualizer
Model.prototype.getScope = function () {
  return this._scope
}
Model.prototype.setScope = function (scope) {
  this._scope = scope
}
// Public: create components
//
Model.prototype.createSlug = function (content, fork) {
  const id = this._generateId()
  const slug = new Slug(id, content, fork, this)
  return slug
}
Model.prototype.createFork = function () {
  const id = this._generateId()
  const fork = new Fork(id, this)
  return fork
}
Model.prototype.createOutcome = function (actualizer, slug) {
  const id = this._generateId()
  const outcome = new Outcome(id, this, actualizer, slug)
  return outcome
}

export default Model
