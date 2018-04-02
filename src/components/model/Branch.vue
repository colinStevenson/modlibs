<template>
	<div class="branch">
		<div class="form-group">
			<label for="condition-input">Edit Condition</label>
			<textarea id="condition-input" class="form-control mb-2" rows="3" v-model="condition"></textarea>
			<button class="btn btn-sm btn-success" @click="saveCondition">Save</button>
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		hasCondition () {
			return !!this.condition
		}
	},
	created () {
		this.condition = this.branch._condition
			? this.branch._condition.toString()
			: null
	},
	data () {
		return {
			isEditing: false,
			condition: null
		}
	},
	methods: {
		saveCondition () {
			let condition = this.branch._condition
			try {
				eval(`condition = ${this.condition}`)// eslint-disable-line no-eval
			} catch (e) {
				console.log(e)
			}
			this.branch._condition = condition
			this.modelUpdateHandler()
		}
	},
	props: ['branch', 'model', 'modelUpdateHandler']
}
</script>

