<template>
    <div>
        <div class="">
            <img :src="logo.url">
        </div>
        <div class="cover-home">
        <div class="row" style="padding-top: 40px;">
            <div class="col-4" style="">
                <div class="titulo_modulo">
                    <h1>Administración</h1>
                </div>
                <div class="cuerpo_modulo">
                    <ul>
                        <li><i class="fas fa-chevron-right"></i> <router-link :to="{ name: 'TiposDePago'}">Tipos de pago</router-link></li>
                        <li><i class="fas fa-chevron-right"></i> <router-link :to="{ name: 'Grupos'}">Creación de grupos</router-link></li>
                        <li><i class="fas fa-chevron-right"></i> <router-link :to="{ name: 'TiposCicloEscolar'}">Ciclo Escolar</router-link></li>
                        <li><i class="fas fa-chevron-right"></i> <router-link to="/">Control de pagos</router-link></li>
                        <li><i class="fas fa-chevron-right"></i> <router-link :to="{ name: 'TiposDeRecargos'}">Tipos de recargos</router-link></li>
                    </ul> 
                </div>
            </div>
            <div class="col-4">
                <div class="titulo_modulo">
                    <h1>Alumnos</h1>
                </div>
                <div class="cuerpo_modulo">
                    <ul>
                        <li><i class="fas fa-chevron-right"></i> <router-link :to="{ name: 'RegistroDeAlumnos'}">Registro de alumnos</router-link></li>
                        <li><i class="fas fa-chevron-right"></i> <router-link to="/">Consulta de Historial Acádemico</router-link></li>
                        <li><i class="fas fa-chevron-right"></i> <router-link to="/">Registro de Padre/Tutor</router-link></li>
                    </ul> 
                </div>
            </div>
            <div class="col-4">
                <div class="titulo_modulo">
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
        </div>
    </div>
</template>
<script>
export default {
  name: 'Inicio',
  data(){
    return {    
        logo: {
            url: require('../assets/home.jpg')
      }         
    }
  },
}
</script>
<style scoped>
.cover_home {
    max-width: 100%;
    display: contents;
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

.cover-home {
    max-width: 960px; 
    margin:0 auto;
}

.titulo_modulo{
    background-color: #002d5c;
    color:white;
    padding: 10px; 
    text-align: center;
    border: 1px solid #cc003d;
    border-radius: 5px 5px 0px 0px;
}

.cuerpo_modulo{
    padding: 12px; 
    border: 1px solid #adb5bd;
    border-radius: 0px 0px 5px 5px;
}


</style>