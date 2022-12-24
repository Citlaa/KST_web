<template>
  <div class="container is-max-desktop">
    <div class="col-12" id="Titulo">
      <h1 class="titulo_azul">Lista de grupos</h1>
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
        <div class="row m-1 pb-2">
          <div class="col-3">
            <tiposCicloEscolar
              :key="filtros.key_cicloEscolar"
              :titulo="true"
              :label="'Ciclo Escolar'"
              v-on:seleccionarCicloEscolar="seleccionarCicloEscolar($event)"
              :funcion="'seleccionarCicloEscolar'"
            />
          </div>
          <div class="col-3">
            <tipos-nivel
              :key="filtros.key_nivel"
              :label="'Nivel'"
              :titulo="true"
              :funcion="'seleccionarNivel'"
              @seleccionarNivel="seleccionarNivel($event)"
            />
          </div>
          <div class="col-3">
            <tipos-modalidad
              :key="filtros.key_modalidad"
              :label="'Modalidad'"
              :titulo="true"
              :funcion="'seleccionarTipoModalidad'"
              @seleccionarTipoModalidad="seleccionarTipoModalidad($event)"
            />
          </div>
          <div class="col-3">
            <tipos-periodo
              :key="filtros.key_periodo"
              :label="'Periodo'"
              :titulo="true"
              :funcion="'seleccionarPeriodo'"
              @seleccionarPeriodo="seleccionarPeriodo($event)"
            />
          </div>
        </div>
        <div class="row m-1 pb-1" style="">
          <div class="col-3">
            <tipos-grado
              :key="filtros.key_grado"
              :label="'Grado'"
              :titulo="true"
              :funcion="'seleccionarGrado'"
              @seleccionarGrado="seleccionarGrado($event)"
            />
          </div>
          <div class="col-3">
            <tipos-grupo
              :key="filtros.key_grupo"
              :label="'Grupo'"
              :titulo="true"
              :funcion="'seleccionarGrupo'"
              @seleccionarGrupo="seleccionarGrupo($event)"
            />
          </div>
          <div class="col-3">
            <tipos-especialidad
              :key="filtros.key_especialidad"
              :label="'Especialidad'"
              :titulo="true"
              :funcion="'seleccionarEspecialidad'"
              @seleccionarEspecialidad="seleccionarEspecialidad($event)"
            />
          </div>
          <div class="col-3">
            <label class="activo_label">Activo</label>
            <select class="form-control" v-model="filtros.filtro_activo">
              <option value="-1">Seleccionar Activo</option>
              <option value="1">Si</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>
      </div>
      <div v-if="mostrarFiltros" class="filtro_footer">
        <button class="button is-default btn-sm mr-1" @click="limpiarFiltros()">
          Mostrar Todo
        </button>
        <button class="button is-primary btn-sm" @click="getGrupos()">
          Buscar
        </button>
      </div>
    </div>
    <div class="col-12" style="margin-bottom:100px;">
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
            @blur="currentPage = 1"
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
              :key="data.item.EstructuraDeGrupoId"
              style="cursor: default;"
            >
              <i class="far fa-check-square" style="color: green"> </i>
            </button>
            <button
              class="btn btn-default"
              v-else
              :key="data.item.EstructuraDeGrupoId"
              style="cursor: default;"
            >
              <i class="far fa-times-circle" style="color: red"> </i>
            </button>
          </template>
          <template v-slot:cell(opciones)="data">
            <button
              class="button is-info is-small"
              @click="abrirModal('Lista', data.item)"
              value="Lista"
              title="Ver lista"
            >
              <i class="fa fa-list"></i>
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
                      {{ titutoModal }} de grupo
                    </h2>
                    <div class="line_red"></div>
                  </div>
                  <a class="button close_modal" @click="mostrarModal = false">
                    <span aria-hidden="true">&times;</span>
                  </a>
                </div>
                <div class="modal-body">
                  <div class="row seccion_modal">
                    <div class="row container_modal">
                      <div class="col-12 seccion_titulo_modal">
                        <h3>Datos del grupo</h3>
                      </div>
                      <div class="col-3 form-group padding-model">
                        <tipos-ciclo-escolar
                          :label="'Ciclo Escolar'"
                          :titulo="true"
                          :tipoDeCicloEscolarId="item.TipoDeCicloEscolarId"
                          v-on:seleccionarCicloEscolarItem="
                            seleccionarCicloEscolarItem($event)
                          "
                          :funcion="'seleccionarCicloEscolarItem'"
                          disabled
                        />
                      </div>
                      <div class="col-3 form-group padding-model">
                        <tipos-modalidad
                          :tipoDeModalidadId="item.TipoModalidadId"
                          :key="item.TipoModalidadId"
                          :label="'Modalidad'"
                          :titulo="true"
                          :funcion="'seleccionarTipoModalidadItem'"
                          @seleccionarTipoModalidadItem="
                            seleccionarTipoModalidadItem($event)
                          "
                          disabled
                        />
                      </div>
                      <div class="col-3 form-group padding-model">
                        <tipos-periodo
                          :tipoPeriodoId="item.TipoPeriodoId"
                          :key="item.TipoPeriodoId"
                          :label="'Periodo'"
                          :titulo="true"
                          :funcion="'seleccionarPeriodoItem'"
                          @seleccionarPeriodoItem="
                            seleccionarPeriodoItem($event)
                          "
                          disabled
                        />
                      </div>
                      <div class="col-3 form-group padding-model">
                        <tipos-grupo
                          :tipoDeGrupoId="item.TipoDeGrupoId"
                          :key="item.TipoDeGrupoId"
                          :label="'Grupo'"
                          :titulo="true"
                          :funcion="'seleccionarGrupoItem'"
                          @seleccionarGrupoItem="seleccionarGrupoItem($event)"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="row container_bottom_modal">
                      <div class="col-3 form-group padding-model">
                        <tipos-nivel
                          :tipoNivelId="item.TiposNivelId"
                          :key="item.TiposNivelId"
                          :titulo="true"
                          :label="'Nivel'"
                          :funcion="'seleccionarNivelItem'"
                          @seleccionarNivelItem="seleccionarNivelItem($event)"
                          disabled
                        />
                      </div>
                      <div class="col-3 form-group padding-model">
                        <tipos-grado
                          :tipoDeGradoId="item.TipoGradoId"
                          :key="item.TipoGradoId"
                          :label="'Grado'"
                          :titulo="true"
                          :funcion="'seleccionarGradoItem'"
                          @seleccionarGradoItem="seleccionarGradoItem($event)"
                          disabled
                        />
                      </div>
                      <div class="col-3 form-group padding-model">
                        <tipos-especialidad
                          :TipoEspecialidadId="item.TipoEspecialidadId"
                          :key="item.TipoEspecialidadId"
                          :label="'Especialidad'"
                          :titulo="true"
                          :funcion="'seleccionarEspecialidadItem'"
                          @seleccionarEspecialidadItem="
                            seleccionarEspecialidadItem($event)
                          "
                          disabled
                        />
                      </div>
                      <div class="col-3 form-group padding-model">
                        <label class="activo_label">Activo</label>
                        <select
                          class="form-control"
                          v-model="item.Activo"
                          disabled
                        >
                          <option value="-1" selected
                            >Seleccionar Activo</option
                          >
                          <option value="1">Si</option>
                          <option value="0">No</option>
                        </select>
                      </div>
                    </div>
                    <div class="row container_modal">
                      <div class="col-12 seccion_titulo_modal">
                        <section id="alumnos_div">
                          <div
                            class="row col-12"
                            v-if="this.item.Alumnos.length <= 0"
                            style="display: grid; justify-content: center;"
                          >
                            <p>
                              No se encontraron alumnos
                            </p>
                          </div>
                          <div v-if="this.item.Alumnos.length > 0" class="row">
                            <div class="col-12 seccion_titulo_modal">
                              <h3>Alumnos registrados al grupo</h3>
                            </div>
                            <div class="col-12">                             
                              <div class="col-3 mr-0 align-rigth">
                                <input
                                  class="form-control"
                                  v-model="alumnos_filter"
                                  type="search"
                                  placeholder="Buscar"
                                  @blur="alumnos_currentPage = 1"
                                />
                              </div>
                              <b-table
                                striped
                                hover
                                outlined
                                id="alumnos_table"
                                :items="item.Alumnos"
                                :fields="alumnos_fields"
                                :per-page="alumnos_perPage"
                                :current-page="alumnos_currentPage"
                                :filter="alumnos_filter"
                              ></b-table>
                              <b-pagination
                                v-model="alumnos_currentPage"
                                :total-rows="alumnos_rows"
                                :per-page="alumnos_perPage"
                              ></b-pagination>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="button is-primary"
                    @click="descargarLista()"
                  >
                    Descargar
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="mostrarModal = false"
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
    <div id="pdf_dev" v-show="false">
      <div id="app" ref="document">
        <div id="element-to-convert">
          <div id="header" class="row">
            <div class="logo col-3">
              <img
                src="@/assets/logo.png"
                id="icon"
                alt="User Icon"
                style="max-width: 150px"
              />
            </div>
            <div class="col-7 text-align">
              <h1 style="text-align:center; font-size:120%; font-weight:bold; margin-bottom:10px">
                Instituto Víctor Manuel Castelazo Muriel
              </h1>
              <h1 style="text-align:center;">Grupo {{item.TipoGrado}}° {{item.TipoDeGrupo}}</h1>
              <!-- //Grado grupo -->
              <h1 style="text-align:center;">{{item.TiposNivel}} {{item.TipoModalidad}}</h1>
              <!-- //Nivel Modalidad Especialidad -->
              <h1 style="text-align:center;">{{item.TipoEspecialidad}} {{item.TipoDeCicloEscolar}} </h1>
              <!-- //Especialidad Ciclo -->
            </div>
          </div>
          <div id="alumnos_tabla" style="margin-top: 15px">
            <table class="table table-hover striped ">
              <thead>
                <tr>
                  <th style="text-align:center;">Folio</th>
                  <th style="text-align:center;">Nombre</th>
                  <th style="text-align:center;">Apellido Paterno</th>
                  <th style="text-align:center;">Apellido Materno</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="alumno in item.Alumnos" :key="alumno.AlumnoId.val">
                  <td style="text-align:center;">{{ alumno.AlumnoId.val }}</td>
                  <td style="text-align:center;">{{ alumno.Nombre.val }}</td>
                  <td style="text-align:center;">{{ alumno.ApellidoPaterno.val }}</td>
                  <td style="text-align:center;">{{ alumno.ApellidoMaterno.val }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colspan="3" style="text-align:center;">Número total de alumnos</th>
                  <td colspan="1">77</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <cargando v-if="isLoading"></cargando>
  </div>
</template>
<script>
import axios from "axios";
import routeAPI from "@/js/api";
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      isLoading: false,
      mostrarFiltros: true,
      ciclosEscolares: [],
      modalidades: [],
      periodos: [],
      tiposDeGrupos: [],
      tiposDeNivel: [],
      tiposDeGrado: [],
      especialidades: [],
      estadosAlumno: [],
      filtros: {
        filtro_cicloEscolar: "",
        key_cicloEscolar: 0,
        filtro_nivel: "",
        key_nivel: 0,
        filtro_modalidad: "",
        key_modalidad: 0,
        filtro_periodo: "",
        key_periodo: 0,
        filtro_grado: "",
        key_grado: 0,
        filtro_grupo: "",
        key_grupo: 0,
        filtro_especialidad: "",
        key_especialidad: 0,
        filtro_activo: "-1",
      },
      items: [],
      item: {
        Alumnos: [],
      },
      filter: "",
      perPage: 5,
      currentPage: 1,
      mostrarModal: false,
      fields: [
        {
          key: "EstructuraDeGrupoId",
          label: "Folio",
          sortable: true,
        },
        {
          key: "TipoDeCicloEscolar.Nombre",
          label: "Ciclo Escolar",
          sortable: true,
        },
        {
          key: "TipoModalidad.Nombre",
          label: "Modalidad",
          sortable: true,
        },
        {
          key: "TipoPeriodo.Nombre",
          label: "Periodo",
        },
        {
          key: "TipoDeGrupo.Nombre",
          label: "Grupo",
          sortable: true,
        },
        {
          key: "TiposNivel.Nombre",
          label: "Nivel",
          sortable: true,
        },
        {
          key: "TipoGrado.Nombre",
          label: "Grado",
          sortable: true,
        },
        {
          key: "Especialidad.Nombre",
          label: "Especialidad",
          sortable: true,
        },
        {
          label: "Activo",
          key: "Activo",
        },
        {
          label: "Opciones",
          key: "opciones",
        },
      ],
      alumnos_fields: [
        {
          key: "AlumnoId.val",
          label: "Folio",
          sortable: true,
        },
        {
          key: "Nombre.val",
          label: "Nombre",
          sortable: true,
        },
        {
          key: "ApellidoPaterno.val",
          label: "Apellido Paterno",
          sortable: true,
        },
        {
          key: "ApellidoMaterno.val",
          label: "Apellido Materno",
          sortable: true,
        },
        {
          key: "TipoEstadoAlumno.val.Nombre",
          label: "Estatus",
          sortable: true,
        },
      ],
      alumnos_perPage: 10,
      alumnos_currentPage: 1,
      alumnos_filter: "",
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
    alumnos_rows() {
      return this.item.Alumnos.length;
    },
  },
  created() {
    this.getTipoDeCicloEscolar();
    this.getTiposDeModalidad();
    this.getTiposPeriodo();
    this.getTiposDeGrupo();
    this.getTiposNivel();
    this.getTiposDeGrado();
    this.getEspecialidades();
    this.getEstadosAlumno();
  },
  methods: {
    async descargarLista() {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 10,
        html2canvas:  { scale: 2 },
        filename: "listaGrupo" +  this.item.TiposNivel + this.item.TipoGrado + this.item.TipoDeGrupo + ".pdf",
      });
    },
    async getTipoDeCicloEscolar() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {},
        };

        const response = await axios.post(
          routeAPI + "administracion/tiposDeCicloEscolarCatalogo",
          filtros
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {
              this.ciclosEscolares.push({
                TipoDeCicloEscolarId: element["002TipoDeCicloEscolarId"],
                Nombre:
                  element["002AñoDeInicio"] + "-" + element["002AñoDeTermino"],
              });
            });
          }
        } else {
          console.log(response);
          this.$alert(
            "No se pudo obtener información, favor de volverlo a intentar."
          );
        }
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getTiposDeModalidad() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "catalogo/tiposDeModalidad",
          filtros
        );

        response.data.response.forEach((element) => {
          this.modalidades.push({
            TipoDeModalidadId: element["004TipoModalidadId"],
            Nombre: element["004Nombre"],
            Activo: element["004Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getTiposPeriodo() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "catalogo/tiposPeriodo",
          filtros
        );

        response.data.response.forEach((element) => {
          this.periodos.push({
            TipoPeriodoId: element["005TipoPeriodoId"],
            Nombre: element["005Nombre"],
            Activo: element["005Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getTiposDeGrupo() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "catalogo/tiposDeGrupo",
          filtros
        );

        response.data.response.forEach((element) => {
          this.tiposDeGrupos.push({
            TipoGrupoId: element["006TipoDeGrupoId"],
            Nombre: element["006Nombre"],
            Activo: element["006Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getTiposNivel() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "catalogo/tiposNivel",
          filtros
        );

        response.data.response.forEach((element) => {
          this.tiposDeNivel.push({
            TipoNivelId: element["007TiposNivelId"],
            Nombre: element["007Nombre"],
            Activo: element["007Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getTiposDeGrado() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "catalogo/tiposGrado",
          filtros
        );

        response.data.response.forEach((element) => {
          this.tiposDeGrado.push({
            TipoGradoId: element["008TipoGradoId"],
            Nombre: element["008Nombre"],
            Activo: element["008Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getEspecialidades() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "catalogo/especialidades",
          filtros
        );

        response.data.response.forEach((element) => {
          this.especialidades.push({
            EspecialidadId: element["009TipoEspecialidadId"],
            Nombre: element["009Nombre"],
            Activo: element["009Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getGrupos() {
      try {
        this.isLoading = true;
        this.limpiarVariables();
        const filtros = {
          filtro: {},
        };

        if (this.filtros.filtro_cicloEscolar != "")
          filtros.filtro.cicloEscolar = this.filtros.filtro_cicloEscolar;
        if (this.filtros.filtro_nivel != "")
          filtros.filtro.nivel = Number(this.filtros.filtro_nivel);
        if (this.filtros.filtro_modalidad != "")
          filtros.filtro.modalidad = Number(this.filtros.filtro_modalidad);
        if (this.filtros.filtro_periodo != "")
          filtros.filtro.periodo = Number(this.filtros.filtro_periodo);
        if (this.filtros.filtro_grado != "")
          filtros.filtro.grado = Number(this.filtros.filtro_grado);
        if (this.filtros.filtro_grupo != "")
          filtros.filtro.grupo = Number(this.filtros.filtro_grupo);
        if (this.filtros.filtro_especialidad != "")
          filtros.filtro.especialidad = Number(
            this.filtros.filtro_especialidad
          );
        if (this.filtros.filtro_activo != "")
          filtros.filtro.activo = Number(this.filtros.filtro_activo);

        const response = await axios.post(
          routeAPI + "administracion/estructurasDeGrupo",
          filtros
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {
              this.items.push({
                EstructuraDeGrupoId: element["010EstructuraDeGrupoId"],
                TipoDeCicloEscolar: this.ciclosEscolares.find(
                  (ciclo) =>
                    ciclo.TipoDeCicloEscolarId ===
                    Number(element["002TipoDeCicloEscolarId"])
                ),
                TipoModalidad: this.modalidades.find(
                  (modalidad) =>
                    modalidad.TipoDeModalidadId ===
                    Number(element["004TipoModalidadId"])
                ),
                TipoPeriodo: this.periodos.find(
                  (per) =>
                    per.TipoPeriodoId === Number(element["005TipoPeriodoId"])
                ),
                TipoDeGrupo: this.tiposDeGrupos.find(
                  (grupo) =>
                    grupo.TipoGrupoId === Number(element["006TipoDeGrupoId"])
                ),
                TiposNivel: this.tiposDeNivel.find(
                  (nivel) =>
                    nivel.TipoNivelId === Number(element["007TiposNivelId"])
                ),
                TipoGrado: this.tiposDeGrado.find(
                  (grado) =>
                    grado.TipoGradoId === Number(element["008TipoGradoId"])
                ),
                Especialidad: this.especialidades.find(
                  (especialidad) =>
                    especialidad.EspecialidadId ===
                    Number(element["009TipoEspecialidadId"])
                ),
                Activo: element["010Activo"],
              });
            });
          }
        } else
          this.$alert(
            "No se pudo obtener información, favor de volverlo a intentar."
          );

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
    seleccionarCicloEscolar: function(element) {
      this.filtros.filtro_cicloEscolar = element;
    },
    seleccionarCicloEscolarItem: function(element) {
      this.item.TipoDeCicloEscolarId = element;
    },
    seleccionarTipoModalidad: function(element) {
      this.filtros.filtro_modalidad = element;
    },
    seleccionarTipoModalidadItem: function(element) {
      this.item.TipoModalidadId = element;
    },
    seleccionarNivel: function(element) {
      this.filtros.filtro_nivel = element;
    },
    seleccionarNivelItem: function(element) {
      this.item.TiposNivelId = element;
    },
    seleccionarPeriodo: function(element) {
      this.filtros.filtro_periodo = element;
    },
    seleccionarPeriodoItem: function(element) {
      this.item.TipoPeriodoId = element;
    },
    seleccionarGrado: function(element) {
      this.filtros.filtro_grado = element;
    },
    seleccionarGradoItem: function(element) {
      this.item.TipoGradoId = element;
    },
    seleccionarGrupo: function(element) {
      this.filtros.filtro_grupo = element;
    },
    seleccionarGrupoItem: function(element) {
      this.item.TipoDeGrupoId = element;
    },
    seleccionarEspecialidad: function(element) {
      this.filtros.filtro_especialidad = element;
    },
    seleccionarEspecialidadItem: function(element) {
      this.item.TipoEspecialidadId = element;
    },
    limpiarVariables: function() {
      this.items = [];

      this.item = {
        EstructuraDeGrupoId: -1,
        TipoDeCicloEscolarId: -1,
        TiposNivelId: -1,
        TipoModalidadId: -1,
        TipoPeriodoId: -1,
        TipoGradoId: -1,
        TipoDeGrupoId: -1,
        TipoEspecialidadId: -1,
        Alumnos: [],
        Activo: "-1",
      };
    },
    limpiarFiltros() {
      this.filtros.filtro_cicloEscolar = "";
      this.filtros.filtro_nivel = "";
      this.filtros.filtro_modalidad = "";
      this.filtros.filtro_periodo;
      this.filtros.filtro_grado = "";
      this.filtros.filtro_grupo = "";
      this.filtros.filtro_especialidad = "";
      this.filtros.filtro_activo = "-1";

      this.filtros.key_cicloEscolar++;
      this.filtros.key_nivel++;
      this.filtros.key_modalidad++;
      this.filtros.key_periodo++;
      this.filtros.key_grado++;
      this.filtros.key_grupo++;
      this.filtros.key_especialidad++;
      this.getGrupos();
    },
    abrirModal: function(tipo, item) {
      this.titutoModal = tipo;
      this.limpiarVariables();

      this.item.EstructuraDeGrupoId = item.EstructuraDeGrupoId;
      this.item.TipoDeCicloEscolarId =
        item.TipoDeCicloEscolar.TipoDeCicloEscolarId;
       this.item.TipoDeCicloEscolar =
        item.TipoDeCicloEscolar.Nombre;
      this.item.TiposNivelId = item.TiposNivel.TipoNivelId;
      this.item.TiposNivel = item.TiposNivel.Nombre;
      this.item.TipoModalidadId = item.TipoModalidad.TipoDeModalidadId;
      this.item.TipoModalidad = item.TipoModalidad.Nombre;
      this.item.TipoPeriodoId = item.TipoPeriodo.TipoPeriodoId;
      this.item.TipoPeriodo = item.TipoPeriodo.Nombre;
      this.item.TipoGradoId = item.TipoGrado.TipoGradoId;
      this.item.TipoGrado = item.TipoGrado.Nombre;
      this.item.TipoDeGrupoId = item.TipoDeGrupo.TipoGrupoId;
      this.item.TipoDeGrupo = item.TipoDeGrupo.Nombre;
      this.item.TipoEspecialidadId = item.Especialidad.EspecialidadId;
      this.item.TipoEspecialidad = item.Especialidad.Nombre;
      this.item.Activo = item.Activo;
      this.item.Alumnos = [];
      this.getAlumnosDeGrupo();
    },
    async getAlumnosDeGrupo() {
      try {
        this.isLoading = true;
        const data = {
          data: {
            EstructuraDeGrupoId: this.item.EstructuraDeGrupoId,
          },
        };

        const response = await axios.post(
          routeAPI + "reportes/alumnosDeGrupo",
          data
        );

        this.isLoading = false;
        if (!response.data.hayError) {
          this.isLoading = false;

          response.data.response.forEach((element) => {
            this.item.Alumnos.push({
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
              EstructuraGrupo: {
                val: element["010EstructuraDeGrupoId"],
              },
              Activo: Number(element["011Activo"]),
            });
          });
          this.mostrarModal = !this.mostrarModal;
        } else {
          console.log(response);
          this.$alert(
            "No se pudieron obtener los alumnos, favor de volver a intentar."
          );
        }
      } catch (err) {
        console.log(err);
      }
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

#app {
  margin-top: 100px;
  text-align: center;
}

#icon {
  width: 60%;
}

.logo {
  text-align: left;
}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #000;
}

tbody tr:nth-child(odd) {
  background-color: #dbdbdb;
}

tbody tr:nth-child(even) {
  background-color: #fff;
}

tfoot {
  border-top: 3px solid #000;
}
</style>
