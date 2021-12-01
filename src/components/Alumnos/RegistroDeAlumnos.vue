<template>
  <div class="container is-max-desktop">
    <div class="col-12" id="Titulo">
      <h1 class="titulo_azul">Registro de Alumnos</h1>
      <div class="line_red"></div>
    </div>
    <div class="col-12 row filtros_div" id="filtros_div">
      <div class="col-12 filtro_titulo">
        <div class="row">
          <div class="col-10">
            <h1 class="col-10">Favor de indicar filtros</h1>
          </div>
          <div
            class="col-2"
            @click="mostrarFiltros = !mostrarFiltros"
            :key="mostrarFiltros"
          >
            <i
              class="fas fa-angle-down"
              v-if="!mostrarFiltros"
              style="float: right;"
            ></i>
            <i
              class="fas fa-angle-up"
              v-if="mostrarFiltros"
              style="float: right;"
            ></i>
          </div>
        </div>
      </div>
      <div v-if="mostrarFiltros" class="col-12 row">
        <div class="col-4">
          <label>Nombre</label>
          <input
            class="form-control"
            type="text"
            v-model="filtros.filtro_nombre"
          />
        </div>
        <div class="col-4">
          <label>Apellido Paterno</label>
          <input
            class="form-control"
            type="text"
            v-model="filtros.filtro_apellidoPaterno"
          />
        </div>
        <div class="col-4">
          <label>Apellido Materno</label>
          <input
            class="form-control"
            type="text"
            v-model="filtros.filtro_apellidoMaterno"
          />
        </div>
        <div class="col-4">
          <label>CURP</label>
          <input
            class="form-control"
            type="text"
            v-model="filtros.filtro_curp"
          />
        </div>
        <div class="col-4">
          <label>Número de control</label>
          <input
            class="form-control"
            type="number"
            v-model="filtros.filtro_numeroDeControl"
          />
        </div>
        <div class="col-4">
          <label class="activo_label">Activo</label>
          <select class="form-control" v-model="filtros.filtro_activo">
            <option value="-1">Seleccionar Activo</option>
            <option value="1">Si</option>
            <option value="0">No</option>
          </select>
        </div>
      </div>
      <div v-if="mostrarFiltros" class="filtro_footer">
        <button class="button is-default btn-sm mr-1" @click="limpiarFiltros()">
          Limpiar
        </button>
        <button class="button is-primary btn-sm" @click="getAlumnos()">
          Buscar
        </button>
      </div>
    </div>
    <div class="col-12" style="margin-bottom:100px;">
      <button
        class="button is-primary mt-5 mb-1 align-left"
        @click="abrirModal('Agregar', {})"
      >
        <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar alumno
      </button>
      <br />
      <div id="bootstrap_table">
        <div class="col-3 mr-0 align-rigth">
          <input
            class="form-control"
            v-model="filter"
            type="search"
            placeholder="Buscar"
          />
        </div>
        <b-table
          striped
          hover
          outlined
          :items="items"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
        >
          <template v-slot:cell(Activo)="data">
            <i
              v-if="data.item.Activo == 1"
              class="far fa-check-square"
              style="color: green"
            ></i>
            <i v-else class="far fa-times-circle" style="color: red"></i>
          </template>
          <template v-slot:cell(opciones)="data">
            <button
              class="button is-info is-small"
              @click="abrirModal('Editar', data.item)"
              value="Editar"
              title="Editar"
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="button is-danger is-small"
              :disabled="data.item.Activo == 0"
              @click="cancelar(data.item)"
              value="Eliminar"
              title="Cancelar"
            >
              <i class="fas fa-ban"></i>
            </button>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
        ></b-pagination>
      </div>
    </div>
    <div v-if="mostrarModal" class="modal_div" id="modal_div">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-xl">
              <div class="modal-content modal-xl">
                <div class="modal-header">
                  <div class="col-11">
                    <h2 class="modal-title text-center">
                      {{ titutoModal }} Alumno
                    </h2>
                    <div class="line_red"></div>
                  </div>
                  <a class="button close_modal" @click="mostrarModal = false">
                    <span aria-hidden="true">&times;</span>
                  </a>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="row seccion_modal">
                      <div class="col-12 seccion_titulo_modal">
                        <h3>Datos del alumno</h3>
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Nombre</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="item.Nombre"
                        />
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Apellido Paterno</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.ApellidoPaterno"
                        />
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Apellido Materno</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.ApellidoMaterno"
                        />
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>CURP</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.Curp"
                        />
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Fecha de nacimiento</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="item.FechaDeNacimiento"
                        />
                      </div>
                      <div class="col-4 padding-model">
                        <label>Genero</label>
                        <select class="form-control" v-model="item.GeneroId">
                          <option value="Femenino">Femenino</option>
                          <option value="Masculino">Masculino</option>
                        </select>
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Número de control</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="item.NumeroDeControl"
                        />
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Escuela de procedencia</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.Escuela"
                        />
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Promedio de procedencia</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.Promedio"
                        />
                      </div>
                    </div>
                    <div class="row seccion_modal">
                      <div class="col-12 seccion_titulo_modal">
                        <h3>Padre o Tutor</h3>
                        <p class="mt-1" style="color: red">
                          Favor de buscar el nombre del padre o tutor, si no
                          existe agregarlo.
                        </p>
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Nombre</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.Promedio"
                        />
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Apellido Paterno</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.Promedio"
                        />
                      </div>
                      <div class="col-4 form-group padding-model">
                        <label>Apellido Materno</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.Promedio"
                        />
                      </div>
                      <div
                        class="mt-2"
                        style="display:flex; justify-content: flex-end;"
                      >
                        <button
                          type="button"
                          class="button is-primary"
                          @click="guardarTipoDeCicloEscolar()"
                        >
                          Buscar
                        </button>
                      </div>
                      <div class="col-12">
                        <div
                          class="row"
                          v-if="padres"
                          style="display: grid; justify-content: center;"
                        >
                          <div class="col-12"><p>No hay registros</p></div>
                          <div class="col-12">
                            <button class="button is-default">
                              Agregar Padre/Tutor
                            </button>
                          </div>
                        </div>
                        <table v-else class="table">
                          <thead>
                            <tr>
                              <th>
                                Folio
                              </th>
                              <th>
                                Nombre
                              </th>
                              <th>
                                Apellido Paterno
                              </th>
                              <th>
                                Apellido Materno
                              </th>
                              <th>
                                Telefono
                              </th>
                              <th>
                                Domicilio
                              </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th></th>
                              <th></th>
                              <th></th>
                              <th></th>
                              <th></th>
                              <th></th>
                              <th>
                                <input type="radio" />
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="button is-primary"
                    @click="guardarTipoDeCicloEscolar()"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="mostrarModal = false"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <cargando v-if="isLoading"></cargando>
  </div>
