<template>
    <SampleFormComponent />
    <!--<OrganismInfoModal />-->

</template>

<script>
import SampleFormComponent from './components/SampleFormComponent.vue'
//import OrganismInfoModal from './components/modal/OrganismInfoModal.vue'

export default {
  name: 'App',
  components: {
    SampleFormComponent
    //OrganismInfoModal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
