<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="danger" style="padding-left: 20px; padding-right: 20px;">      
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Index'}">Home</b-nav-item>
          <b-nav-item :to="{ name: 'Home'}">Disabled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>      
    </b-navbar>
    <div id="app" class="container is-max-desktop">
      <router-view />
    </div>
  </div>
</template>
 
<script>

export default {
  name: "App",
  components:{
    
  },
  setup(){    
  }
};
</script>
 
<style>
/* import style bulma */
@import "~bulma/css/bulma.css";
</style>
