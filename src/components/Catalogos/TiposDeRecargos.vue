<template>
  <div class="container is-max-desktop">
    <div class="col-12" id="Titulo">
      <h1 class="titulo_azul">Tipos de Recargo</h1>
      <div class="line_red"></div>
    </div>
    <section id="filtros">
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
          <div class="col-3">
            <label>Concepto</label>
            <input
              class="form-control"
              type="text"
              v-model="filtro_nombre"
              placeholder="Indicar Concepto"
            />
          </div>
          <div class="col-3">
            <label>Cantidad</label>
            <input
              class="form-control"
              type="number"
              min="0"
              v-model="filtro_monto"
              placeholder="Indicar Cantidad"
            />
          </div>
          <div class="col-3">
            <tiposCicloEscolar
              :key="filtro_cicloEscolar_key"
              :label="'Ciclo escolar'"
              :titulo="true"
              v-on:seleccionarCicloEscolar="seleccionarCicloEscolar($event)"
              :funcion="'seleccionarCicloEscolar'"
            />
          </div>
          <div class="col-3">
            <label class="activo_label">Activo</label>
            <select class="form-control" v-model="filtro_activo">
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
            Mostrar todo
          </button>
          <button class="button is-primary btn-sm" @click="getTiposDeRecargo()">
            Buscar
          </button>
        </div>
      </div>
    </section>
    <section id="data_table">
      <div class="col-12" style="margin-bottom:100px;">
        <button
          class="button is-primary mt-5 mb-1 align-left"
          @click="abrirModal('Agregar', {})"
        >
          <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar tipo de recargo
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
                :key="data.item.TipoDeRecargoId"
                style="cursor: default;"
              >
                <i class="far fa-check-square" style="color: green"></i>
              </button>
              <button
                class="btn btn-default"
                v-else
                :key="data.item.TipoDeRecargoId"
                style="cursor: default;"
              >
                <i class="far fa-times-circle" style="color: red"></i>
              </button>
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
    </section>
    <section id="modal">
      <div v-if="mostrarModal" class="modal_div" id="modal_div">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="col-11">
                      <h2 class="modal-title text-center">
                        {{ titutoModal }} Tipo de Recargo
                      </h2>
                      <div class="line_red"></div>
                    </div>
                    <a class="button close_modal" @click="mostrarModal = false">
                      <span aria-hidden="true">&times;</span>
                    </a>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-4 form-group padding-model">
                        <label>Nombre</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.Nombre"
                        />
                      </div>
                      <div class="col-4">
                        <TiposCicloEscolar
                          :label="'Ciclo escolar'"
                          :titulo="true"
                          :tipoDeCicloEscolarId="
                            item.TipoDeCicloEscolar.TipoDeCicloEscolarId
                          "
                          v-on:seleccionarCicloEscolar="
                            seleccionarCicloEscolarItem($event)
                          "
                          :funcion="'seleccionarCicloEscolar'"
                        />
                      </div>
                      <div class="col-2 form-group padding-model">
                        <label>Monto</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="item.Monto"
                          min="0"
                        />
                      </div>
                      <div class="col-2 padding-model">
                        <label>Activo</label>
                        <select class="form-control" v-model="item.Activo">
                          <option value="1">Si</option>
                          <option value="0">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="button is-primary"
                      @click="guardarTipoDeRecargo()"
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
    </section>
    <cargando v-if="isLoading"></cargando>
  </div>
</template>

<script>
import axios from "axios";
import routeAPI from "@/js/api";

