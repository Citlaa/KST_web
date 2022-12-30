<template>
  <div class="container is-max-desktop">
    <div class="col-12" id="Titulo">
      <h1 class="titulo_azul">Control de pagos</h1>
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
            Mostrar Todo
          </button>
          <button class="button is-primary btn-sm" @click="getAlumnos()">
            Buscar
          </button>
        </div>
      </div>
    </section>
    <br />
    <section id="alumnos_list">
      <div
        class="row col-12"
        v-if="alumnos_items.length <= 0"
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
          :items="alumnos_items"
          :fields="alumnos_fields"
          :per-page="alumnos_perPage"
          :current-page="alumnos_currentPage"
          :filter="alumnos_filter"
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
            <input type="radio" 
              v-model="alumno_selected" 
              name="alumno_selected" 
              @change="seleccionarAlumno(data)" :key="data.AlumnoId" />
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
        ></b-pagination>
      </div>
    </section>
    <section id="data_alumnos" v-if="mostrarAlumno">
      <div class="row col-12 seccion_data" style="margin-top: 65px;">
        <div class="col-12 seccion_titulo_first">
          <h3>Datos del alumno</h3>
        </div>
        <div class="col-4 form-group padding-model">
          <label>Nombre</label>
          <input
            type="text"
            class="form-control"
            v-model="alumno_item.Nombre"
            :disabled="true"
          />
        </div>
        <div class="col-4 form-group padding-model">
          <label>Apellido Paterno</label>
          <input
            type="text"
            class="form-control"
            v-model="alumno_item.ApellidoPaterno"
            :disabled="true"
          />
        </div>
        <div class="col-4 form-group padding-model">
          <label>Apellido Materno</label>
          <input
            type="text"
            class="form-control"
            v-model="alumno_item.ApellidoMaterno"
            :disabled="true"
          />
        </div>
        <div class="col-4 form-group padding-model">
          <label>CURP</label>
          <input
            type="text"
            class="form-control"
            v-model="alumno_item.Curp"
            :disabled="true"
          />
        </div>
        <div class="col-4 form-group padding-model">
          <label>Número de control</label>
          <input
            type="number"
            class="form-control"
            v-model="alumno_item.NumeroDeControl"
            :disabled="true"
          />
        </div>
        <div class="col-4 form-group padding-model">
          <label>Grupo</label>
          <input
            type="text"
            class="form-control"
            v-model="alumno_item.Grupo"
            :disabled="true"
          />
        </div>
        <div class="col-12 seccion_titulo">
          <h1>Historial de pagos</h1>
        </div>
        <div id="table_pagos">
          <div class="col-12" style="margin-bottom:100px;">
            <button
              class="button is-primary mt-5 mb-1 align-left"
              @click="abrirModal('Agregar', true)"
            >
              <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar pago
            </button>
            <br />
            <div
              class="row col-12"
              v-if="pagos_items.length <= 0"
              style="display: grid; justify-content: center;"
            >
              <p>No se encontraron pagos</p>
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
                :items="pagos_items"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"
              >
                <template v-slot:cell(Activo)="data">
                  <button
                    class="btn btn-default"
                    v-if="data.item.Activo == 1"
                    :key="data.item.PagoId"
                    style="cursor: default;"
                  >
                    <i class="far fa-check-square" style="color: green"></i>
                  </button>
                  <button
                    class="btn btn-default"
                    v-else
                    :key="data.item.PagoId"
                    style="cursor: default;"
                  >
                    <i class="far fa-times-circle" style="color: red"></i>
                  </button>
                </template>
                <template v-slot:cell(opciones)="data">
                  <button
                    class="button is-default is-small"
                    @click="abrirModal('Ver', false, data.item)"
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
                        {{ titutoModal }} tipo de pago
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
                        <div class="row"></div>
                        <div class="row seccion_modal">
                          <div class="col-3 form-group padding-model">
                            <tipos-pago
                              :key="pago_item.TipoDePago.key"
                              :titulo="true"
                              :label="'Tipo de pago*'"
                              :disabled="!inhabilitar"
                              :tipoDePagoId="
                                pago_item.TipoDePago.val.TipoDePagoId
                              "
                              :TipoDeCicloEscolarId="
                                pago_item.TipoDePago.tipoDeCicloEscolar > 0
                                  ? pago_item.TipoDePago.tipoDeCicloEscolar
                                  : null
                              "
                              v-on:seleccionarTipoDePago="
                                seleccionarTipoDePago($event)
                              "
                              :funcion="'seleccionarTipoDePago'"
                            />
                            <p
                              v-if="!pago_item.TipoDePago.isValid"
                              style="color: red"
                            >
                              Favor de ingresar tipo de pago
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-3 form-group padding-model">
                            <label>Cantidad*</label>
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                              </div>
                              <input
                                type="text"
                                class="form-control"
                                v-model="cantidadTipoPago"
                                :disabled="!inhabilitar"
                                @blur="limpiarValidez('TipoDePago')"
                              />
                              <div class="input-group-append">
                                <button
                                  class="btn btn-outline-secondary"
                                  type="button"
                                  @click="actualizarCantidadTotal()"
                                  :disabled="!inhabilitar"
                                >
                                  <i class="fas fa-redo"></i>
                                </button>
                              </div>
                              <p
                                v-if="!pago_item.TipoDePago.isValid"
                                style="color: red"
                              >
                                Favor de ingresar cantidad
                                <i
                                  class="far fa-times-circle"
                                  style="color: red"
                                ></i>
                              </p>
                            </div>
                          </div>
                          <div class="col-3">
                            <TiposCicloEscolar
                              :key="pago_item.CicloEscolar.key"
                              :titulo="true"
                              :label="'Ciclo Escolar*'"
                              :actual="true"
                              :disabled="!inhabilitar"
                              :tipoDeCicloEscolarId="
                                pago_item ? pago_item.CicloEscolar.val : -1
                              "
                              v-on:seleccionarCicloEscolar="
                                seleccionarCicloEscolar($event)
                              "
                              :funcion="'seleccionarCicloEscolar'"
                            />
                            <p
                              v-if="!pago_item.CicloEscolar.isValid"
                              style="color: red"
                            >
                              Favor de ingresar ciclo escolar
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-3 form-group padding-model">
                            <label>Fecha de pago*</label>
                            <input
                              type="date"
                              class="form-control"
                              :disabled="!inhabilitar"
                              v-model="pago_item.FechaDePago.val"
                            />
                          </div>
                        </div>
                      </section>
                      <section>
                        <div class="row seccion_modal">
                          <div class="col-12 seccion_titulo_modal">
                            <h3>Recargos</h3>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <tipos-recargos
                              :key="
                                recargo_item.TipoRecargo.val.TipoDeRecargoId
                              "
                              :label="'Recargo'"
                              :titulo="true"
                              :disabled="!inhabilitar"
                              :tipoDeRecargoId="
                                pago_item
                                  ? recargo_item.TipoRecargo.val.TipoDeRecargoId
                                  : -1
                              "
                              @seleccionarTipoDeRecargo="
                                seleccionarTipoDeRecargo($event)
                              "
                              :funcion="'seleccionarTipoDeRecargo'"
                            ></tipos-recargos>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Monto*</label>
                            <input
                              type="text"
                              class="form-control"
                              :value="currencyFormat(recargo_item.Monto.val)"
                              :key="recargo_item.Monto.val"
                              :disabled="
                                mostrarEditarRecargo.desabledMonto ||
                                  !inhabilitar
                              "
                            />
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Fecha límite*</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="recargo_item.Fecha.val"
                              :disabled="!inhabilitar"
                            />
                          </div>
                          <div
                            class="modal-footer"
                            style="border: 0px;"
                            v-if="mostrarEditarRecargo.displayBtn"
                          >
                            <button
                              v-show="mostrarEditarRecargo.displayRecargoBtn"
                              type="button"
                              class="button"
                              @click="mostrarEditarRecargo.quienAutoriza = true"
                            >
                              Editar recargo
                            </button>
                            <button
                              type="button"
                              class="button is-primary"
                              @click="agregarRecargo"
                            >
                              Agregar recargo
                            </button>
                          </div>
                          <div
                            class="col-12 form-group padding-model"
                            v-if="mostrarEditarRecargo.quienAutoriza"
                          >
                            <usuarios
                              :key="recargo_item.Autoriza.val"
                              :label="'Quien autoriza*'"
                              :titulo="true"
                              :usuarioId="recargo_item.Autoriza.val"
                              :disabled="!inhabilitar"
                              @seleccionarTipoDeRecargo="
                                seleccionarUsuario($event)
                              "
                              :funcion="'seleccionarTipoDeRecargo'"
                            >
                            </usuarios>
                          </div>
                          <section id="data_table">
                            <br />
                            <div class="col-12 form-group padding-model">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>Concepto</th>
                                    <th>Cantidad</th>
                                    <th>Días de retraso</th>
                                    <th>Total a pagar</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="item in itemsRecargo"
                                    :key="item.Id"
                                  >
                                    <td>{{ item.TipoRecargo.Nombre }}</td>
                                    <td>{{ currencyFormat(item.Monto) }}</td>
                                    <td>{{ item.DiasRetraso }}</td>
                                    <td>${{ item.TotalAPagar }}</td>
                                    <td>
                                      <button
                                        class="btn btn-default"
                                        @click="eliminarRecargo(item)"
                                        v-show="inhabilitar"
                                      >
                                        <i class="fas fa-trash-alt"></i>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Pago</td>
                                    <td>
                                      ${{
                                        currencyFormat(
                                          this.pago_item.TipoDePago.val.Monto
                                        )
                                      }}
                                    </td>
                                    <td>{{}}</td>
                                    <td>
                                      ${{
                                        currencyFormat(
                                          this.pago_item.TipoDePago.val.Monto
                                        )
                                      }}
                                    </td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </section>
                          <section id="data_total">
                            <br />
                            <div class="col-12 seccion_total_modal">
                              <label>Total</label>
                              <label style="float: right;"
                                >${{
                                  currencyFormat(pago_item.Cantidad.val)
                                }}</label
                              >
                            </div>
                          </section>
                        </div>
                      </section>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="button is-primary"
                      v-if="inhabilitar"
                      @click="guardarPago()"
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
    <base-dialog :show="!!error" :title="'Log in'" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
  </div>
