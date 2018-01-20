<template>
	<div class="card-body">
		<h3>Edit Slug</h3>
		<div class="form-group">
			<input type="text" class="form-control" :value="slugValue">
		</div>
		<div>
			<button class="btn btn-sm btn-success card-link" @click="updateSlug">Save</button>
			<button class="btn btn-sm btn-link card-link" @click="toggleEditing">Cancel</button>
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
			this.isEditing = false
		},
		addFork () {
			this.slug.addFork(
				this.model.createFork()
			)
		}
	},
	props: ['slug', 'model'],
	watch: {
		slug () {
			this.slugValue = this.storedValue = this.slug._content
		}
	}
}
</script>