export default {
  name: "ProductList",
  data() {
    return {
      isLoading: false,
      isValid: true,
      ciclosEscolares: [],
      items: [],
      item: {
        Nombre: String,
        Monto: Number,
        TipoDeCicloEscolar: {
          TipoDeCicloEscolarId: -1,
        },
        Activo: Boolean,
      },
      fields: [
        {
          key: "TipoDeRecargoId",
          label: "Folio",
          sortable: true,
          value: "1",
        },
        {
          key: "Nombre",
          label: "Concepto",
          sortable: true,
        },
        {
          key: "Monto",
          label: "Cantidad",
          sortable: true,
          min:"0",
        },
        {
          key: "TipoDeCicloEscolar.Nombre",
          label: "Ciclo Escolar",
          sortable: true,
        },
        {
          label: "Activo",
          key: "Activo",
          sortable: true,
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
      filtro_nombre: "",
      filtro_monto: "",
      filtro_cicloEscolar: "",
      filtro_cicloEscolar_key: 0,
      filtro_activo: "-1",
    };
  },
  created() {
    this.getTipoDeCicloEscolar();
    this.getTiposDeRecargo();
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
    async getTiposDeRecargo() {
      try {
        this.isLoading = true;
        this.limpiarVariables();
        const filtros = {
          filtro: {},
        };

        if (this.filtro_nombre != "")
          filtros.filtro.nombre = this.filtro_nombre;
        if (this.filtro_monto != "")
          filtros.filtro.monto = Number(this.filtro_monto);
        if (this.filtro_cicloEscolar != "")
          filtros.filtro.cicloEscolarId = Number(this.filtro_cicloEscolar);
        if (this.filtro_activo != "" && Number(this.filtro_activo) >= 0)
          filtros.filtro.activo = Number(this.filtro_activo);

        const response = await axios.post(
          routeAPI + "administracion/tiposDeRecargo",
          filtros
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {
              this.items.push({
                TipoDeRecargoId: element["003TipoDeRecargoId"],
                Nombre: element["003Nombre"],
                Monto: "$" + element["003Monto"],
                TipoDeCicloEscolar: this.ciclosEscolares.find(
                  (ciclo) =>
                    ciclo.TipoDeCicloEscolarId ===
                    Number(element["002TipoDeCicloEscolarId"])
                ),
                Activo: element["003Activo"],
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
    seleccionarCicloEscolar: function(element) {
      this.filtro_cicloEscolar = element;
    },
    seleccionarCicloEscolarItem(element) {
      this.item.TipoDeCicloEscolar.TipoDeCicloEscolarId = Number(element);
    },
    abrirModal: function(tipo, item) {
      this.titutoModal = tipo;
      this.item = item;
      console.log(this.item);
      if (this.item.TipoDeRecargoId > 0)
        this.item.Monto = this.item.Monto.split("$")[1];
      else this.item.TipoDeCicloEscolar = { TipoDeCicloEscolarId: -1 };
      this.mostrarModal = !this.mostrarModal;
    },
    async guardarTipoDeRecargo() {
      if (this.item.TipoDeRecargoId > 0) {
        this.editarTipoDeRecargo();
      } else {
        this.agregarTipoDeRecago();
      }
    },
    async validar(){
      this.isValid = true;

      if (this.$store.getters.userId <= 0 || this.$store.getters.userId == undefined) {          
          this.$router.push({ name: "Login" });
      }

      if(this.item.Nombre == "" || this.item.Monto == undefined || Number(this.item.Monto) <=0 || Number(this.item.TipoDeCicloEscolar.TipoDeCicloEscolarId) <= 0 || this.item.Activo == undefined || Number(this.item.Activo) <= 0){
        this.$alert("Favor de completar datos.");
        this.isValid = false;
      }  
    }, 
    async agregarTipoDeRecago() {
      try {    
        await this.validar();
        if(this.isValid){       
        this.isLoading = true;
        const data = {
          tipoDeRecargo: {
            TipoDeRecargoId: null,
            Nombre: this.item.Nombre,
            Monto: Number(this.item.Monto),
            TipoDeCicloEscolarId: Number(
              this.item.TipoDeCicloEscolar.TipoDeCicloEscolarId
            ),
            UsuarioId: this.$store.getters.userId,
            Activo: Number(this.item.Activo),
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/guardarTiposDeRecargo",
          data
        );

        this.isLoading = false;
        if (!response.data.hayError) {
          this.mostrarModal = false;
          this.$alert("El recargo se guardó con éxito.");
          this.getTiposDeRecargo();
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editarTipoDeRecargo() {
      try {
        this.isLoading = true;
        const data = {
          tipoDeRecargo: {
            TipoDeRecargoId: this.item.TipoDeRecargoId,
            Nombre: this.item.Nombre,
            Monto: Number(this.item.Monto),
            TipoDeCicloEscolarId: Number(
              this.item.TipoDeCicloEscolar.TipoDeCicloEscolarId
            ),
            Activo: Number(this.item.Activo),
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/editarTiposDeRecargo",
          data
        );

        this.mostrarModal = false;
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El recargo se guardó con éxito.");
          this.getTiposDeRecargo();
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
          tipoDeRecargo: {
            TipoDeRecargoId: item.TipoDeRecargoId,
            Activo: Number(0),
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/cancelarTiposDeRecargos",
          data
        );
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El recargo se canceló correctamente.");
          this.getTiposDeRecargo();
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
    },
    limpiarFiltros() {
      this.filtro_nombre = "";
      this.filtro_monto = "";
      this.filtro_cicloEscolar = "";
      this.filtro_cicloEscolar_key++;
      this.filtro_activo = "-1";
      this.getTiposDeRecargo();
    },
  },
};
</script>

<style></style>