</template>

<script>
import axios from "axios";
import routeAPI from "@/js/api";
import Enum from "@/js/enum";
import TiposCicloEscolar from "../Catalogos/Selects/TiposCicloEscolar.vue";
import TiposPago from "../Catalogos/Selects/TiposPagos.vue";
import TiposRecargos from "../../components/Catalogos/Selects/TiposRecargos.vue";
import moment from "moment";

export default {
  components: {
    TiposCicloEscolar,
    TiposPago,
    TiposRecargos,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      mostrarFiltros: true,
      mostrarModal: false,
      mostrarEditarRecargo: {
        displayRecargoBtn: true,
        displayBtn: false,
        quienAutoriza: false,
        desabledMonto: true,
      },
      titutoModal: "",
      filtros: {
        filtro_nombre: "",
        filtro_apellidoPaterno: "",
        filtro_apellidoMaterno: "",
        filtro_curp: "",
        filtro_numeroDeControl: "",
        filtro_activo: "-1",
      },
      inhabilitar: true,
      perPage: 5,
      alumnos_perPage: 10,
      currentPage: 1,
      alumnos_currentPage: 1,
      pagos_items: [],
      alumnos_items:[],
      filter: "",
      alumnos_filter: "",
      itemsRecargo: [],
      estadosAlumno: [],
      alumno_selected:{},
      fields: [
        {
          key: "PagoId",
          label: "Folio",
          sortable: true,
        },
        {
          key: "TipoDePago",
          label: "Tipo de pago",
          sortable: true,
        },
        {
          key: "Monto",
          label: "Cantidad",
          sortable: true,
        },
        {
          key: "FechaPago",
          label: "Fecha de pago",
          sortable: true,
        },
        {
          label: "Opciones",
          key: "opciones",
        },
      ],
      alumnos_fields:[
        {
          label: "",
          key: "opciones",
        },
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
          sortable: true,
        },
        {
          key: "TipoEstadoAlumno.val.Nombre",
          label: "Estado",
          sortable: true,
        },
        {
          key: "Activo",
          label: "Activo",
          sortable: true,
        },      
      ],
      alumno_item: {
        AlumnoId: "",
        Nombre: "",
        ApellidoPaterno: "",
        ApellidoMaterno: "",
        Curp: "",
        Genero: "",
        NumeroDeControl: 0,
        Grupo: "",
      },
      pago_item: {
        FechaDePago: {
          val: moment().format("yyyy-MM-DD"),
          isValid: true,
        },
        CicloEscolar: {
          val: null,
          isValid: true,
          key: "",
        },
        PagoId: {
          val: null,
          isValid: true,
        },
        TipoDePago: {
          key: "",
          val: {
            TipoDePagoId: 0,
            Monto: 0,
          },
          isValid: true,
          tipoDeCicloEscolar: -1,
        },
        Cantidad: {
          val: 0,
          isValid: true,
        },
        Recargos: [],
      },
      recargo_item: {
        TipoRecargo: {
          val: {
            TipoDeRecargoId: 0,
          },
          isValid: true,
        },
        Monto: {
          val: 0,
          isValid: true,
        },
        Fecha: {
          val: moment(
            moment()
              .add(1, "M")
              .month() +
              "-5-" +
              moment().year()
          ).format("yyyy-MM-DD"),
          isValid: true,
        },
        Autoriza: {
          val: null,
          isValid: true,
        },
        TotalAPagar: 0,
        DiasRetraso: 0,
      },
      indexRecargos: 0,
      cantidadTipoPago: 0,
      newCantidadTipoPago: 0,
      mostrarAlumno: false,
    };
  },
  computed: {
    rows() {
      return this.pagos_items.length;
    },
  },
  watch: {
    cantidadTipoPago(newValue) {
      this.newCantidadTipoPago = newValue;
    },
  },
  created() {
    this.getEstadosAlumno();
  },
  methods: {
    seleccionarAlumno(data){
      this.alumno_selected = data;
      this.getAlumnoConPagos();
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
    actualizarCantidadTotal() {
      this.pago_item.Cantidad.val -= this.pago_item.TipoDePago.val.Monto;
      this.pago_item.Cantidad.val += Number(this.newCantidadTipoPago);
      this.pago_item.TipoDePago.val.Monto = this.newCantidadTipoPago;
    },
    async guardarPago() {
      this.actualizarCantidadTotal();
      this.validarPago();
      if (this.itemIsValid) {
        this.pago_item.Recargos = this.itemsRecargo;
        if (this.pago_item.PagoId && this.pago_item.PagoId.val > 0)
          this.editarPago();
        //Editar pago
        else this.agregarPago(); //Guardar pago
      } else {
        this.$alert("Favor de completar los datos.");
      }
    },
    validarPago() {
      this.itemIsValid = true;

      if (
        this.$store.getters.userId <= 0 ||
        this.$store.getters.userId == undefined
      ) {
        this.$router.push({ name: "Login" });
      }

      if (this.pago_item.TipoDePago.val.TipoDePagoId <= 0) {
        this.pago_item.TipoDePago.isValid = false;
        this.itemIsValid = false;
      }

      if (
        this.pago_item.TipoDePago.val.Monto <= 0 ||
        this.pago_item.TipoDePago.val.Monto == ""
      ) {
        this.pago_item.TipoDePago.isValid = false;
        this.itemIsValid = false;
      }

      if (
        this.pago_item.CicloEscolar.val <= 0 ||
        this.pago_item.TipoDePago.val.Monto == null
      ) {
        this.pago_item.CicloEscolar.isValid = false;
        this.itemIsValid = false;
      }

      if (this.pago_item.Cantidad.val <= 0) {
        this.itemIsValid = false;
      }
    },
    async editarPago() {
      const data = {
        pago: {
          PagoId: this.pago_item.PagoId.val,
          FechaPago: this.pago_item.FechaDePago.val,
          Monto: this.pago_item.Cantidad.val,
          TipoDePagoId: this.pago_item.TipoDePago.val.TipoDePagoId,
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
          routeAPI + "administracion/editarPago",
          data
        );

        this.isLoading = false;

        if (!response.data.hayError) {
          this.mostrarModal = false;
          console.log("El pago se editó con éxito.");
          if (this.pago_item.Recargos.length > 0) {
            this.guardarRecargos(this.pago_item.PagoId.val);
          }
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async guardarRecargos(pagoId) {
      try {
        // eliminar recargos del pago
        const data = {
          pagoId: pagoId,
        };

        const responseDelete = await axios.post(
          routeAPI + "administracion/eliminarRecargosDelPago",
          data
        );

        if (!responseDelete.data.hayError) {
          console.log("Los recargos se eliminaron con éxito.");
        } else {
          console.log(responseDelete);
          this.$alert(
            "Los recargos no se pudieron eliminar, favor de volverlo a intentar."
          );
          return;
        }

        this.pago_item.Recargos.forEach(async (recargo) => {
          const data = {
            recargo: {
              PagoId: pagoId,
              Monto:
                typeof recargo.Monto == "string"
                  ? Number(recargo.Monto.split("$")[1])
                  : recargo.Monto,
              TipoDeRecargoId: recargo.TipoRecargo.Id,
              DiasRetraso: recargo.DiasRetraso,
              TotalAPagar: recargo.TotalAPagar,
              UsuarioId_Autoriza: recargo.UsuarioId_Autoriza,
              UsuarioId: this.$store.getters.userId,
              Activo: Enum.EstatusGeneral.Activo,
            },
          };

          this.agregarRecargoBD(data);
        });
      } catch (err) {
        console.log(err);
      }
    },
    async agregarPago() {
      const data = {
        pago: {
          FechaPago: this.pago_item.FechaDePago.val,
          Monto: this.pago_item.Cantidad.val,
          TipoDePagoId: this.pago_item.TipoDePago.val.TipoDePagoId,
          FechaRegistro: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          AlumnoId: this.alumno_item.AlumnoId,
          UsuarioId: this.$store.getters.userId,
          Activo: Enum.EstatusGeneral.Activo,
        },
      };

      try {
        this.isLoading = true;

        const response = await axios.post(
          routeAPI + "administracion/agregarPago",
          data
        );

        if (!response.data.hayError) {
          this.mostrarModal = false;
          console.log("El pago se guardó con éxito.");

          if (this.pago_item.Recargos.length > 0) {
            this.guardarRecargos(response.data.response.insertId);
          } else {
            this.$alert("El pago se guardó con éxito.");
            this.getAlumnoConPagos();
          }
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }

        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async agregarRecargoBD(data) {
      try {
        const responseDelete = await axios.post(
          routeAPI + "administracion/agregarRecargo",
          data
        );

        if (!responseDelete.data.hayError) {
          console.log("El recargo se guardó con éxito.");
          this.$alert("El pago y recargo(s) se guardaron con éxito.");
          this.getAlumnoConPagos();
        } else {
          console.log(responseDelete);
          this.$alert(
            "El recargo no se pudo agregar, favor de volverlo a intentar."
          );
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
    currencyFormat(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    eliminarRecargo(item) {
      const index = this.itemsRecargo.indexOf(
        this.itemsRecargo.find((i) => i.Id === item.Id)
      );
      this.pago_item.Cantidad.val -= Number(item.Monto.split("$")[1]);
      this.itemsRecargo.splice(index, 1);
    },
    async agregarRecargo() {
      await this.calcularTotal();
      this.mostrarEditarRecargo.quienAutoriza = true;

      this.itemsRecargo.push({
        Id: this.indexRecargos,
        TipoRecargo: {
          Id: this.recargo_item.TipoRecargo.val.TipoDeRecargoId,
          Nombre: this.recargo_item.TipoRecargo.val.Nombre,
        },
        Monto: this.recargo_item.TipoRecargo.val.Monto,
        DiasRetraso: this.recargo_item.DiasRetraso,
        TotalAPagar: this.recargo_item.TotalAPagar,
        UsuarioId_Autoriza: this.recargo_item.Autoriza.val,
      });

      this.indexRecargos++;
      this.limpiarRecargo();
    },
    async calcularTotal() {
      var diasRetraso = Math.trunc(
        (new Date().getTime() -
          new Date(this.recargo_item.Fecha.val).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      this.recargo_item.DiasRetraso = diasRetraso;
      this.recargo_item.TotalAPagar =
        diasRetraso * Number(this.recargo_item.Monto.val.split("$")[1]);
      this.pago_item.Cantidad.val += this.recargo_item.TotalAPagar;
    },
    limpiarRecargo() {
      this.recargo_item.TipoRecargo.val = { TipoDeRecargoId: 0 };
      this.recargo_item.Monto.val = 0;
      this.recargo_item.Fecha.val = moment(
        moment()
          .add(1, "M")
          .month() +
          "-5-" +
          moment().year()
      ).format("yyyy-MM-DD");
      this.recargo_item.Autoriza.val = null;
      this.recargo_item.TotalAPagar = 0;
      this.recargo_item.DiasRetraso = 0;
      this.mostrarEditarRecargo.quienAutoriza = false;
      this.mostrarEditarRecargo.desabledMonto = true;
    },
    abrirModal: function(tipo, inhabilitar, item) {
      this.titutoModal = tipo;
      this.mostrarModal = !this.mostrarModal;
      this.inhabilitar = inhabilitar;

      this.limpiarModal();
      if (item && item.PagoId && item.PagoId > 0) this.cargarItem(item);
    },
    limpiarModal() {
      this.pago_item.PagoId.val = null;
      this.cantidadTipoPago = 0;
      this.pago_item.Cantidad.val = 0;
      this.pago_item.FechaDePago.val = moment().format("yyyy-MM-DD");

      this.pago_item.TipoDePago.val.TipoDePagoId = -1;
      this.pago_item.TipoDePago.val.TipoDePagoId.Monto = 0;
      this.pago_item.TipoDePago.key = "edit_" + -1;

      this.pago_item.CicloEscolar.val = -1;
      this.pago_item.CicloEscolar.key = "edit_" + -1;
      this.mostrarEditarRecargo.quienAutoriza = false;
      this.itemsRecargo = [];
    },
    async cargarItem(item) {
      let recargos = await this.getRecargos(item.PagoId);
      console.log(recargos);
      this.pago_item.PagoId.val = item.PagoId;
      this.cantidadTipoPago = item.Monto;
      this.pago_item.Cantidad.val = item.Monto;
      this.pago_item.FechaDePago.val = item.FechaPago;

      this.pago_item.TipoDePago.val.TipoDePagoId = Number(item.TipoDePagoId);
      this.pago_item.TipoDePago.key = "edit_" + item.TipoDePagoId;

      this.pago_item.CicloEscolar.val = item.CicloEscolar;
      this.pago_item.CicloEscolar.key = "edit_" + item.CicloEscolar;
    },
    limpiarValidez(input) {
      switch (input) {
        case "TipoDePago":
          if (Number(this.pago_item.TipoDePago.val.TipoDePagoId) > 0) {
            this.pago_item[input].isValid = true;
          }
          break;
        case "CicloEscolar":
          if (Number(this.pago_item.CicloEscolar.val) > 0) {
            this.pago_item[input].isValid = true;
          }
          break;
        default:
          this.pago_item[input].isValid = true;
          break;
      }
    },
    seleccionarCicloEscolar(item) {
      this.pago_item.CicloEscolar.val = item;
      this.pago_item.TipoDePago.tipoDeCicloEscolar = item;
      this.pago_item.TipoDePago.key = item;

      this.limpiarValidez("CicloEscolar");
    },
    seleccionarTipoDeRecargo(item) {
      this.recargo_item.TipoRecargo.val = item;
      this.recargo_item.Monto.val = item.Monto;

      this.mostrarEditarRecargo.displayBtn = true;
    },
    seleccionarUsuario(item) {
      this.recargo_item.Autoriza.val = item;
      if (item > 0) {
        this.mostrarEditarRecargo.desabledMonto = false;
        this.mostrarEditarRecargo.displayRecargoBtn = false;
      }
    },
    seleccionarTipoDePago(item) {
      if (item != null) {
        console.log(item);
        this.pago_item.TipoDePago.val.Monto = item.monto;
        this.cantidadTipoPago = item.monto;
        this.pago_item.TipoDePago.val.TipoDePagoId = item.id;
        this.pago_item.Cantidad.val += Number(item.monto);
      } else {
        this.pago_item.TipoDePago.val.Monto = 0;
        this.cantidadTipoPago = 0;
        this.pago_item.TipoDePago.val.TipoDePagoId = 0;
      }

      this.limpiarValidez("TipoDePago");
    },
    async validarFiltros() {
      let isValid = true;

      // if(this.filtros.filtro_nombre == "" && this.filtros.filtro_apellidoPaterno == "" && this.filtros.filtro_apellidoMaterno == "" &&
      //     this.filtros.filtro_curp == "" && this.filtros.filtro_numeroDeControl == "" && this.filtros.filtro_activo == "-1"){
      //   isValid =  false;
      // }

      return isValid;
    },
    async getAlumnos() {
      try {
        if (await this.validarFiltros()) {
        this.isLoading = true;
        this.mostrarAlumno = false;
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
          this.alumnos_items = [];
          response.data.response.forEach((element) => {
            this.alumnos_items.push({
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
                val: element["010EstructuraDeGrupoId"]
              },
              Activo:Number(element["011Activo"]),
            });
          });
        } else {
          console.log(response);
          this.$alert(
            "No se pudo obtener información, favor de volverlo a intentar."
          );
        }
        this.isLoading = false;
        } else {
          console.log("error");
          this.error = "Favor de indicar algún filtro";
          this.mostrarAlumno = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getAlumnoConPagos() {
      try {
          if(this.alumno_selected.item === null || this.alumno_selected.item === undefined){
            this.error = "Favor de seleccionar un alumno.";
            this.mostrarAlumno = false; 
          }else{
          this.isLoading = true;
          this.pagos_items = [];
          const filtros = {
            filtro: {},
          };
          
          const alumno = this.alumno_selected.item;
          
          if (alumno.AlumnoId.val != "")
            filtros.filtro.id = alumno.AlumnoId.val;        

          const response = await axios.post(
            routeAPI + "alumnos/alumnos",
            filtros
          );

          if (!response.data.hayError) {
            this.isLoading = false;
            this.mostrarAlumno = true;

            if (response.data.response.length <= 0) {
              this.error =
                "No se encontró ninún alumno, favor de verificar los datos.";
              this.mostrarAlumno = false;
              return;
            }

            let alumno = response.data.response[0];

            this.getGrupos(Number(alumno["010EstructuraDeGrupoId"]));

            this.alumno_item.AlumnoId = alumno["011AlumnoId"];
            this.alumno_item.Nombre = alumno["011Nombre"];
            this.alumno_item.ApellidoPaterno = alumno["011ApellidoPaterno"];
            this.alumno_item.ApellidoMaterno = alumno["011ApellidoMaterno"];
            this.alumno_item.Curp = alumno["011CURP"];
            this.alumno_item.NumeroDeControl = alumno["011NumeroDeControl"];
            this.getPagos(Number(alumno["011AlumnoId"]));
          }  
          }    
      } catch (err) {
        console.log(err);
      }
    },
    async getGrupos(grupoId) {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        if (grupoId != "") filtros.filtro.estructuraDeGrupoId = grupoId;

        const response = await axios.post(
          routeAPI + "administracion/estructurasDeGrupoNombres",
          filtros
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {
              let grupo = {
                EstructuraDeGrupoId: element["010EstructuraDeGrupoId"],
                TipoModalidad: element["004NombreModalidad"],
                TipoDeGrupo: element["006NombreGrupo"],
                TipoGrado: element["008NombreGrado"],
                Activo: element["010Activo"],
              };

              this.alumno_item.Grupo =
                grupo.TipoGrado +
                " " +
                grupo.TipoDeGrupo +
                " - " +
                grupo.TipoModalidad;
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
    async getPagos(alumnoId) {
      try {
        if (alumnoId <= 0) {
          alert("No hay alumno Id");
        } else {
          this.isLoading = true;
          this.pagos_items = [];
          const filtros = {
            filtro: {
              activo: 1,
              alumnoId: alumnoId,
            },
          };

          const response = await axios.post(
            routeAPI + "administracion/pagos",
            filtros
          );

          if (!response.data.hayError) {
            if (response.data.response.length > 0) {
              response.data.response.forEach((element) => {
                this.pagos_items.push({
                  PagoId: element["017PagoId"],
                  Monto: element["017Monto"],
                  TipoDePagoId: element["001TipoDePagoId"],
                  TipoDePago: element["001TiposDePagoNombre"],
                  CicloEscolar: element["002TipoDeCicloEscolarId"],
                  FechaPago: moment(element["017FechaPago"]).format(
                    "yyyy-MM-DD"
                  ),
                  Activo: element["017Activo"],
                });
              });
            }
          } else
            this.$alert(
              "No se pudo obtenera información, favor de volverlo a intentar."
            );

          this.isLoading = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getRecargos(pagoId) {
      try {
        if (pagoId <= 0) {
          alert("No hay pago Id");
        } else {
          this.isLoading = true;
          const filtros = {
            filtro: {
              activo: 1,
              pagoId: pagoId,
            },
          };

          const response = await axios.post(
            routeAPI + "administracion/recargos",
            filtros
          );

          if (!response.data.hayError) {
            if (response.data.response.length > 0) {
              response.data.response.forEach((element) => {
                this.itemsRecargo.push({
                  Id: element["003TipoDeRecargoId"],
                  TipoRecargo: {
                    Id: element["003TipoDeRecargoId"],
                    Nombre: element["003NombreTipoRecargo"],
                  },
                  Monto: element["018Monto"],
                  DiasRetraso: element["018DiasDeRetraso"],
                  TotalAPagar: element["018MontoTotal"],
                });
                this.indexRecargos++;
              });
            }
          } else
            this.$alert(
              "No se pudo obtenera información, favor de volverlo a intentar."
            );

          this.isLoading = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async cancelar(item) {
      try {
        this.isLoading = true;

        const data = {
          pago: {
            id: item.PagoId,
            Activo: Number(0),
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/cancelarPago",
          data
        );
        this.isLoading = false;

        if (!response.data.hayError) {
          this.$alert("El pago se canceló correctamente.");
          this.getPagos(Number(this.pagos_items.PagoId));
        } else {
          console.log(response);
          this.$alert("Sucedio un error, favor de volver a intentarlo.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    limpiarFiltros() {
      this.filtros.filtro_nombre = "";
      this.filtros.filtro_apellidoPaterno = "";
      this.filtros.filtro_apellidoMaterno = "";
      this.filtros.filtro_curp = "";
      this.filtros.filtro_numeroDeControl = "";
      this.filtros.filtro_activo = "-1";
      // this.getAlumnoConPagos();
      this.getAlumnos();
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
.seccion_data {
  border: 1px solid #adb5bd;
  padding-bottom: 10px;
  border-radius: 5px;
  margin-left: 0px;
}

.seccion_titulo_first {
  background-color: #dbdbdb;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.seccion_titulo {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 20px 0 0px 0;
  background-color: #dbdbdb;
}

.seccion_modal {
  padding: 10px;
  margin: 5px;
  width: 99%;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.seccion_titulo_modal {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
}

.seccion_total_modal {
  width: 100%;
  padding: 10px;
  border-top: 1px solid #ccc;
  margin-top: 5px;
}

.modal-content {
  width: 1000px;
}
</style>
