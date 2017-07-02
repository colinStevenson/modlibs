const Slug = function (id, content, fork, model) {
  // Generate random id?
  this._id = id
  this._content = content
  this._fork = fork
  this._type = 'slug'
  this._model = model
}
Slug.prototype.setContent = function (content) {
  this._content = content
}
Slug.prototype.addFork = function (fork) {
  this._fork = fork
}
Slug.prototype.getId = function () {
  return this._id
}
Slug.prototype.toString = function () {
  let content = this._content
  content = (() => {
    return eval('`' + content + '`') // eslint-disable-line no-eval
  }).apply(this._model.getScope())
  if (this._fork) {
    content = [content, this._fork.toString()].join('')
  }
  return content
}
export default Slug