</template>

<script>
import axios from "axios";
import routeAPI from "@/js/api";

export default {
  data() {
    return {
      isLoading: false,
      mostrarFiltros: true,
      mostrarModal: false,
      filtros: {
        filtro_nombre: "",
        filtro_apellidoPaterno: "",
        filtro_apellidoMaterno: "",
        filtro_curp: "",
        filtro_numeroDeControl: "",
        filtro_activo: "-1",
      },
      perPage: 5,
      currentPage: 1,
      fields: [
        {
          key: "AlumnoId",
          label: "Folio",
          sortable: true,
        },
        {
          key: "Nombre",
          label: "Nombre",
          sortable: true,
        },
        {
          key: "Curp",
          label: "CURP",
          sortable: true,
        },
        {
          key: "NumeroDeControl",
          label: "Número de Control",
          sortable: true,
        },
        {
          key: "Genero",
          label: "Genero",
        },
        {
          key: "TipoEstadoAlumnoId",
          label: "Estado",
        },
      ],
      filter: "",
      item: {
        Nombre: "",
        ApellidoPaterno: "",
        ApellidoMaterno: "",
        Curp: "",
        FechaDeNacimiento: "",
        GeneroId: 0,
        NumeroDeControl: 0,
        Escuela: "",
        Promedio: 0,
      },
      items: [],
      titutoModal: "",
      padres: [],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  created() {
    this.getAlumnos();
  },
  methods: {
    abrirModal: function() {
      this.mostrarModal = !this.mostrarModal;
    },
    async getAlumnos() {
      try {
        this.isLoading = true;
        this.items = [];
        const filtros = {
          filtro: {            
          },
        };

        if (this.filtros.filtro_nombre != "")
          filtros.filtro.nombre = Number(this.filtros.filtro_nombre);
        if (this.filtros.filtro_apellidoPaterno != "")
          filtros.filtro.apellidoPaterno = Number(this.filtros.filtro_apellidoPaterno);
        if (this.filtros.filtro_apellidoMaterno != "")
          filtros.filtro.apellidoMaterno = Number(this.filtros.filtro_apellidoMaterno);
        if (this.filtros.filtro_curp != "")
          filtros.filtro.curp = Number(this.filtros.filtro_curp);
        if (this.filtros.filtro_numeroDeControl != "")
          filtros.filtro.numeroDeControl = Number(this.filtros.filtro_numeroDeControl);
        if (this.filtros.filtro_activo != "")
          filtros.filtro.activo = Number(this.filtros.filtro_activo);

        const response = await axios.post(
          routeAPI + "alumnos/alumnos",
          filtros
        );
        console.log(response);
        response.data.response.forEach((element) => {
          this.items.push({
            AlumnoId: element["011AlumnoId"],
            Nombre:
              element["011Nombre"] +
              " " +
              element["011ApellidoPaterno"] +
              " " +
              element["011ApellidoMaterno"],
            Curp: element["011CURP"],
            FechaNacimiento: element["011FechaNacimiento"],
            Genero: element["011Genero"],
            NumeroDeControl: element["011NumeroDeControl"],
            EscuelaDeProcedenciaId: element["015EscuelaDeProcedenciaId"],
            PromedioDeProcedencia: element["011PromedioDeProcedencia"],
            Domicilio: element["011Domicilio"],
            TipoEstadoAlumnoId: element["014TipoEstadoAlumnoId"],
            Activo: element["011Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.modal-content {
  width: 1140px;
}

.seccion_modal {
  padding: 10px;
  margin: 5px;
  width: 99%;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.seccion_titulo_modal {
  /* display: flex; */
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
}
</style>
