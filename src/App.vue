<template>
  <div>    
    <div>            
    <div id="menu" v-if="$route.name != 'Login'">
      <Menu />
    </div>
    <div id="app" style="min-height: 90vh">
      <router-view />
    </div>
    <div id="footer">
      <div id="container_footer">
        &copy; {{new Date().getFullYear()}} Copyright: <a href="http://castelazo.edu.mx/"> castelazo.edu.mx </a>
      </div>
    </div>
    </div>
  </div>
</template>
 
<script>
import Menu from "./components/Menu/menu.vue"

export default {
  name: "App",
  components:{      
    Menu
  },
  setup(){    
  },  
  created(){  
  },
  watch: {
  }
};
</script>
 
<style>
/* import style bulma */
@import "~bulma/css/bulma.css";
@import "css/kst.css";


#container_footer{
  padding-top:20px;
  padding-bottom:5px;
  margin-top:20px;
  border-top: 2px solid #cc003d;
  width:100vw;
  color:#FFF;
  background-color:#002d5c !important;
  display:flex;
  flex-direction:column;
  align-items:center;
}

#container_footer a {
  color: white;
}
</style>
