<template>
  <div id="app">
    <site-header></site-header>
    <main class="mt-3">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Model from './model/model'
import SiteHeader from './components/SiteHeader'
window.Model = Model

export default {
  name: 'app',
  components: {
    SiteHeader
  }
}
</script>
<style lang="scss" src="./style/components.scss"></style>
