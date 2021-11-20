<template>
  <div>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>        
      <select class="form-control" v-model="valor" @change="seleccionar()" :disabled="disabled"> 
        <option value="-1">Seleccionar Periodo</option>       
        <option v-for="(element, index) in items" :key="index" :value="element['TipoPeriodoId']">{{ element["Nombre"] }}</option>
      </select>
    </div>
    <loading :active="isLoading"
             :can-cancel="true"                
             :is-full-page="true"/>
  </div>
</template>
<script>
import axios from "axios";
import routeAPI from "@/js/api";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Loading
  },
  data() {
    return {
      valor: "-1",      
      isLoading: false,
      items: [],
    };
  },
  props: {
    label: String,
    funcion: String,
    tipoPeriodoId: Number,
    titulo: { type: Boolean, required: true, default: true},
    disabled: Boolean
  },
  created() {
      this.getTiposPeriodo();
      
      if(this.$props.tipoPeriodoId > 0)
        this.valor = this.$props.tipoPeriodoId;
  },
  computed: {},
  methods: {
    async getTiposPeriodo() {
      try {
        this.isLoading = true;        
        const filtros = {
          filtro: {            
            activo: 1
          }
        };

        const response = await axios.post(
          routeAPI + "catalogo/tiposPeriodo",
          filtros
        );
        
        response.data.response.forEach(element => {            
          this.items.push({
            TipoPeriodoId: element["005TipoPeriodoId"],
            Nombre: element["005Nombre"],
            Activo: element["005Activo"]
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    seleccionar: function(){                 
        this.$emit(this.$props.funcion, this.valor);
    }
  }
};
</script>