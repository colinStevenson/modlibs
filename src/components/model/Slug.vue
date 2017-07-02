<template>
  <div class="slug" :class="{'is-editing': isEditing}">
    <div class="slug-text-container" v-if="!isEditing" @click="toggleEditing">
      <span class="slug-text">{{slugValue}}</span>
    </div>
    <div class="form-group" v-if="isEditing">
      <input type="text" class="form-control" v-model="slugValue">
    </div>
    <div class="controls" v-if="isEditing">
      <button class="btn btn-sm btn-success card-link" @click="updateSlug">Save</button>
      <button class="btn btn-sm btn-link card-link" @click="toggleEditing">Cancel</button>
    </div>
    <fork v-if="slug._fork" :fork="slug._fork" :model="model"></fork>
    <div v-else class="controls">
      <button class="btn btn-sm btn-success" @click="addFork" title="Add Fork">
        &fork;
      </button>
    </div>
  </div>
</template>
<script>
import Fork from './Fork'
export default {
  components: {
    Fork
  },
  created () {
    this.slugValue = this.storedValue = this.slug._content
  },
  data () {
    return {
      storedValue: null,
      slugValue: null,
      isEditing: false
    }
  },
  methods: {
    toggleEditing () {
      this.isEditing = !this.isEditing
    },
    updateSlug () {
      this.slug._content = this.slugValue
      this.isEditing = false
    },
    addFork () {
      this.slug.addFork(
        this.model.createFork()
      )
    }
  },
  props: ['slug', 'model']
}
</script>
<style lang="scss">
  .slug{
    display: inline-block;
    min-width: 300px;
  }
  .slug > .controls{
    margin-left: 0;
    margin-bottom: 10px;
  }
</style>
