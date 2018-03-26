<template>
	<div class="card-body">
		<h3>Edit</h3>
		<h4>Modify text</h4>
		<div class="form-group">
			<input type="text" class="form-control" v-model="slugValue">
		</div>
		<div class="form-group">
			<button class="btn btn-sm btn-success card-link" @click="updateSlug">Save</button>
			<button class="btn btn-sm btn-link card-link" @click="toggleEditing">Cancel</button>
		</div>
		<h4>Add Branch</h4>
		<div class="form-group">
			<button class="btn btn-sm btn-info card-link" @click="addBranch">New Branch</button>
		</div>
	</div>
</template>
<script>
export default {
	created () {
		this.slugValue = this.storedValue = this.slug._content
	},
	data () {
		return {
			storedValue: null,
			slugValue: null,
			isEditing: true
		}
	},
	methods: {
		toggleEditing () {
			this.isEditing = !this.isEditing
		},
		updateSlug () {
			this.slug._content = this.slugValue
			this.modelUpdateHandler()
			this.isEditing = false
		},
		addFork () {
			this.slug.addFork(
				this.model.createFork()
			)
		}
	},
	props: ['slug', 'model', 'modelUpdateHandler'],
	watch: {
		slug () {
			this.slugValue = this.storedValue = this.slug._content
		}
	}
}
</script>
