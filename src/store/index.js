import Vue from 'vue'
import Vuex from 'vuex'
import Model from '../model/model'

Vue.use(Vuex)

const model = new Model(1, 'Unnamed model')
const modelScope = {
	bengals: 23,
	browns: 3
}
model.setScope(modelScope)
const subBranchA = model.createBranch(function () {
	return Math.abs(Number(this.bengals) - Number(this.browns)) >= 10
}, model.createSlug(' handedly (${this.bengals} - ${this.browns}).')) // eslint-disable-line no-template-curly-in-string
const subBranchB = model.createBranch(function () {
	return Math.abs(Number(this.bengals) - Number(this.browns)) < 7
}, model.createSlug(' by a small margin.'))
const subFork = model.createFork()
subFork.addBranch(subBranchA)
subFork.addBranch(subBranchB)
const branchA = model.createBranch(function () {
	return Number(this.bengals) > Number(this.browns)
}, model.createSlug('beat the Browns', subFork))
const branchB = model.createBranch(function () {
	return Number(this.bengals) === Number(this.browns)
}, model.createSlug('tied the Browns'))
const branchC = model.createBranch(function () {
	return Number(this.bengals) < Number(this.browns)
}, model.createSlug('lost to the Browns', subFork))
const fork = model.createFork()
fork.addBranch(branchA)
fork.addBranch(branchB)
fork.addBranch(branchC)
model.setSlug('The Bengals ', fork)
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
