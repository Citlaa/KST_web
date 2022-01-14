<template>
  <div class="container is-max-desktop">
    <div class="col-12" id="Titulo">
      <h1 class="titulo_azul">Grupos</h1>
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
          Limpiar
        </button>
        <button class="button is-primary btn-sm" @click="getGrupos()">
          Buscar
        </button>
      </div>
    </div>
    <div class="col-12" style="margin-bottom:100px;">
      <button
        class="button is-primary mt-5 mb-1 align-left"
        @click="abrirModal('Agregar', null)"
      >
        <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar grupo
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
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <div class="col-11">
                    <h2 class="modal-title text-center">
                      {{ titutoModal }} Grupo
                    </h2>
                    <div class="line_red"></div>
                  </div>
                  <a class="button close_modal" @click="mostrarModal = false">
                    <span aria-hidden="true">&times;</span>
                  </a>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="row container_modal">
                      <div class="col-3 form-group padding-model">
                        <tipos-ciclo-escolar
                          :label="'Ciclo Escolar'"
                          :titulo="true"
                          :tipoDeCicloEscolarId="item.TipoDeCicloEscolarId"
                          v-on:seleccionarCicloEscolarItem="seleccionarCicloEscolarItem($event)"
                          :funcion="'seleccionarCicloEscolarItem'"                          
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
                        />
                      </div>
                      <div class="col-3 form-group padding-model">
                        <label class="activo_label">Activo</label>
                        <select class="form-control" v-model="item.Activo">
                          <option value="-1" selected
                            >Seleccionar Activo</option
                          >
                          <option value="1">Si</option>
                          <option value="0">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="button is-primary"
                    @click="guardarGrupo()"
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
import TiposCicloEscolar from "../Catalogos/Selects/TiposCicloEscolar.vue";
import TiposNivel from "../Catalogos/Selects/TiposNivel.vue";

export default {
  components: { TiposCicloEscolar, TiposNivel },
  data() {
    return {
      isLoading: false,
      ciclosEscolares: [],
      modalidades: [],
      periodos: [],
      tiposDeGrupos: [],
      tiposDeNivel: [],
      tiposDeGrado: [],
      especialidades: [],
      items: [],
      item: {
        EstructuraDeGrupoId: -1,
        TipoDeCicloEscolarId: -1,
        TiposNivelId: -1,
        TipoModalidadId: -1,
        TipoPeriodoId: -1,
        TipoGradoId: -1,
        TipoDeGrupoId: -1,
        TipoEspecialidadId: -1,
        Activo: "-1",
      },
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
      filter: "",
      perPage: 5,
      currentPage: 1,
      mostrarModal: false,
      titutoModal: "",
      mostrarFiltros: true,
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
    };
  },
  created() {
    this.getTipoDeCicloEscolar();
    this.getTiposDeModalidad();
    this.getTiposPeriodo();
    this.getTiposDeGrupo();
    this.getTiposNivel();
    this.getTiposDeGrado();
    this.getEspecialidades();
    // this.getGrupos();
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    async getTipoDeCicloEscolar() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/tiposDeCicloEscolarCatalogo",
          filtros
        );

        response.data.response.forEach((element) => {
          this.ciclosEscolares.push({
            TipoDeCicloEscolarId: element["002TipoDeCicloEscolarId"],
            Nombre:
              element["002AñoDeInicio"] + "-" + element["002AñoDeTermino"],
          });
        });
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
            "No se pudo obtenera información, favor de volverlo a intentar."
          );

        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    seleccionarCicloEscolar: function(element) {
      this.filtros.filtro_cicloEscolar = element;
    },
    seleccionarCicloEscolarItem: function(element) { 
      console.log(element);
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
    abrirModal: function(tipo,item) {
      this.titutoModal = tipo;
      
      if (tipo == "Editar") {
        this.item.EstructuraDeGrupoId = item.EstructuraDeGrupoId;
        this.item.TipoDeCicloEscolarId = item.TipoDeCicloEscolar.TipoDeCicloEscolarId;
        this.item.TiposNivelId = item.TiposNivel.TipoNivelId;
        this.item.TipoModalidadId = item.TipoModalidad.TipoDeModalidadId;
        this.item.TipoPeriodoId = item.TipoPeriodo.TipoPeriodoId;
        this.item.TipoGradoId = item.TipoGrado.TipoGradoId;
        this.item.TipoDeGrupoId = item.TipoDeGrupo.TipoGrupoId;
        this.item.TipoEspecialidadId = item.Especialidad.EspecialidadId;
        this.item.Activo = item.Activo;
      }
      this.mostrarModal = !this.mostrarModal;
    },
    async guardarGrupo() {
      if (this.item.EstructuraDeGrupoId > 0) {
        this.editarGrupo();
      } else {
        this.agregarGrupo();
      }      
    },
    async agregarGrupo() {
      try {
        this.isLoading = true;
        const data = {
          estructuraDeGrupo: {
            EstructuraDeGrupoId: null,
            TipoDeCicloEscolarId: Number(this.item.TipoDeCicloEscolarId),
            TiposNivelId: Number(this.item.TiposNivelId),
            TipoModalidadId: Number(this.item.TipoModalidadId),
            TipoPeriodoId: Number(this.item.TipoPeriodoId),
            TipoGradoId: Number(this.item.TipoGradoId),
            TipoDeGrupoId: Number(this.item.TipoDeGrupoId),
            TipoEspecialidadId: Number(this.item.TipoEspecialidadId),
            Activo: Number(this.item.Activo),
          },
        };
console.log(this.item);
        const response = await axios.post(
          routeAPI + "administracion/guardarEstructurasDeGrupo",
          data
        );

        
        this.isLoading = false;
        if (!response.data.hayError) {
          this.mostrarModal = false;
          this.$alert("El grupo se guardó con éxito.");
          this.limpiarVariables();
          this.getGrupos();
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editarGrupo() {
      try {
        this.isLoading = true;
        const data = {
          estructuraDeGrupo: {
            EstructuraDeGrupoId: this.item.EstructuraDeGrupoId,
            TipoDeCicloEscolarId: Number(this.item.TipoDeCicloEscolarId),
            TiposNivelId: Number(this.item.TiposNivelId),
            TipoModalidadId: Number(this.item.TipoModalidadId),
            TipoPeriodoId: Number(this.item.TipoPeriodoId),
            TipoGradoId: Number(this.item.TipoGradoId),
            TipoDeGrupoId: Number(this.item.TipoDeGrupoId),
            TipoEspecialidadId: Number(this.item.TipoEspecialidadId),
            Activo: Number(this.item.Activo),
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/editarEstructurasDeGrupo",
          data
        );

        
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El grupo se guardó con éxito.");
          this.mostrarModal = false;
          this.limpiarVariables();
          this.getGrupos();
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async cancelar(item) {
      try {
        this.isLoading = true;
        const data = {
          estructuraDeGrupo: {
            EstructuraDeGrupoId: item.EstructuraDeGrupoId,
            Activo: Number(0),
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/cancelarEstructuraDeGrupo",
          data
        );
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El grupo se canceló correctamente.");
          this.getGrupos();
        } else {
          console.log(response);
          this.$alert("Alert Message.");
        }
      } catch (err) {
        console.log(err);
      }
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
        Activo: "-1",
      }
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
  },
};
</script>

<style>
.container_modal {
  margin: 1px;
  padding: 0px 0px 10px 0px;
}

.container_bottom_modal {
  margin: 1px;
  padding: 10px 0px 10px 0px;
}
</style>
