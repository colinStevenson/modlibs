import Vue from 'vue'
import Vuex from 'vuex'
import Model from '../model/model'

Vue.use(Vuex)

const model = new Model(1, 'Unnamed model')
const modelScope = {
	apples: 1,
	oranges: 20
}
model.setScope(modelScope)
const subBranchA = model.createBranch(function () {
	return Number(this.apples) === 1
}, model.createSlug('well.'))
const subBranchB = model.createBranch(function () {
	return Number(this.apples) !== 1
}, model.createSlug('poorly.'))
const subFork = model.createFork()
subFork.addBranch(subBranchA)
subFork.addBranch(subBranchB)
const branchA = model.createBranch(() => { return true }, model.createSlug('working ', subFork))
const branchB = model.createBranch(() => { return false }, model.createSlug('not working ', subFork))
const branchC = model.createBranch(() => { return false }, model.createSlug('sorta working ', subFork))
const fork = model.createFork()
fork.addBranch(branchA)
fork.addBranch(branchB)
fork.addBranch(branchC)
model.setSlug('This is ', fork)
window.model = model

const state = {
	model,
	modelScope
}
const mutations = {
	UPDATE_MODEL_SCOPE (state, payload) {
		state.modelScope = payload
		state.model.setScope(payload)
	}
}

const getters = {
	model: state => state.model,
	modelScope: state => state.modelScope
}

export default new Vuex.Store({
	state,
	getters,
	mutations
})
