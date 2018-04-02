<template>
	<div class="card-body">
		<h3>Edit</h3>
		<div class="form-group">
			<label for="slug-input">Update text</label>
			<input type="text" class="form-control" id="slug-input" v-model="slugValue">
		</div>
		<div class="form-group">
			<button class="btn btn-sm btn-success card-link" @click="updateSlug">Save</button>
			<button class="btn btn-sm btn-link card-link" @click="toggleEditing">Cancel</button>
		</div>
		<branch :branch="branch" :model="model" :modelUpdateHandler="modelUpdateHandler"></branch>
		<div class="form-group" v-if="hasFork">
			<button class="btn btn-sm btn-info card-link" @click="addBranch">Add Branch</button>
		</div>
		<div class="form-group" v-if="!hasFork">
			<button class="btn btn-sm btn-info card-link" @click="createFork">Create Fork</button>
		</div>
	</div>
</template>
<script>
const DEFAULT_SLUG_TEXT = '[SLUG TEXT]'
import Branch from './Branch'
export default {
	components: {
		Branch
	},
	created () {
		this.slugValue = this.storedValue = this.slug._content
	},
	computed: {
		hasFork () {
			return !!this.slug.getFork()
		}
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
		createGenericBranch () {
			return this.model.createBranch(
				function () { return true },
				this.model.createSlug(DEFAULT_SLUG_TEXT)
			)
		},
		createFork () {
			const fork = this.model.createFork()
			const branch = this.createGenericBranch()
			fork.addBranch(branch)
			this.slug.addFork(fork)
			this.modelUpdateHandler()
		},
		addBranch () {
			const branch = this.createGenericBranch()
			const fork = this.slug.getFork()
			fork.addBranch(branch)
			this.modelUpdateHandler()
		}
	},
	props: ['slug', 'branch', 'model', 'modelUpdateHandler'],
	watch: {
		slug () {
			this.slugValue = this.storedValue = this.slug._content
		}
	}
}
</script>
