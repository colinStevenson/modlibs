<template>
  <div class="fork tree" :class="{'collapsed': collapsed}">
    <button class="btn btn-toggle" @click="toggleCollapse">{{collapsed ? '+' : '-'}}</button>
    <outcome v-for="outcome in outcomes" :key="outcome._id" :outcome="outcome" :fork="fork" :model="model" class="leaf"></outcome>
    <div class="leaf fork-controls">
      <button class="btn btn-sm btn-success" @click="addOutcome">&plus;</button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    outcomes () {
      return this.fork._outcomes
    }
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapse () {
      this.collapsed = !this.collapsed
    },
    addOutcome () {
      this.fork.addOutcome(
        this.model.createOutcome(function () { return true }, this.model.createSlug('[Slug Text]'))
      )
    }
  },
  props: ['fork', 'model']
}
</script>
