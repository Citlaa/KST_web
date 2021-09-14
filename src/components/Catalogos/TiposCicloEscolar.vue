<template>
  <div>
    <div class="col-12" id="Titulo">
        <h1 class="titulo_azul">Ciclo Escolar</h1>
        <div class="line_red"></div>
    </div>
    <div class="col-12 row filtros_div" id="filtros_div">
        <div class="col-12 filtro_titulo">
            <div class="row">
            <div class="col-10"><h1 class="col-10">Favor de indicar filtros</h1></div>
            <div class="col-2" @click="mostrarFiltros = !mostrarFiltros" :key="mostrarFiltros">
                <i class="fas fa-angle-down" v-if="!mostrarFiltros" style="float: right;"></i>
                <i class="fas fa-angle-up" v-if="mostrarFiltros" style="float: right;"></i>
            </div>
            </div>
        </div>
        <div v-if="mostrarFiltros" class="col-12 row">
        <div class="col-4">
            <label>Año de inicio</label>
            <input class="form-control" type="number" />
        </div>
        <div class="col-4">
            <label>Año de termino</label>
            <input class="form-control" type="number" />
        </div>
        <div class="col-4">
            <label>Activo</label>
            <input class="form-control" type="number" />
        </div>
        </div>
    </div>
    <div class="col-12" style="margin-bottom:100px;">
        <button class="button is-primary mt-5 mb-1 align-left" @click="abrirModal('Agregar', {})"><i class="fas fa-plus" style=""></i>&nbsp;&nbsp;Agregar ciclo escolar</button>
        <br/>        
        <div id="bootstrap_table">
            <div class="col-3 mr-0 align-rigth">
                <input class="form-control" v-model="filter" type="search" placeholder="Buscar" />
            </div>
            <b-table striped hover outlined
                :items="items"                  
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
import bootbox from 'bootbox';
 
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
      mostrarFiltros: false
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
        console.log(this.item);           
        this.mostrarModal = !this.mostrarModal;        
    },
    async guardarTipoDeCicloEscolar(){
      if(this.item.TipoDeCicloEscolarId > 0){
          this.editarTipoDeCicloEscolar();
      }else{
          this.agregarTipoDeCicloEscolar();
      }
    },
    async agregarTipoDeCicloEscolar(){
        try {             
            const data = {
                tipoDeCicloEscolar: {
                    TipoDeCicloEscolarId: null,
                    Inicio: Number(this.item.AñoDeInicio),
                    Termino: Number(this.item.AñoDeTermino),
                    Activo: Number(this.item.Activo)
                }
            }
            console.log(data);
            bootbox.alert("Hello world!");
            // const response = await axios.post("http://castelazo.edu.mx/app/administracion/guardarTiposDeCicloEscolar", data);   
            // console.log(response);    
            // if(!response.data.hayError){

            // }
            
        } catch(err) {
        console.log(err);
      }
    },
    async editarTipoDeCicloEscolar(){
        try {             
            const data = {
                tipoDeCicloEscolar: {
                    TipoDeCicloEscolarId: this.item.TipoDeCicloEscolarId,
                    Inicio: Number(this.item.AñoDeInicio),
                    Termino: Number(this.item.AñoDeTermino),
                    Activo: Number(this.item.Activo)
                }
            }
            console.log(data);
            // bootbox.alert("Hello world!");
            const response = await axios.post("http://castelazo.edu.mx/app/administracion/editarTiposDeCicloEscolar", data);   
            console.log(response);    
            // if(!response.data.hayError){

            // }
            
        } catch(err) {
        console.log(err);
      }
    }
  },
};
</script>
 
<style>

</style>