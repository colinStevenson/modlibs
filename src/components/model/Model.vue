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
<style lang="scss">
$primary-color: #007bff;
$active-color: #28a745;

#model-stage{
	border: 1px solid #ccc;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIElEQVQoU2NkIAKcPn26gZEIdQyjCvGGEjh4QAQxYQkAfzsc1aILh3wAAAAASUVORK5CYII=) repeat;
	overflow: auto;
	margin: 20px 0;

	> div{
		height: 50vh;
	}
}

.node circle {
	fill: #fff;
	stroke: $primary-color;
	stroke-width: 2px;

	&.has-children{
		fill: lighten($primary-color, 40%);
	}
}

.node text {
	font: 12px sans-serif;
}

.link {
	fill: none;
	stroke: #ccc;
	stroke-width: 2px;

	&.link-active{
		stroke: $active-color;
	}
}
</style>

