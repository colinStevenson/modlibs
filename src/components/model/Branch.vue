<template>
  <div class="branch" :class="activeClass">
    <slug :slug="slug" :model="model"></slug>
    <div class="form-group" v-if="isEditing">
      <textarea class="form-control" rows="3" v-model="actualizer"></textarea>
      <button class="btn btn-sm btn-success" @click="saveActualizer">Save</button>
    </div>
    <div class="controls" v-if="hasActualizer && fork">
      <button class="btn btn-sm btn-warning" type="button" v-if="hasActualizer" @click="toggleEditing">
        &fnof;
        <span class="sr-only">Edit Function</span>
      </button>
      <button v-if="fork" type="button" class="btn btn-danger btn-sm" @click="removeBranch">
        &times;
        <span class="sr-only">Remove Branch</span>
      </button>
    </div>
  </div>
</template>
<script>
import Slug from './Slug'
export default {
  components: {
    Slug
  },
  computed: {
    activeClass () {
      return this.branch.test()
        ? 'active'
        : 'inactive'
    },
    slug () {
      return this.branch._slug
    },
    hasActualizer () {
      return !!this.actualizer
    }
  },
  created () {
    this.actualizer = this.branch._actualizer
      ? this.branch._actualizer.toString()
      : null
  },
  data () {
    return {
      isEditing: false,
      actualizer: null
    }
  },
  methods: {
    removeBranch () {
      this.fork.removeBranch(this.branch)
    },
    toggleEditing () {
      this.isEditing = !this.isEditing
    },
    saveActualizer () {
      let actualizer = this.branch._actualizer
      try {
        eval(`actualizer = ${this.actualizer}`)// eslint-disable-line no-eval
      } catch (e) {
        console.log(e)
      }
      this.branch._actualizer = actualizer
      this.isEditing = false
    }
  },
  props: ['branch', 'fork', 'model']
}
</script>
<style lang="scss">
.branch .branch{
  padding: 20px;
  box-shadow: 0 0 0 rgba(0,0,0,.3);
  transition: 0.3s box-shadow ease-in;

  &:hover{
    box-shadow: 0 3px 5px rgba(0,0,0,.2);

    > .controls{
      opacity: 1;
    }
  }
}
.branch > .controls{
  background: rgba(0, 0, 0, 0.02);
  border-top: 1px solid #ccc;
  padding: 10px;
  margin: 0;
  text-align: right;
  opacity: 0;
  transition: 0.3s opacity ease-in;
}
</style>
