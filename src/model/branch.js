import Slug from './slug'

const Branch = function (id, model, condition, slug) {
	this._id = id
	this._model = model
	this._condition = condition
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
	this._condition = this._condition || function () { return true }
	return !!this._condition.apply(this._model.getScope())
}
Branch.prototype.toString = function () {
	return this._slug.toString()
}
Branch.prototype.export = function () {
	return {
		id: this._id,
		condition: this._condition ? this._condition.toString() : null,
		slug: this._slug.export()
	}
}
// Static
Branch.construct = function (branchIn, model) {
	const branch = new Branch(branchIn.id, model, null)
	branch._condition = Branch.parseCondition(branchIn.condition)
	branch._slug = Slug.construct(branchIn.slug, model)
	return branch
}
Branch.parseCondition = function (fn) {
	let condition = null
	eval('condition = ' + fn) // eslint-disable-line no-eval
	return condition
}
export default Branch
