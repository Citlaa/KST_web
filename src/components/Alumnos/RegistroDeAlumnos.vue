<template>
  <div class="container is-max-desktop">
    <div class="col-12" id="Titulo">
      <h1 class="titulo_azul">Registro de Alumnos</h1>
      <div class="line_red"></div>
    </div>
    <section id="filtro">
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
              type="search"
              v-model="filtros.filtro_nombre"
            />
          </div>
          <div class="col-4">
            <label>Apellido Paterno</label>
            <input
              class="form-control"
              type="search"
              v-model="filtros.filtro_apellidoPaterno"
            />
          </div>
          <div class="col-4">
            <label>Apellido Materno</label>
            <input
              class="form-control"
              type="search"
              v-model="filtros.filtro_apellidoMaterno"
            />
          </div>
          <div class="col-4">
            <label>CURP</label>
            <input
              class="form-control"
              type="search"
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
          <button
            class="button is-default btn-sm mr-1"
            @click="limpiarFiltros()"
          >
            Limpiar
          </button>
          <button class="button is-primary btn-sm" @click="getAlumnos()">
            Buscar
          </button>
        </div>
      </div>
    </section>
    <section id="data_table">
      <div class="col-12" style="margin-bottom:100px;">
        <button
          class="button is-primary mt-5 mb-1 align-left"
          @click="abrirModal('Agregar', true, {})"
        >
          <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar alumno
        </button>
        <br />
        <div
          class="row col-12"
          v-if="items.length <= 0"
          style="display: grid; justify-content: center;"
        >
          <p>No se encontraron registros</p>
        </div>
        <div id="bootstrap_table" v-else>
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
              <button
                class="btn btn-default"
                v-if="data.item.Activo == 1"
                :key="data.item.AlumnoId"
                style="cursor: default;"
              >
                <i class="far fa-check-square" style="color: green"></i>
              </button>
              <button
                class="btn btn-default"
                v-else
                :key="data.item.AlumnoId"
                style="cursor: default;"
              >
                <i class="far fa-times-circle" style="color: red"></i>
              </button>
            </template>
            <template v-slot:cell(opciones)="data">
              <button
                class="button is-default is-small"
                @click="abrirModal('', false, data.item)"
                value="Detalles"
                title="Ver Detalles"
              >
                <i class="far fa-eye"></i>
              </button>
              <button
                class="button is-info is-small"
                @click="abrirModal('Editar', true, data.item)"
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
    </section>
    <section id="modal">
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
                      <section id="data_alumnos">
                        <div class="row seccion_modal">
                          <div class="col-12 seccion_titulo_modal">
                            <h3>Datos del alumno</h3>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Nombre*</label>

                            <input
                              type="text"
                              class="form-control"
                              v-model="item.Nombre.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('Nombre')"
                            />
                            <p v-if="!item.Nombre.isValid" style="color: red">
                              Favor de ingresar un nombre
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Apellido Paterno*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.ApellidoPaterno.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('ApellidoPaterno')"
                            />
                            <p
                              v-if="!item.ApellidoPaterno.isValid"
                              style="color: red"
                            >
                              Favor de ingresar un apellido
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Apellido Materno*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.ApellidoMaterno.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('ApellidoMaterno')"
                            />
                            <p
                              v-if="!item.ApellidoMaterno.isValid"
                              style="color: red"
                            >
                              Favor de ingresar un apellido
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>CURP*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.Curp.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('Curp')"
                            />
                            <p v-if="!item.Curp.isValid" style="color: red">
                              Favor de ingresar la CURP
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Fecha de nacimiento*</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="item.FechaDeNacimiento.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('FechaDeNacimiento')"
                            />
                            <p
                              v-if="!item.FechaDeNacimiento.isValid"
                              style="color: red"
                            >
                              Favor de ingresar fecha de nacimiento
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 padding-model">
                            <label>Género*</label>
                            <select
                              class="form-control"
                              v-model="item.Genero.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('Genero')"
                            >
                              <option value="-1" selected
                                >Seleccionar Género</option
                              >
                              <option value="Femenino">Femenino</option>
                              <option value="Masculino">Masculino</option>
                            </select>
                            <p v-if="!item.Genero.isValid" style="color: red">
                              Favor de ingresar género
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Número de control</label>
                            <input
                              type="number"
                              class="form-control"
                              v-model="item.NumeroDeControl.val"
                              :disabled="!inhabilitar"
                            />
                            <p
                              v-if="!item.NumeroDeControl.isValid"
                              style="color: red"
                            >
                              Favor de ingresar la número de control
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <escuela
                              :label="'Escuela de procedencia*'"
                              :escuelaId="item.EscuelaId.val"
                              :key="item.EscuelaId.val"
                              :titulo="true"
                              :disabled="!inhabilitar"
                              @seleccionarEscuela="seleccionarEscuela($event)"
                              :funcion="'seleccionarEscuela'"
                              @blur="limpiarValidez('EscuelaId')"
                            >
                            </escuela>
                            <p
                              v-if="!item.EscuelaId.isValid"
                              style="color: red"
                            >
                              Favor de ingresar escuela de procedencia
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Promedio de procedencia</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.Promedio.val"
                              :disabled="!inhabilitar"
                            />
                            <p v-if="!item.Promedio.isValid" style="color: red">
                              Favor de ingresar promedio
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Beca de incripción</label>
                            <input
                              type="number"
                              class="form-control"
                              v-model="item.BecaInscripcion.val"
                              :disabled="!inhabilitar"
                            />
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Beca de mensualidad</label>
                            <input
                              type="number"
                              class="form-control"
                              v-model="item.BecaMensualidad.val"
                              :disabled="!inhabilitar"
                            />
                          </div>
                          <div class="col-12 form-group padding-model">
                            <label>Domicilio*</label>
                            <textarea
                              type="text"
                              class="form-control"
                              cols=""
                              v-model="item.Domicilio.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('Domicilio')"
                            />
                            <p
                              v-if="!item.Domicilio.isValid"
                              style="color: red"
                            >
                              Favor de ingresar domicilio
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-12 seccion_titulo_modal">
                            <h3>Grupo</h3>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <TiposCicloEscolar
                              :key="item.CicloEscolar.key"
                              :titulo="true"
                              :label="'Ciclo Escolar*'"
                              :actual="true"
                              :tipoDeCicloEscolarId="
                                item ? item.CicloEscolar.val : -1
                              "
                              v-on:seleccionarCicloEscolar="
                                seleccionarCicloEscolar($event)
                              "
                              :funcion="'seleccionarCicloEscolar'"
                            />
                            <p
                              v-if="!item.CicloEscolar.isValid"
                              style="color: red"
                            >
                              Favor de ingresar ciclo escolar
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <tipos-nivel
                              :tipoNivelId="item.TiposNivelId.val"
                              :key="item.TiposNivelId.key"
                              :titulo="true"
                              :label="'Nivel'"
                              :funcion="'seleccionarNivelItem'"
                              @seleccionarNivelItem="
                                seleccionarNivelItem($event)
                              "
                            />
                          </div>
                          <div class="col-4 form-group padding-model">
                            <grupos :label="'Grupo'"
                            :tipoDeGrupoId="item.EstrucuraGrupoId.val"
                            :key="item.EstrucuraGrupoId.key" :titulo="true"
                            :disabled="!inhabilitar"
                            :filtrosEstablecidos="filtrosEstructuraGrupo"                            
                            @seleccionarEstructuraGrupo="
                            seleccionarEstructuraGrupo($event) "
                            :funcion="'seleccionarEstructuraGrupo'"
                            @blur="limpiarValidez('EstrucuraGrupoId')" />
                          </div>
                        </div>
                      </section>
                      <section id="data_tutor">
                        <div class="row seccion_modal">
                          <div class="row col-12" v-if="inhabilitar">
                            <div class="col-12 seccion_titulo_modal">
                              <h3>Buscar Padre o Tutor</h3>
                              <p
                                v-if="!item.tutores.isValid"
                                style="color: red"
                              >
                                Favor de seleccionar al menos un padre/tutor
                                <i
                                  class="far fa-times-circle"
                                  style="color: red"
                                ></i>
                              </p>
                              <p class="mt-1" style="color: red">
                                Favor de buscar el nombre del padre o tutor, si
                                no existe agregarlo.
                              </p>
                            </div>
                            <div class="col-4 form-group padding-model">
                              <label>Nombre</label>
                              <input
                                type="search"
                                class="form-control"
                                v-model="filtro_tutores.filtro_nombre"
                                @keypress.enter="buscarTutor"
                              />
                            </div>
                            <div class="col-4 form-group padding-model">
                              <label>Apellido Paterno</label>
                              <input
                                type="search"
                                class="form-control"
                                v-model="filtro_tutores.filtro_apellidoPaterno"
                                @keypress.enter="buscarTutor"
                              />
                            </div>
                            <div class="col-4 form-group padding-model">
                              <label>Apellido Materno</label>
                              <input
                                type="search"
                                class="form-control"
                                v-model="filtro_tutores.filtro_apellidoMaterno"
                                @keypress.enter="buscarTutor"
                              />
                            </div>
                            <div
                              class="mt-2"
                              style="display:flex; justify-content: flex-end;"
                            >
                              <button
                                type="button"
                                class="button is-primary"
                                @click="buscarTutor()"
                              >
                                Buscar
                              </button>
                            </div>
                            <div class="col-12">
                              <div
                                v-if="tutores.length <= 0"
                                class="row"
                                style="display: grid; justify-content: center;"
                              >
                                <div class="col-12">
                                  <p>No hay registros de búsqueda</p>
                                </div>
                              </div>
                              <div v-else>
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th>Folio</th>
                                      <th>Nombre</th>
                                      <th>Apellido Paterno</th>
                                      <th>Apellido Materno</th>
                                      <th>Domicilio</th>
                                      <th></th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="tutor in tutores"
                                      :key="tutor.PadreId"
                                    >
                                      <td>{{ tutor.PadreId }}</td>
                                      <td>{{ tutor.Nombre }}</td>
                                      <td>{{ tutor.ApellidoPaterno }}</td>
                                      <td>{{ tutor.ApellidoMaterno }}</td>
                                      <td>{{ tutor.Domicilio }}</td>
                                      <td>
                                        <tipos-parentesco
                                          :titulo="false"
                                          :disabled="!inhabilitar"
                                          @seleccionarParentesco="
                                            seleccionarParentesco($event)
                                          "
                                          :funcion="'seleccionarParentesco'"
                                        ></tipos-parentesco>
                                      </td>
                                      <td>
                                        <button
                                          class="btn btn-default"
                                          @click="agregarTutor(tutor)"
                                        >
                                          <i class="fas fa-plus"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div
                              v-if="this.item.tutores.val.length > 0"
                              class="row"
                            >
                              <div class="col-12 seccion_titulo_modal">
                                <h3>Padres o Tutores del alumno</h3>
                              </div>
                              <div class="col-12">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th>Folio</th>
                                      <th>Nombre</th>
                                      <th>Apellido Paterno</th>
                                      <th>Apellido Materno</th>
                                      <th>Parentesco</th>
                                      <th v-if="inhabilitar"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="tutor in item.tutores.val"
                                      :key="tutor.tutorId"
                                    >
                                      <td>{{ tutor.tutor.PadreId }}</td>
                                      <td>{{ tutor.tutor.Nombre }}</td>
                                      <td>{{ tutor.tutor.ApellidoPaterno }}</td>
                                      <td>{{ tutor.tutor.ApellidoMaterno }}</td>
                                      <td>{{ tutor.parentesco.nombre }}</td>
                                      <td v-if="inhabilitar">
                                        <button
                                          class="btn btn-default"
                                          @click="eliminarTutor(tutor)"
                                        >
                                          <i class="fas fa-trash-alt"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="button is-primary"
                      v-if="inhabilitar"
                      @click="guardarAlumno()"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="mostrarModal = false"
                      v-if="inhabilitar"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="mostrarModal = false"
                      v-if="!inhabilitar"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </section>
    <cargando v-if="isLoading"></cargando>
  </div>
