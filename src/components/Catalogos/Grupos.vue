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
          <div class="col-2" @click="mostrarFiltros = !mostrarFiltros" :key="mostrarFiltros">
            <i class="fas fa-angle-down" v-if="!mostrarFiltros" style="float: right;"></i>
            <i class="fas fa-angle-up" v-if="mostrarFiltros" style="float: right;"></i>
          </div>
        </div>
      </div>
      <div v-if="mostrarFiltros" class="col-12 row">
        <div class="col-3">
          <tiposCicloEscolar
              :titulo="true"   
              :label="'Ciclo Escolar'"           
              v-on:seleccionarCicloEscolar="seleccionarCicloEscolar($event)"
              :funcion="'seleccionarCicloEscolar'"              
            />
        </div>
        <div class="col-3">
         <TiposNivel
            :key="filtro_modalidad_key"
            :label="'Nivel'"
            :titulo="true"            
            :funcion="'seleccionarTipoModalidad'"
            @seleccionarTipoModalidad="seleccionarTipoModalidad($event)"
          />
        </div>        
        <div class="col-3">
          <TiposModalidad
            :key="filtro_modalidad_key"
            :label="'Modalidad'"
            :titulo="true"            
            :funcion="'seleccionarTipoModalidad'"
            @seleccionarTipoModalidad="seleccionarTipoModalidad($event)"
          />
        </div>
        <div class="col-3">      
         <TiposPeriodo
            :key="filtro_modalidad_key"
            :label="'Periodo'"
            :titulo="true"            
            :funcion="'seleccionarTipoModalidad'"
            @seleccionarTipoModalidad="seleccionarTipoModalidad($event)"
          />
        </div> 
        <div class="col-3">
         <TiposGrado
            :key="filtro_modalidad_key"
            :label="'Grado'"
            :titulo="true"            
            :funcion="'seleccionarTipoModalidad'"
            @seleccionarTipoModalidad="seleccionarTipoModalidad($event)"
          />
        </div> 
        <div class="col-3">
          <TiposGrupo
            :key="filtro_modalidad_key"
            :label="'Grupo'"
            :titulo="true"            
            :funcion="'seleccionarTipoModalidad'"
            @seleccionarTipoModalidad="seleccionarTipoModalidad($event)"
          />
        </div>
        <div class="col-3">
         <TiposEspecialidad
            :key="filtro_modalidad_key"
            :label="'Especialidad'"
            :titulo="true"            
            :funcion="'seleccionarTipoModalidad'"
            @seleccionarTipoModalidad="seleccionarTipoModalidad($event)"
          />
        </div> 
        <div class="col-3">
          <label class="activo_label">Activo</label>
          <select class="form-control" v-model="filtro_activo">
            <option value="1">Si</option>
            <option value="0">No</option>
          </select>
        </div>
        <div class="filtro_footer">
          <button class="button is-default btn-sm mr-1" @click="limpiarFiltros()">Limpiar</button>
          <button class="button is-primary btn-sm" @click="getTiposDeRecargo()">Filtrar</button>
        </div>
      </div>
    </div>
    <div class="col-12" style="margin-bottom:100px;">
      <button class="button is-primary mt-5 mb-1 align-left" @click="abrirModal('Agregar', {})">
        <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar grupo
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
          <!-- <template v-slot:cell(cicloEscolar)="data">
            <tiposCicloEscolar
              :titulo="false"
              :tipoDeCicloEscolarId="data.item.TipoDeCicloEscolarId"
              v-on:seleccionarCicloEscolar="seleccionarCicloEscolar($event)"
              :funcion="'seleccionarCicloEscolar'"
              :disabled="true"
            />
          </template> -->
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
                    <h2 class="modal-title text-center">{{ titutoModal }} Tipo de Recargo</h2>
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
                      <input type="text" class="form-control" v-model="item.Nombre" />
                    </div>                    
                    <!-- <div class="col-4">
                      <tiposCicloEscolar
                        :label="'Ciclo escolar'"
                        :titulo="true"
                        :tipoDeCicloEscolarId="item.TipoDeCicloEscolarId"
                        v-on:seleccionarCicloEscolar="seleccionarCicloEscolarItem($event)"
                        :funcion="'seleccionarCicloEscolar'"
                      />
                    </div> -->
                    <div class="col-2 form-group padding-model">
                      <label>Monto</label>
                      <input type="number" class="form-control" v-model="item.Monto" />
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
  name: "ProductList",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      items: [],
      item: {
        Nombre: String,
        Monto: Number,
        TipoDeCicloEscolarId: Number,
        Activo: Boolean
      },
      fields: [
        {
          key: "TipoDeRecargoId",
          label: "Folio",
          sortable: true
        },
        {
          key: "Nombre",
          label: 'Ciclo Escolar',
          sortable: true
        },
        {
          key: "Monto",
          label: 'Nivel',
          sortable: true
        },
        {
          key: "cicloEscolar",
          label: "Modalidad"
        },
        {
          key: "Monto",
          label: 'Grupo',
          sortable: true
        },
        {
          key: "Monto",
          label: 'Especialidad',
          sortable: true
        },
        {
          key: "Monto",
          label: 'Grado',
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
      filtro_nombre: "",
      filtro_monto: "",
      filtro_cicloEscolar: "",
      filtro_modalidad_key: 0,
      filtro_activo: ""
    };
  },
  created() {
    this.getTiposDeRecargo();
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    async getTiposDeRecargo() {
      try {
        this.isLoading = true;
        this.limpiarVariables();
        const filtros = {
          filtro: {}
        };

        if (this.filtro_nombre != "")
          filtros.filtro.nombre = this.filtro_nombre;
        if (this.filtro_monto != "")
          filtros.filtro.monto = Number(this.filtro_monto);
        if (this.filtro_cicloEscolar != "")
          filtros.filtro.cicloEscolarId = Number(this.filtro_cicloEscolar);
        if (this.filtro_activo != "")
          filtros.filtro.activo = Number(this.filtro_activo);

        const response = await axios.post(
          routeAPI + "administracion/tiposDeRecargo",
          filtros
        );
        
        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach(element => {
              this.items.push({
                TipoDeRecargoId: element["003TipoDeRecargoId"],
                Nombre: element["003Nombre"],
                Monto: "$" + element["003Monto"],
                TipoDeCicloEscolarId: element["002TipoDeCicloEscolarId"],
                Activo: element["003Activo"]
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
    seleccionarTipoModalidad: function(element) {
      this.filtro_cicloEscolar = element;
    },
    seleccionarTipoModalidadItem(element) {
      this.item.TipoDeCicloEscolarId = Number(element);
    },
    abrirModal: function(tipo, item) {
      this.titutoModal = tipo;
      this.item = item;
      if (this.item.TipoDeRecargoId > 0)      
        this.item.Monto = this.item.Monto.split("$")[1];    
      this.mostrarModal = !this.mostrarModal;
    },
    async guardarTipoDeRecargo() {    
      if (this.item.TipoDeRecargoId > 0) {                    
        this.editarTipoDeRecargo();
      } else {
        this.agregarTipoDeRecago();
      }
    },
    async agregarTipoDeRecago() {
      try {
        this.isLoading = true;
        const data = {
          tipoDeRecargo: {
            TipoDeRecargoId: null,
            Nombre: this.item.Nombre,
            Monto: Number(this.item.Monto),
            TipoDeCicloEscolarId: Number(this.item.TipoDeCicloEscolarId),
            Activo: Number(this.item.Activo)
          }
        };

        const response = await axios.post(
          routeAPI + "administracion/guardarTiposDeRecargo",
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
    async editarTipoDeRecargo() {
      try {
        this.isLoading = true;
        const data = {
          tipoDeCicloEscolar: {
            TipoDeRecargoId: this.item.TipoDeRecargoId,
            Nombre: this.item.NombreRecargo,
            Monto: Number(this.item.MontoRecargo),
            TipoDeCicloEscolarId: Number(this.item.TipoDeCicloEscolarId),
            Activo: Number(this.item.Activo)
          }
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
          tipoDeCicloEscolar: {
            TipoDeCicloEscolarId: item.TipoDeCicloEscolarId,
            Activo: Number(0)
          }
        };

        const response = await axios.post(
          routeAPI + "administracion/cancelarTiposDeRecargos",
          data
        );
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El recargo se canceló correctamente.");
          this.getTiposDeRecagos();
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
      this.filtro_activo = "";
    }
  }
};
</script>
 
<style>
</style>