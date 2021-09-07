<template>
  <div>
    <div class="col-12" id="Titulo">
        <h1 class="titulo_azul">Ciclo Escolar</h1>
        <div class="line_red"></div>
    </div>
    <div>
        <button class="button is-primary mt-5 mb-1 align-rigth" @click="abrirModal('Agregar', {})">Agregar ciclo escolar</button>
        <br/>        
        <div id="bootstrap_table">
            <div class="col-3 mr-0">
                <input class="form-control" v-model="filter" type="search" placeholder="Buscar" />
            </div>
            <b-table striped hover outlined
                :items="items"  
                :columns="columns"
                :fields="fields"  
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"                            
                >
                <template v-slot:cell(Activo)="data" >                                    
                    <i v-if="data.item.Activo == 1" class="far fa-check-square" style="color: green"></i>
                    <i v-else class="far fa-times-circle" style="color: red"></i>                    
                </template>
                <template v-slot:cell(opciones)="data">                    
                    <button class="button is-info is-small" @click="abrirModal('Editar', data.item)" value="Editar"><i class="far fa-edit"></i></button>                        
                    <button class="button is-danger is-small" @click="deleteProduct(item)" value="Eliminar"><i class="fas fa-trash-alt"></i></button>
                </template>
            </b-table>
            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage">
            </b-pagination>
        </div>
    </div> 
    <div v-if="mostrarModal" id="modal_div">
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
                                <a class="button close_modal" @click="mostrarModal = false"><span aria-hidden="true">&times;</span></a>                                
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-5 form-group">
                                        <label>Año de inicio</label>
                                        <input type="number" class="form-control" v-model="item.AñoDeInicio"/>
                                    </div>
                                    <div class="col-5 form-group">
                                        <label>Año de termino</label>
                                        <input type="number" class="form-control" v-model="item.AñoDeTermino"/>
                                    </div>
                                    <div class="col-2 form-group">
                                        <label>Activo</label>
                                        <select class="form-control" v-model="item.Activo">
                                            <option value="1">Si</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="button is-primary" @click="guardarTipoDeCicloEscolar()">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="mostrarModal = false">Cancelar</button>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </transition>
    </div>         
  </div>
</template>
 
<script>
import axios from "axios";
 
export default {
  name: "TiposDeCicloEscolar",
  data() {
    return {
      items: [],
      item: {
          AñoDeInicio: Number,
          AñoDeTermino: Number,
          Activo: Boolean
      },
      fields: [
        {
            key: "TipoDeCicloEscolarId",
            label: 'Folio',
            sortable: true,
        }, 
        {
            key: "AñoDeInicio",
            sortable: true,
        }, 
        {
             key: "AñoDeTermino",
             sortable: true,
        }, 
        {
             key:"Activo"
        }, 
        {
             key:"opciones"
        }
        ],
      filter: "",
      perPage: 5,
      currentPage: 1,
      mostrarModal: false,
      titutoModal: '',
    };
  },
  created() {
    this.getTiposDeCicloEscolar();
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    // Obtener todos los ciclos escolares
    async getTiposDeCicloEscolar() {
      try {
        const response = await axios.get("http://castelazo.edu.mx/app/administracion/tiposDeCicloEscolar");        
        response.data.forEach(element => {            
          this.items.push({ 
            TipoDeCicloEscolarId : element["002TipoDeCicloEscolarId"],
            AñoDeInicio: element["002AñoDeInicio"],
            AñoDeTermino: element["002AñoDeTermino"],
            Activo: element["002Activo"]
          });
        });                    
      } catch(err) {
        console.log(err);
      }
    },
    abrirModal: function(tipo, item){         
        this.titutoModal = tipo;
        this.item = item;        
        this.mostrarModal = !this.mostrarModal;        
    },
    async guardarTipoDeCicloEscolar(){
        

    }
  },
};
</script>
 
<style>


</style>