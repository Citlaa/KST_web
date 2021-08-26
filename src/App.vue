<template>
  <div>
  <Menu />
  <div id="app" class="container is-max-desktop" :style="{'margin-left' : sidebarWidth }">
    <router-view />
  </div>
  </div>
</template>
 
<script>
import Menu from '@/components/Menu/Menu'
import { sidebarWidth } from '@/components/Menu/state.js'

export default {
  name: "App",
  components:{
    Menu
  },
  setup(){
    return { sidebarWidth }
  }
};
</script>
 
<style>
/* import style bulma */
@import "~bulma/css/bulma.css";
</style>
