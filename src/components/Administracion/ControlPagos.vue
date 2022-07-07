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
            Limpiar
          </button>
          <button class="button is-primary btn-sm" @click="getAlumnoConPagos()">
            Buscar
          </button>
        </div>
      </div>
    </section>
    <br />
    <section id="data_alumnos">
      <div class="row col-12 seccion_data">
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
            type="number"
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
              @click="abrirModal('Agregar')"
            >
              <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar pago
            </button>
            <br />
            <!-- <div
              class="row col-12"
              v-if="pagos_items.length <= 0"
              style="display: grid; justify-content: center;"
            >
              <p>No se encontraron registros</p>
            </div> -->
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
                    @click="abrirModal('')"
                    value="Detalles"
                    title="Ver Detalles"
                  >
                    <i class="far fa-eye"></i>
                  </button>
                  <button
                    class="button is-info is-small"
                    @click="abrirModal('Editar')"
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
                              :disabled="mostrarEditarRecargo.desabledMonto"
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
                            <label>Quien autoriza*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="recargo_item.Autoriza.val"
                              :disabled="!inhabilitar"
                              @blur="autorizaEvt"
                            />
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
                                    <td>{{ item.TotalAPagar }}</td>
                                    <td>
                                      <button
                                        class="btn btn-default"
                                        @click="eliminarRecargo(item)"
                                      >
                                        <i class="fas fa-trash-alt"></i>
                                      </button>
                                    </td>
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
      currentPage: 1,
      pagos_items: [],
      filter: "",
      itemsRecargo: [],
      fields: [
        {
          key: "AlumnoId.val",
          label: "Folio",
          sortable: true,
        },
        {
          key: "NombreCompleto.val",
          label: "Tipo de pago",
          sortable: true,
        },
        {
          key: "Curp.val",
          label: "Cantidad",
          sortable: true,
        },
        {
          key: "NumeroDeControl.val",
          label: "Fecha de pago",
          sortable: true,
        },
        {
          label: "Opciones",
          key: "opciones",
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
          val: moment().format("yyyy-MM-DD"),
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
  created(){
  },
  methods: {
    actualizarCantidadTotal() {
      this.pago_item.Cantidad.val -= this.pago_item.TipoDePago.val.Monto;
      this.pago_item.Cantidad.val += Number(this.newCantidadTipoPago);
      this.pago_item.TipoDePago.val.Monto = this.newCantidadTipoPago;
    },
    async guardarPago() {
      this.actualizarCantidadTotal();
      this.validarPago();
      console.log(this.pago_item);
      if (this.itemIsValid) {
        this.pago_item.Recargos = this.itemsRecargo;
        //Guardar pago
        this.agregarPago();
      }
    },
    validarPago() {
      this.itemIsValid = true;

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
          console.log(this.pago_item.Recargos);

          this.pago_item.Recargos.forEach(async (recargo) => {
            const data = {
              recargo: {
                PagoId: response.data.response.insertId,
                Monto: Number(recargo.Monto.split("$")[1]),
                TipoDeRecargoId: recargo.TipoRecargo.Id,
                DiasRetraso: recargo.DiasRetraso,
                TotalAPagar: recargo.TotalAPagar,
              },
            };
            this.agregarRecargoBD(data);
          });
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
      this.recargo_item.Fecha.val = moment().format("yyyy-MM-DD");
      this.recargo_item.Autoriza.val = null;
      this.recargo_item.TotalAPagar = 0;
      this.recargo_item.DiasRetraso = 0;
      this.mostrarEditarRecargo.quienAutoriza = false;
      this.mostrarEditarRecargo.desabledMonto = true;
    },
    autorizaEvt() {
      this.mostrarEditarRecargo.desabledMonto = false;
      this.mostrarEditarRecargo.displayRecargoBtn = false;
    },
    abrirModal: function(tipo) {
      this.titutoModal = tipo;
      this.mostrarModal = !this.mostrarModal;

      //Cargar ciclo escolar
      this.pago_item.CicloEscolar.val = 1;
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

      if (item.Monto.length > 2) this.mostrarEditarRecargo.displayBtn = true;
      else this.mostrarEditarRecargo.displayBtn = false;
    },
    seleccionarTipoDePago(item) {
      if (item != null) {
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
    async getAlumnoConPagos() {
      try {
        this.isLoading = true;
        this.pagos_items = [];
        const filtros = {
          filtro: {},
        };
        ////////////////aquí terminar de traer al alumno, despues sus pagos y pintarlos

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
          this.isLoading = false;
          let alumno = response.data.response[0];
console.log(alumno);
          this.alumno_item.Nombre = alumno['011Nombre'];
          this.alumno_item.ApellidoPaterno = alumno['012ApellidoPaterno'];
          this.alumno_item.ApellidoMaterno = alumno['012ApellidoMaterno'];
          this.alumno_item.Curp = alumno['011CURP'];
          this.alumno_item.NumeroDeControl = alumno['011NumeroDeControl'];
// response.data.response.forEach((element) => {

          // });
          // this.alumno_item
        }

      } catch (err) {
        console.log(err);
      }
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
