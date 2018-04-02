<template>
	<div class="card model mb-3">
		<div class="card-body">
			<h1>{{model.getName()}}</h1>
			<div id='model-stage' ref="stage">
				<div>
					<svg ref="svg">
					</svg>
				</div>
			</div>
			<p class="model-branch text-success">
				<strong>Current output: </strong>{{modelOutput}}
			</p>
		</div>
		<slug v-if="slug" :slug="slug" :branch="selectedBranch" :model="model" :modelUpdateHandler="modelUpdateHandler"></slug>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import Tree from '../../visualizations/tree'
import Slug from './Slug'

export default {
	components: {
		Slug
	},
	computed: {
		...mapGetters([
			'model',
			'modelScope'
		]),
		branch () {
			return this.model._branch
		}
	},
	data () {
		return {
			selectedBranch: null,
			modelOutput: null,
			slug: null,
			visualization: null
		}
	},
	methods: {
		getStageDimensions () {
			return [600, this.$refs.stage.offsetWidth]
		},
		handleSlugSelection (node) {
			this.slug = node.data._slug
			this.selectedBranch = node.data
		},
		modelUpdateHandler () {
			this.visualization.update()
			this.setModelOutput()
		},
		setModelOutput () {
			this.modelOutput = this.model.toString()
		}
	},
	mounted () {
		const stageDimensions = this.getStageDimensions()
		this.visualization = new Tree(
			this.$refs.svg,
			this.branch,
			{
				width: stageDimensions[1],
				height: stageDimensions[0],
				slugSelectHandler: this.handleSlugSelection
			}
		)
		this.setModelOutput()
	},
	watch: {
		modelScope () {
			this.visualization.evaluateBranches()
		}
	}
}
</script>
<style lang="scss">

#model-stage{
	border: 1px solid #ccc;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIElEQVQoU2NkIAKcPn26gZEIdQyjCvGGEjh4QAQxYQkAfzsc1aILh3wAAAAASUVORK5CYII=) repeat;
	overflow: auto;
	margin: 20px 0;

	> div{
		height: 50vh;
	}
}
</style>

