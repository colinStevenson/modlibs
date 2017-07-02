<template>
  <div class="model">
    <h1>{{model.getName()}}</h1>
    <p class="model-outcome bg-success">
      {{model.toString()}}
    </p>
    <div class="model-container">
      <outcome :outcome="outcome" :model="model"></outcome> 
    </div>
  </div>
</template>
<script>
import Model from '../../model/model'

const model = new Model(1, 'Unnamed model')

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

export default {
  computed: {
    outcome () {
      return model._outcome
    }
  },
  data () {
    return {
      model: model
    }
  }
}
</script>
