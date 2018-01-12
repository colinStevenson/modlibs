import Branch from './branch'

const Fork = function (id, model) {
  this._id = id
  this._model = model
  this._branches = []
  this._type = 'fork'
}
Fork.prototype.addBranch = function (branch) {
  this._branches.push(branch)
}
Fork.prototype.removeBranch = function (branch) {
  const id = branch.getId()
  this._branches = this._branches.filter(branch => { return branch.getId() !== id })
}
Fork.prototype.toString = function () {
  let content = []
  for (let i = 0; i < this._branches.length; i++) {
    const branch = this._branches[i]
    if (branch.test()) {
      content.push(branch.toString())
      // assuming that only one branch should succeed per fork so stop trying for others
      break
    }
  }
  return content.join('')
}
Fork.prototype.export = function () {
  return {
    id: this._id,
    branches: this._branches.map(branch => branch.export())
  }
}
// Static
Fork.construct = function (forkIn, model) {
  const fork = new Fork(forkIn.id, model)
  fork._branches = forkIn.branches.map(branchIn => Branch.construct(branchIn, model))
  return fork
}
export default Fork
