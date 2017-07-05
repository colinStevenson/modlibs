<template>
  <div class="container">
    <model></model>
    <scope></scope>
  </div>
</template>

<script>
import Model from './model/Model'
import Scope from './model/Scope'

export default {
  components: {
    Model,
    Scope
  }
}
</script>
<style>
.page-content{
  margin: 20px 80px;
}
</style>

