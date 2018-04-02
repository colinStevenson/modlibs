import Fork from './fork'

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
Slug.prototype.getFork = function () {
	return this._fork
}
Slug.prototype.getId = function () {
	return this._id
}
Slug.prototype.toString = function () {
	let content = this.renderContent()
	if (this._fork) {
		content = [content, this._fork.toString()].join('')
	}
	return content
}
Slug.prototype.renderContent = function () {
	let content = this._content
	content = (function () { // eslint-disable-line no-extra-parens
		return eval('`' + content + '`') // eslint-disable-line no-eval
	}).apply(this._model.getScope())
	return content
}
Slug.prototype.export = function () {
	return {
		id: this._id,
		content: this._content,
		fork: this._fork ? this._fork.export() : null
	}
}
// Static
Slug.construct = function (slugIn, model) {
	let fork = null
	if (slugIn.fork) {
		fork = Fork.construct(slugIn.fork, model)
	}
	return new Slug(slugIn.id, slugIn.content, fork, model)
}
export default Slug
