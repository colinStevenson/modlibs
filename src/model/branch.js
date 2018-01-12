import Slug from './slug'

const Branch = function (id, model, actualizer, slug) {
  this._id = id
  this._model = model
  this._actualizer = actualizer
  this._slug = slug || null
  this._type = 'branch'
}
Branch.prototype.getId = function () {
  return this._id
}
Branch.prototype.setSlug = function (slug) {
  this._slug = slug
}
Branch.prototype.test = function () {
  this._actualizer = this._actualizer || function () { return true }
  return !!this._actualizer.apply(this._model.getScope())
}
Branch.prototype.toString = function () {
  return this._slug.toString()
}
Branch.prototype.export = function () {
  return {
    id: this._id,
    actualizer: this._actualizer ? this._actualizer.toString() : null,
    slug: this._slug.export()
  }
}
// Static
Branch.construct = function (branchIn, model) {
  const branch = new Branch(branchIn.id, model, null)
  branch._actualizer = Branch.parseActualizer(branchIn.actualizer)
  branch._slug = Slug.construct(branchIn.slug, model)
  return branch
}
Branch.parseActualizer = function (fn) {
  let actualizer = null
  eval('actualizer = ' + fn) // eslint-disable-line no-eval
  return actualizer
}
export default Branch
