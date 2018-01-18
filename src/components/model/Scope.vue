<template>
	<section class="card model-scope">
		<div class="card-body">
			<h1 class="card-title">Model Scope</h1>
		</div>
		<div class="card-body">
			<div class="form-group row" v-for="(value, field) in scope" :key="field">
				<label class="col-4 col-form-label">{{field}}</label>
				<div class="col-8">
					<input type="text" class="form-control" :value="value" @keyup="handleValueChange($event, field)">
				</div>
			</div>
			<button class="btn btn-primary" @click="toggleAddingState" v-if="!isAddingField">Add field</button>
			<div v-if="isAddingField">
				<div class="form-group row">
					<label class="col-4 col-form-label">Field Name</label>
					<div class="col-8">
						<input type="text" class="form-control" v-model="newFieldName">
					</div>
				</div>
				<div>
					<button class="btn btn-success" @click="saveNewFieldName">Save</button>
					<button class="btn btn-danger" @click="toggleAddingState">Cancel</button>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters([
			'model'
		]),
		scope () {
			return this.model.getScope()
		}
	},
	data () {
		return {
			isAddingField: false,
			newFieldName: ''
		}
	},
	methods: {
		toggleAddingState () {
			this.newFieldName = ''
			this.isAddingField = !this.isAddingField
		},
		saveNewFieldName () {
			if (this.newFieldName !== '' && !this.scope[this.newFieldName]) {
				this.scope[this.newFieldName] = ''
				this.toggleAddingState()
			}
		},
		handleValueChange (event, field) {
			this.scope[field] = event.target.value
		}
	}
}
</script>
