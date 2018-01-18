<template>
  <div class="card model mb-3">
    <div class="card-body">
      <h1>{{model.getName()}}</h1>
      <div ref="stage">
        <svg ref="svg">
      	</svg>
      </div>
      <p class="model-branch text-success">
        <strong>Current output: </strong>{{model.toString()}}
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Tree from '../../visualizations/tree'

export default {
  computed: {
    ...mapGetters(['model']),
    branch () {
      return this.model._branch
    }
  },
  methods: {
    getStageDimensions () {
      return [600, this.$refs.stage.offsetWidth]
    }
  },
  mounted () {
    const stageDimensions = this.getStageDimensions()
    new Tree(this.$refs.svg, this.branch, {width: stageDimensions[1], height: stageDimensions[0]}) // eslint-disable-line no-new
  }
}
</script>
<style>
.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 3px;
}

.node text {
  font: 12px sans-serif;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>

