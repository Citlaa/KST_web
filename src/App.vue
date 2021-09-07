<template>
  <div>
    <div>
    <b-navbar toggleable="md" type="dark" style="padding-left: 20px; padding-right: 20px;">      
      <b-navbar-brand href="#">
        <img :src="logo.url" class="d-inline-block align-top logo" alt="Instituto Castelazo">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="justify-content-end" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Index'}">Inicio</b-nav-item>
          <b-nav-item-dropdown text="Administración">
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Tipos de pago</b-dropdown-item>          
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Creación de grupos</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Ciclo Escolar</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Control de pagos</b-dropdown-item>            
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Tipos de recargos</b-dropdown-item>            
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Alumnos">
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Registro de alumnos</b-dropdown-item>          
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Consulta de Historial Acádemico</b-dropdown-item>            
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Rgistro de Padre/Tutor</b-dropdown-item>            
          </b-nav-item-dropdown>          
          <b-nav-item-dropdown text="Reportes">
            <b-dropdown-item :to="{ name: 'TiposDePago'}" class="ms-auto">Lista de grupo</b-dropdown-item>          
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Lista de personas con aduedo</b-dropdown-item>                        
          </b-nav-item-dropdown>
        </b-navbar-nav>        
      </b-collapse>      
    </b-navbar>
    </div>
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
  },
  data(){
    return {
      logo: {
        url: require('./assets/logo.png')
      }
    }
  }
};
</script>
 
<style>
/* import style bulma */
@import "~bulma/css/bulma.css";
@import "../dist/css/kst.css";

</style>
