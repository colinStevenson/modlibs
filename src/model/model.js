import Slug from './slug'
import Fork from './fork'
import Branch from './branch'

const Model = function (id, name) {
  // Generate random id?
  this._id = id
  this._internalId = 0
  this._branch = this.createBranch()
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
  return this._branch.toString()
}
Model.prototype.setName = function (name) {
  this._name = name
}
Model.prototype.getName = function () {
  return this._name
}
Model.prototype.setSlug = function (content, fork) {
  const slug = this.createSlug(content, fork)
  this._branch.setSlug(slug)
  return slug
}
// Get scope for condition
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
Model.prototype.createBranch = function (condition, slug) {
  const id = this._generateId()
  const branch = new Branch(id, this, condition, slug)
  return branch
}
// Static
Model.stringify = function (model) {
  return JSON.stringify({
    id: model._id,
    name: model._name,
    branch: model.branch.export()
  })
}
Model.parse = function (jsonModel) {
  let modelIn = JSON.parse(jsonModel)
  const model = new Model(modelIn.id, modelIn.name)
  model._branch = Branch.construct(modelIn.branch, model)
  return model
}
export default Model
