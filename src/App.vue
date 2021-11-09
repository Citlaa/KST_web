<template>
  <div>
    <div>
    <b-navbar toggleable="md" type="dark" style="padding-left: 20px; padding-right: 20px;">      
      <b-navbar-brand href="#">
        <img :src="logo.url" class="align-top logo-sm" alt="Instituto Castelazo">
        <img :src="logo.url" class="align-top logo-md" alt="Instituto Castelazo">       
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="justify-content-end" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item :to="{ name: 'Index'}">Inicio</b-nav-item> -->
          <b-nav-item :to="{ name: 'Index'}">Inicio</b-nav-item>
          <b-nav-item-dropdown text="Administración">
            <b-dropdown-item :to="{ name: 'TiposDePago'}">Tipos de pago</b-dropdown-item>          
            <b-dropdown-item :to="{ name: 'Grupos'}">Creación de grupos</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'TiposCicloEscolar'}">Ciclo Escolar</b-dropdown-item>
            <b-dropdown-item :to="{ name: ''}">Control de pagos</b-dropdown-item>            
            <b-dropdown-item :to="{ name: 'TiposDeRecargos'}">Tipos de recargos</b-dropdown-item>            
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Alumnos">
            <b-dropdown-item :to="{ name: ''}">Registro de alumnos</b-dropdown-item>          
            <b-dropdown-item :to="{ name: ''}">Consulta de Historial Acádemico</b-dropdown-item>            
            <b-dropdown-item :to="{ name: ''}">Registro de Padre/Tutor</b-dropdown-item>            
          </b-nav-item-dropdown>          
          <b-nav-item-dropdown text="Reportes">
            <b-dropdown-item :to="{ name: ''}" class="ms-auto">Lista de grupo</b-dropdown-item>          
            <b-dropdown-item :to="{ name: ''}">Lista de personas con aduedo</b-dropdown-item>                        
          </b-nav-item-dropdown>
        </b-navbar-nav>        
      </b-collapse>      
    </b-navbar>
    </div>
    <div id="app" class="">
      <router-view />
    </div>
    <div id="footer">
      <div id="container_footer">
        &copy; {{new Date().getFullYear()}} Copyright: <a href="http://castelazo.edu.mx/"> castelazo.edu.mx </a>
      </div>
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
  },
  created(){    
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
