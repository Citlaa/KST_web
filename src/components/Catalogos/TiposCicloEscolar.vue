<template>
  <div class="container is-max-desktop">
    <div class="col-12" id="Titulo">
      <h1 class="titulo_azul">Ciclo Escolar</h1>
      <div class="line_red"></div>
    </div>
    <div class="col-12 row filtros_div" id="filtros_div">
      <div class="col-12 filtro_titulo">
        <div class="row">
          <div class="col-10">
            <h1 class="col-10">Favor de indicar filtros</h1>
          </div>
          <div class="col-2" @click="mostrarFiltros = !mostrarFiltros" :key="mostrarFiltros">
            <i class="fas fa-angle-down" v-if="!mostrarFiltros" style="float: right;"></i>
            <i class="fas fa-angle-up" v-if="mostrarFiltros" style="float: right;"></i>
          </div>
        </div>
      </div>
      <div v-if="mostrarFiltros" class="col-12 row">
        <div class="col-4">
          <label>Año de inicio</label>
          <input class="form-control" type="number" v-model="filtro_añoDeInicio" />
        </div>
        <div class="col-4">
          <label>Año de termino</label>
          <input class="form-control" type="number" v-model="filtro_añoDeTermino" />
        </div>
        <div class="col-4">
          <label class="activo_label">Activo</label>
          <select class="form-control" v-model="filtro_activo">
            <option value="-1">Seleccionar Activo</option>
            <option value="1">Si</option>
            <option value="0">No</option>
          </select>
        </div>
        <div class="filtro_footer">
          <button class="button is-default btn-sm mr-1" @click="limpiarFiltros()">Limpiar</button>
          <button class="button is-primary btn-sm" @click="getTiposDeCicloEscolar()">Filtrar</button>
        </div>
      </div>
    </div>
    <div class="col-12" style="margin-bottom:100px;">
      <button class="button is-primary mt-5 mb-1 align-left" @click="abrirModal('Agregar', {})">
        <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar ciclo escolar
      </button>
      <br />
      <div id="bootstrap_table">
        <div class="col-3 mr-0 align-rigth">
          <input class="form-control" v-model="filter" type="search" placeholder="Buscar" />
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
            <i v-if="data.item.Activo == 1" class="far fa-check-square" style="color: green"></i>
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
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
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
                    <h2 class="modal-title text-center">{{ titutoModal }} Ciclo Escolar</h2>
                    <div class="line_red"></div>
                  </div>
                  <a class="button close_modal" @click="mostrarModal = false">
                    <span aria-hidden="true">&times;</span>
                  </a>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-5 form-group padding-model">
                      <label>Año de inicio</label>
                      <input type="number" class="form-control" v-model="item.AñoDeInicio" />
                    </div>
                    <div class="col-5 form-group padding-model">
                      <label>Año de termino</label>
                      <input type="number" class="form-control" v-model="item.AñoDeTermino" />
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
                    @click="guardarTipoDeCicloEscolar()"
                  >Guardar</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="mostrarModal = false"
                  >Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <loading :active="isLoading" :can-cancel="true" :is-full-page="true" />
  </div>
</template>
 
<script>
import axios from "axios";
import routeAPI from "@/js/api";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "TiposDeCicloEscolar",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      items: [],
      item: {
        AñoDeInicio: Number,
        AñoDeTermino: Number,
        Activo: Boolean
      },
      fields: [
        {
          key: "TipoDeCicloEscolarId",
          label: "Folio",
          sortable: true
        },
        {
          key: "AñoDeInicio",
          sortable: true
        },
        {
          key: "AñoDeTermino",
          sortable: true
        },
        {
          label: "Activo",
          key: "Activo"
        },
        {
          label: "Opciones",
          key: "opciones"
        }
      ],
      filter: "",
      perPage: 5,
      currentPage: 1,
      mostrarModal: false,
      titutoModal: "",
      mostrarFiltros: true,
      filtro_añoDeInicio: new Date().getFullYear() - 1,
      filtro_añoDeTermino: new Date().getFullYear(),
      filtro_activo: 1
    };
  },
  created() {
    this.getTiposDeCicloEscolar();
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    // Obtener todos los ciclos escolares
    async getTiposDeCicloEscolar() {
      try {
        this.isLoading = true;
        this.limpiarVariables();
        const filtros = {
          filtro: {}
        };

        if (this.filtro_añoDeInicio != "")
          filtros.filtro.inicio = Number(this.filtro_añoDeInicio);
        if (this.filtro_añoDeTermino != "")
          filtros.filtro.fin = Number(this.filtro_añoDeTermino);
        if (this.filtro_activo != "" && Number(this.filtro_activo) > 0)
          filtros.filtro.activo = Number(this.filtro_activo);

        const response = await axios.post(
          routeAPI + "administracion/tiposDeCicloEscolar",
          filtros
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach(element => {
              this.items.push({
                TipoDeCicloEscolarId: element["002TipoDeCicloEscolarId"],
                AñoDeInicio: element["002AñoDeInicio"],
                AñoDeTermino: element["002AñoDeTermino"],
                Activo: element["002Activo"]
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
    abrirModal: function(tipo, item) {
      this.titutoModal = tipo;
      this.item = item;
      this.mostrarModal = !this.mostrarModal;
    },
    async guardarTipoDeCicloEscolar() {
      if (this.item.TipoDeCicloEscolarId > 0) {
        this.editarTipoDeCicloEscolar();
      } else {
        this.agregarTipoDeCicloEscolar();
      }
    },
    async agregarTipoDeCicloEscolar() {
      try {
        this.isLoading = true;
        const data = {
          tipoDeCicloEscolar: {
            TipoDeCicloEscolarId: null,
            Inicio: Number(this.item.AñoDeInicio),
            Termino: Number(this.item.AñoDeTermino),
            Activo: Number(this.item.Activo)
          }
        };

        const response = await axios.post(
          routeAPI + "administracion/guardarTiposDeCicloEscolar",
          data
        );

        this.mostrarModal = false;
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El ciclo escolar se guardó con éxito.");
          this.getTiposDeCicloEscolar();
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editarTipoDeCicloEscolar() {
      try {
        this.isLoading = true;
        const data = {
          tipoDeCicloEscolar: {
            TipoDeCicloEscolarId: this.item.TipoDeCicloEscolarId,
            Inicio: Number(this.item.AñoDeInicio),
            Termino: Number(this.item.AñoDeTermino),
            Activo: Number(this.item.Activo)
          }
        };

        const response = await axios.post(
          routeAPI + "administracion/editarTiposDeCicloEscolar",
          data
        );

        this.mostrarModal = false;
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El ciclo escolar se guardó con éxito.");
          this.getTiposDeCicloEscolar();
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
          tipoDeCicloEscolar: {
            TipoDeCicloEscolarId: item.TipoDeCicloEscolarId,
            Activo: Number(0)
          }
        };

        const response = await axios.post(
          routeAPI + "administracion/cancelarTiposDeCicloEscolar",
          data
        );
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El ciclo escolar se canceló correctamente.");
          this.getTiposDeCicloEscolar();
        } else {
          console.log(response);
          this.$alert("No se pudo cancelar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    limpiarVariables: function() {
      this.items = [];
    },
    limpiarFiltros() {
      this.filtro_añoDeInicio = "";
      this.filtro_añoDeTermino = "";
      this.filtro_activo = "-1";
    }
  }
};
</script>
 
<style>
@media screen and (max-width: 600px) {
  .activo_label::before {
    content: "Estado ";
  }

  .padding-model {
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>