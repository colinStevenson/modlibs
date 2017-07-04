import Vue from 'vue'
import Vuex from 'vuex'
import Model from '../model/model'

Vue.use(Vuex)

const model = new Model(1, 'Unnamed model')
model.setScope({
  apples: 1,
  oranges: 20,
  getTest () {
    return 'Test'
  }
})
// const subOutcomeA = model.createOutcome(() => { return true }, model.createSlug('well.'))
// const subOutcomeB = model.createOutcome(() => { return false }, model.createSlug('poorly.'))
// const subFork = model.createFork()
// subFork.addOutcome(subOutcomeA)
// subFork.addOutcome(subOutcomeB)
// const outcomeA = model.createOutcome(() => { return true }, model.createSlug('working ', subFork))
// const outcomeB = model.createOutcome(() => { return false }, model.createSlug('not working ', subFork))
// const outcomeC = model.createOutcome(() => { return false }, model.createSlug('sorta working ', subFork))
// const fork = model.createFork()
// fork.addOutcome(outcomeA)
// fork.addOutcome(outcomeB)
// fork.addOutcome(outcomeC)
model.addSlug('[Start you model] ', null)

const state = {
  model
}
const mutations = {}

const getters = {
  model: state => state.model
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
