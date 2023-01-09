<template>
  <div>
    <b-navbar
      toggleable="md"
      type="dark"
      style="padding-left: 20px; padding-right: 20px;"
    >
      <b-navbar-brand href="#">
        <img
          :src="logo.url"
          class="align-top logo-sm"
          alt="Instituto Castelazo"
        />
        <img
          :src="logo.url"
          class="align-top logo-md"
          alt="Instituto Castelazo"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="justify-content-end" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item :to="{ name: 'Index'}">Inicio</b-nav-item> -->
          <b-nav-item :to="{ name: 'Index' }">Inicio</b-nav-item>
          <b-nav-item-dropdown text="Administración">
            <b-dropdown-item :to="{ name: 'TiposDePago' }"
              >Tipos de pago</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'Grupos' }"
              >Creación de grupos</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'TiposCicloEscolar' }"
              >Ciclo Escolar</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'TiposDePagos' }"
              >Control de pagos</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'TiposDeRecargos' }"
              >Tipos de recargos</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Alumnos">
            <b-dropdown-item :to="{ name: 'RegistroDeAlumnos' }"
              >Registro de alumnos</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'RegistroDeTutores' }"
              >Registro de Padre/Tutor</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Reportes">
            <b-dropdown-item :to="{ name: 'ListaDeGrupo' }" class="ms-auto"
              >Lista de grupo</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'PersonasAdeudo' }"
              >Lista de personas con adeudo</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item v-if="isLoggedIn" @click="logout" >
            <i class="fas fa-sign-out-alt"></i>
          </b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: {
        url: require("../../assets/logo.png"),
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },    
  },
  methods:{
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    },
  }
};
</script>
