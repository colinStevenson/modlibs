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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'model'
    ]),
    outcome () {
      return this.model._outcome
    }
  }
}
</script>
