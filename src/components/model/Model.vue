<template>
  <div class="model">
    <h1>{{model.getName()}}</h1>
    <p class="model-branch bg-success">
      Current output: {{model.toString()}}
    </p>
    <div class="model-container">
      <branch :branch="branch" :model="model"></branch> 
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
    branch () {
      return this.model._branch
    }
  }
}
</script>