</template>

<script>
import axios from "axios";
import routeAPI from "@/js/api";
import Enum from "@/js/enum";
import escuela from "../../components/Catalogos/Selects/EscuelasProcedencia.vue";
import tiposParentesco from "../../components/Catalogos/Selects/TiposParentesco.vue";
import grupos from "../../components/Catalogos/Selects/EstructurasGrupos.vue";
import TiposCicloEscolar from "../Catalogos/Selects/TiposCicloEscolar.vue";

export default {
  components: {
    escuela,
    tiposParentesco,
    grupos,
    TiposCicloEscolar,
  },
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
      filtrosEstructuraGrupo: {
        filtro_cicloEscolar: "",
        filtro_nivel: "",
        filtro_modalidad: "",
        filtro_periodo: "",
        filtro_grado: "",
      },
      perPage: 5,
      currentPage: 1,
      fields: [
        {
          key: "AlumnoId.val",
          label: "Folio",
          sortable: true,
        },
        {
          key: "NombreCompleto.val",
          label: "Nombre",
          sortable: true,
        },
        {
          key: "Curp.val",
          label: "CURP",
          sortable: true,
        },
        {
          key: "NumeroDeControl.val",
          label: "Número de Control",
          sortable: true,
        },
        {
          key: "Genero.val",
          label: "Genero",
        },
        {
          key: "TipoEstadoAlumno.val.Nombre",
          label: "Estado",
        },
        {
          label: "Opciones",
          key: "opciones",
        },
      ],
      filter: "",
      item: {
        AlumnoId: {
          val: null,
          isValid: true,
        },
        Nombre: {
          val: "",
          isValid: true,
        },
        ApellidoPaterno: {
          val: "",
          isValid: true,
        },
        ApellidoMaterno: {
          val: "",
          isValid: true,
        },
        Curp: {
          val: "",
          isValid: true,
        },
        FechaDeNacimiento: {
          val: new Date().toISOString().slice(0, 10),
          isValid: true,
        },
        Genero: {
          val: "-1",
          isValid: true,
        },
        NumeroDeControl: {
          val: 0,
          isValid: true,
        },
        EscuelaId: {
          val: 0,
          isValid: true,
        },
        Promedio: {
          val: 0,
          isValid: true,
        },
        Domicilio: {
          val: "",
          isValid: true,
        },
        BecaInscripcion: {
          val: 0,
        },
        BecaMensualidad: {
          val: 0,
        },
        CicloEscolar: {
          val: 0,
          isValid: true,
          key: "",
        },
        TiposNivelId: {
          val: 0,
          isValid: true,
          key: "",
        },
        EstrucuraGrupoId: {
          val: 0,
          isValid: true,
          key: "EstructuraGrupoId",
        },
        tutores: {
          val: [],
          isValid: true,
        },
        parentesco: {
          val: 0,
          isValid: true,
        },
        TipoEstadoAlumno: {
          val: true,
        },
      },
      items: [],
      itemIsValid: true,
      titutoModal: "",
      inhabilitar: true,
      tutores: [],
      estadosAlumno: [],
      filtro_tutores: {
        filtro_nombre: "",
        filtro_apellidoPaterno: "",
        filtro_apellidoMaterno: "",
      },
    };
  },
  watch: {
    mostrarModal: function(newVal) {
      if (!newVal) {
        this.limpiarVariables();
      }
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  created() {
    this.getEstadosAlumno();
    this.getAlumnos();   
  },
  methods: {            
    seleccionarEscuela(element) {
      this.item.EscuelaId.val = Number(element);
      this.item.EscuelaId.isValid = true;
    },
    seleccionarEstructuraGrupo(element) {
      this.item.EstrucuraGrupoId.val = Number(element);
      this.item.EstrucuraGrupoId.isValid = true;
    },
    seleccionarNivelItem(element) {
      this.item.TiposNivelId.val = Number(element);
      this.item.TiposNivelId.isValid = true;

      this.filtrosEstructuraGrupo.filtro_nivel = Number(element);
      this.item.EstrucuraGrupoId.key = "filtro_nivel" + element;
    },
    seleccionarCicloEscolar(element) {
      this.item.CicloEscolar.val = Number(element);
      this.item.CicloEscolar.isValid = true;

      this.filtrosEstructuraGrupo.filtro_cicloEscolar = Number(element);
      this.item.EstrucuraGrupoId.key = "filtro_cicloEscolar" + element;
    },
    seleccionarParentesco(parentesco) {
      this.item.parentesco.val = parentesco;
    },
    agregarTutor(tutor) {
      if (this.item.parentesco.val <= 0) {
        this.$alert("Favor de seleccionar parentesco.");
        return;
      }

      const selected = this.item.tutores.val.find(
        (i) => i.tutor.padreId === tutor.PadreId
      );

      if (selected) {
        this.$alert("El padre/tutor ya esta agregado.");
      } else {
        this.item.tutores.val.push({
          parentesco: {
            parentesoId: this.item.parentesco.val.TipoParentescoId,
            nombre: this.item.parentesco.val.Nombre,
          },
          tutor: tutor,
        });
      }
    },
    eliminarTutor(tutor) {
      const index = this.item.tutores.val.indexOf(
        this.item.tutores.val.find((i) => i.tutor.padreId === tutor.PadreId)
      );
      this.item.tutores.val.splice(index, 1);
    },
    limpiarValidez(input) {
      this.item[input].isValid = true;
    },
    async guardarTutores(alumnoId) {
      // this.isLoading = true;
      try {
        // eliminarTutoresDeAlumno
        const data = {
          alumnoId: alumnoId,
        };

        const responseDelete = await axios.post(
          routeAPI + "alumnos/eliminarTutoresDeAlumno",
          data
        );

        if (!responseDelete.data.hayError) {
          console.log("Los tutores se eliminaron con éxito.");
        } else {
          console.log(responseDelete);
          this.$alert(
            "Los tutores no se pudieron eliminar, favor de volverlo a intentar."
          );
          return;
        }

        this.item.tutores.val.forEach(async (tutor) => {
          const data = {
            alumno: {
              alumnoId: alumnoId,
              tutorId: tutor.tutor.PadreId,
              parentescoId: tutor.parentesco.parentesoId,
            },
          };

          const response = await axios.post(
            routeAPI + "alumnos/agregarTutoresDeAlumno",
            data
          );

          if (!response.data.hayError) {
            console.log("El tutor se guardó con éxito.");
            this.getAlumnos();
            this.limpiarVariables();
          } else {
            console.log(response);
            this.$alert(
              "El alumno se guardó con éxito pero no se pudo guardar el(los) tutor(es), favor de volverlo a intentar."
            );
          }
        });

        this.$alert("El alumno se guardó con éxito.");
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async guardarAlumno() {
      this.validarAlumno();

      if (this.itemIsValid) {
        if (this.item.AlumnoId.val > 0) this.editarAlumno();
        else this.agregarAlumno();
      } else {
        this.$alert("Favor de completar los datos.");
      }
    },
    async validarAlumno() {
      this.itemIsValid = true;
      if (this.item.Nombre.val === "") {
        this.item.Nombre.isValid = false;
        this.itemIsValid = false;
      }
      if (
        this.item.ApellidoPaterno.val === "" &&
        this.item.ApellidoMaterno.val === ""
      ) {
        if (this.item.ApellidoPaterno.val === "") {
          this.item.ApellidoPaterno.isValid = false;
        }
        if (this.item.ApellidoMaterno.val === "") {
          this.item.ApellidoMaterno.isValid = false;
        }
        this.itemIsValid = false;
      }
      if (this.item.Curp.val === "") {
        this.item.Curp.isValid = false;
        this.itemIsValid = false;
      }
      if (this.item.FechaDeNacimiento.val === "") {
        this.item.FechaDeNacimiento.isValid = false;
        this.itemIsValid = false;
      }
      if (this.item.Genero.val === "") {
        this.item.Genero.isValid = false;
        this.itemIsValid = false;
      }
      if (Number(this.item.EscuelaId.val) <= 0) {
        this.item.EscuelaId.isValid = false;
        this.itemIsValid = false;
      }
      if (this.item.Domicilio.val === "") {
        this.item.Domicilio.isValid = false;
        this.itemIsValid = false;
      }
      // if (this.item.tutores.val.length <= 0) {
      //   this.item.tutores.isValid = false;
      //   this.itemIsValid = false;
      // }
    },
    async agregarAlumno() {
      //Guardamos
      const data = {
        alumno: {
          Nombre: this.item.Nombre.val,
          ApellidoPaterno: this.item.ApellidoPaterno.val,
          ApellidoMaterno: this.item.ApellidoMaterno.val,
          Curp: this.item.Curp.val,
          FechaDeNacimiento: this.item.FechaDeNacimiento.val,
          Genero: this.item.Genero.val,
          NumeroDeControl: this.item.NumeroDeControl.val,
          EscuelaId: this.item.EscuelaId.val,
          Promedio: this.item.Promedio.val,
          Domicilio: this.item.Domicilio.val,
          TipoEstatusAlumno: Enum.TipoEstatusAlumno.Activo,
          EstructuraGrupo: this.item.EstrucuraGrupoId.val,
          BecaInscripcion: this.item.BecaInscripcion.val,
          BecaMensualidad: this.item.BecaMensualidad.val,
          FechaRegistro: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          Activo: Enum.EstatusGeneral.Activo,
        },
      };

      try {
        this.isLoading = true;

        const response = await axios.post(
          routeAPI + "alumnos/agregarAlumno",
          data
        );

        this.isLoading = false;

        if (!response.data.hayError) {
          // this.$alert("El alumno se guardó con éxito.");
          this.mostrarModal = false;
          console.log("El alumno se guardó con éxito.");
          if(this.item.tutores.length > 0)
            this.guardarTutores(response.data.response.insertId);
          else
            this.getAlumnos();

        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editarAlumno() {
      //Guardamos
      const data = {
        alumno: {
          AlumnoId: this.item.AlumnoId.val,
          Nombre: this.item.Nombre.val,
          ApellidoPaterno: this.item.ApellidoPaterno.val,
          ApellidoMaterno: this.item.ApellidoMaterno.val,
          Curp: this.item.Curp.val,
          FechaDeNacimiento: this.item.FechaDeNacimiento.val,
          Genero: this.item.Genero.val,
          NumeroDeControl: this.item.NumeroDeControl.val,
          EscuelaId: this.item.EscuelaId.val,
          Promedio: this.item.Promedio.val,
          Domicilio: this.item.Domicilio.val,
          TipoEstatusAlumno: Enum.TipoEstatusAlumno.Activo,
          FechaRegistro: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          Activo: Enum.EstatusGeneral.Activo,
        },
      };

      try {
        this.isLoading = true;

        const response = await axios.post(
          routeAPI + "alumnos/editarAlumno",
          data
        );

        this.isLoading = false;

        if (!response.data.hayError) {
          this.mostrarModal = false;
          console.log("El alumno se editó con éxito.");
          this.guardarTutores(this.item.AlumnoId.val);
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async buscarTutor() {
      try {
        this.isLoading = true;
        this.tutores = [];
        const filtros = {
          filtro: {},
        };

        if (this.filtro_tutores.filtro_nombre != "")
          filtros.filtro.nombre = this.filtro_tutores.filtro_nombre;
        if (this.filtro_tutores.filtro_apellidoPaterno != "")
          filtros.filtro.apellidoPaterno = this.filtro_tutores.filtro_apellidoPaterno;
        if (this.filtro_tutores.filtro_apellidoMaterno != "")
          filtros.filtro.apellidoMaterno = this.filtro_tutores.filtro_apellidoMaterno;

        const response = await axios.post(
          routeAPI + "alumnos/tutores",
          filtros
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {
              this.items.push({
                PadreId: element["012PadreId"],
                Nombre: element["012Nombre"],
                ApellidoPaterno: element["012ApellidoPaterno"],
                ApellidoMaterno: element["012ApellidoMaterno"],
                Activo: element["012Activo"],
                Domicilio: element["012Domicilio"],
              });
            });
          }
        } else {
          console.log(response);
          this.$alert(
            "No se pudo obtenera información, favor de volverlo a intentar."
          );
        }
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    abrirModal: function(tipo, inhabilitar, item) {
      this.titutoModal = tipo;
      this.inhabilitar = inhabilitar;

      if (item && item.AlumnoId && item.AlumnoId.val && item.AlumnoId.val > 0)
        this.cargarItem(item);
      this.mostrarModal = !this.mostrarModal;
    },
    cargarItem: function(item) {
      this.item.AlumnoId.val = item.AlumnoId.val;
      this.item.Nombre.val = item.Nombre.val;
      this.item.ApellidoPaterno.val = item.ApellidoPaterno.val;
      this.item.ApellidoMaterno.val = item.ApellidoMaterno.val;
      this.item.Curp.val = item.Curp.val;
      this.item.FechaDeNacimiento.val = new Date(item.FechaNacimiento.val)
        .toISOString()
        .slice(0, 10);
      this.item.Genero.val = item.Genero.val;
      this.item.NumeroDeControl.val = item.NumeroDeControl.val;
      this.item.EscuelaId.val = item.EscuelaDeProcedenciaId.val;
      this.item.Promedio.val = item.PromedioDeProcedencia.val;
      this.item.Domicilio.val = item.Domicilio.val;
      this.item.TipoEstadoAlumno.val = item.Activo.val;

      //cargar Tutores
      this.getTutores();
    },
    async getTutores() {
      try {
        this.isLoading = true;
        this.item.tutores.val = [];
        const data = {
          alumnoId: this.item.AlumnoId.val,
        };

        const response = await axios.post(
          routeAPI + "alumnos/tutoresDeAlumno",
          data
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {
              var tutor = {
                PadreId: element["012PadreId"],
                Nombre: element["012Nombre"],
                ApellidoPaterno: element["012ApellidoPaterno"],
                ApellidoMaterno: element["012ApellidoMaterno"],
              };
              var parentesco = {
                parentesoId: element["016TipoParentescoId"],
                nombre: element["016Nombre"],
              };
              this.item.tutores.val.push({
                tutor: tutor,
                parentesco: parentesco,
              });
            });
          }
        } else
          this.$alert(
            "No se pudo obtenera información, favor de volverlo a intentar."
          );

        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async cancelar(item) {
      try {
        this.isLoading = true;

        const data = {
          alumno: {
            id: item.AlumnoId.val,
            Activo: Number(0),
          },
        };

        const response = await axios.post(
          routeAPI + "alumnos/cancelarAlumno",
          data
        );
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El alumno se canceló correctamente.");
          this.getAlumnos();
        } else {
          console.log(response);
          this.$alert("Sucedio un error, favor de volver a intentarlo.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getAlumnos() {
      try {
        this.isLoading = true;
        this.items = [];
        const filtros = {
          filtro: {},
        };

        if (this.filtros.filtro_nombre != "")
          filtros.filtro.nombre = this.filtros.filtro_nombre;
        if (this.filtros.filtro_apellidoPaterno != "")
          filtros.filtro.apellidoPaterno = this.filtros.filtro_apellidoPaterno;
        if (this.filtros.filtro_apellidoMaterno != "")
          filtros.filtro.apellidoMaterno = this.filtros.filtro_apellidoMaterno;
        if (this.filtros.filtro_curp != "")
          filtros.filtro.curp = this.filtros.filtro_curp;
        if (this.filtros.filtro_numeroDeControl != "")
          filtros.filtro.numeroDeControl = Number(
            this.filtros.filtro_numeroDeControl
          );
        if (this.filtros.filtro_activo != "")
          filtros.filtro.activo = Number(this.filtros.filtro_activo);

        const response = await axios.post(
          routeAPI + "alumnos/alumnos",
          filtros
        );

        if (!response.data.hayError) {
          response.data.response.forEach((element) => {
            this.items.push({
              AlumnoId: {
                val: element["011AlumnoId"],
              },
              Nombre: {
                val: element["011Nombre"],
              },
              NombreCompleto: {
                val:
                  element["011Nombre"] +
                  " " +
                  element["011ApellidoPaterno"] +
                  " " +
                  element["011ApellidoMaterno"],
              },
              ApellidoPaterno: {
                val: element["011ApellidoPaterno"],
              },
              ApellidoMaterno: {
                val: element["011ApellidoMaterno"],
              },
              Curp: {
                val: element["011CURP"],
              },
              FechaNacimiento: {
                val: element["011FechaNacimiento"],
              },
              Genero: {
                val: element["011Genero"],
              },
              NumeroDeControl: {
                val: element["011NumeroDeControl"],
              },
              EscuelaDeProcedenciaId: {
                val: element["015EscuelaDeProcedenciaId"],
              },
              PromedioDeProcedencia: {
                val: element["011PromedioDeProcedencia"],
              },
              Domicilio: {
                val: element["011Domicilio"],
              },
              TipoEstadoAlumno: {
                val: this.estadosAlumno.find(
                  (estado) =>
                    estado.EstadoDeAlumnoId ===
                    Number(element["014TipoEstadoAlumnoId"])
                ),
              },
              Activo: {
                val: element["011Activo"],
              },
            });
          });
        } else {
          console.log(response);
          this.$alert(
            "No se pudo obtenera información, favor de volverlo a intentar."
          );
        }
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getEstadosAlumno() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "catalogo/estadosDeAlumnos",
          filtros
        );

        response.data.response.forEach((element) => {
          this.estadosAlumno.push({
            EstadoDeAlumnoId: element["014TiposEstadoAlumnoId"],
            Nombre: element["014Nombre"],
            Activo: element["014Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    limpiarFiltros() {
      this.filtros.filtro_nombre = "";
      this.filtros.filtro_apellidoPaterno = "";
      this.filtros.filtro_apellidoMaterno = "";
      this.filtros.filtro_curp = "";
      this.filtros.filtro_activo = "-1";
    },
    limpiarVariables() {
      this.item.AlumnoId.val = null;
      (this.item.Nombre.val = ""), (this.item.ApellidoPaterno.val = "");
      this.item.ApellidoMaterno.val = "";
      this.item.Curp.val = "";
      this.item.FechaDeNacimiento.val = new Date().toISOString().slice(0, 10);
      this.item.Genero.val = "-1";
      this.item.NumeroDeControl.val = 0;
      this.item.EscuelaId.val = 0;
      this.item.Promedio.val = 0;
      this.item.Domicilio.val = "";
      this.item.tutores.val = [];
      this.item.parentesco.val = 0;
      this.item.TipoEstadoAlumno.val = true;
    },
  },
};
</script>

<style scoped>
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
