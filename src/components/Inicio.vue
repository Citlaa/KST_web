<template>
    <div class="row col-12">
        <div class="col-4 modulo">   
            <div class="titulo_modulo" style="text-align: center;">
                <h1>Administración</h1>
            </div>
            <div class="cuerpo_modulo">
                <ul>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Tipos de pago</router-link></li>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Creación de grupos</router-link></li>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Ciclo Escolar</router-link></li>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Control de pagos</router-link></li>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Tipos de recargos</router-link></li>
                </ul> 
            </div>
        </div>
        <div class="col-4 modulo">   
            <div class="titulo_modulo" style="text-align: center;">
                <h1>Alumnos</h1>
            </div>
            <div class="cuerpo_modulo">
                <ul>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Registro de alumnos</router-link></li>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Consulta de Historial Acádemico</router-link></li>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Registro de Padre/Tutor</router-link></li>
                </ul> 
            </div>
        </div>
        <div class="col-4 modulo">   
            <div class="titulo_modulo" style="text-align: center;">
                <h1>Reportes</h1>
            </div>
            <div class="cuerpo_modulo">
                <ul>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Lista de grupo</router-link></li>
                    <li><i class="fas fa-chevron-right"></i> <router-link to="/">Lista de personas con aduedo</router-link></li>                    
                </ul> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Inicio',
  data(){
    return {            
    }
  },
  props: {
    
  }
}
</script>
<style scoped>
.cover_home {
     max-width: 100%;
    padding: 0px;
    height: 70vh;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 1em;
    background: url(../assets/home.jpg) no-repeat center;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    -ms-background-size: cover;
    -moz-background-size: cover;
}

@media screen and (min-width: 1024px){
.container {
    max-width: 100%;
    padding: 0px;
}
}

.modulo{
    margin: 30px 10px 10px 10px;
    border: 1px solid #adb5bd;
    border-radius: 5px;
    padding: 0px;
}

.titulo_modulo{
    background-color: #dbdbdb;
    padding: 10px; 
}

.cuerpo_modulo{
    padding: 10px; 
}
</style>