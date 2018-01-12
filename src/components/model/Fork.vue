<template>
  <div class="fork tree" :class="{'collapsed': collapsed}">
    <button class="btn btn-toggle" @click="toggleCollapse">{{collapsed ? '+' : '-'}}</button>
    <branch v-for="branch in branches" :key="branch._id" :branch="branch" :fork="fork" :model="model" class="leaf"></branch>
    <div class="leaf fork-controls">
      <button class="btn btn-sm btn-success" @click="addBranch">&plus;</button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    branches () {
      return this.fork._branches
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
    addBranch () {
      this.fork.addBranch(
        this.model.createBranch(function () { return true }, this.model.createSlug('[Slug Text]'))
      )
    }
  },
  props: ['fork', 'model']
}
</script>
