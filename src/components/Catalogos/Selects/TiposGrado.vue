<template>
  <div>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>        
      <select class="form-control" v-model="valor" @change="seleccionar()" :disabled="disabled">        
        <option v-for="(element, index) in items" :key="index" :value="element['TipoGradoId']">{{ element["Nombre"] }}</option>
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
      valor: String,      
      isLoading: false,
      items: [],
    };
  },
  props: {
    label: String,
    funcion: String,
    tipoDeGradoId: Number,
    titulo: { type: Boolean, required: true, default: true},
    disabled: Boolean
  },
  created() {
      this.getTiposDeGrado();
      
      if(this.$props.tipoDeGradoId > 0)
        this.valor = this.$props.tipoDeGradoId;
  },
  computed: {},
  methods: {
    async getTiposDeGrado() {
      try {
        this.isLoading = true;        
        const filtros = {
          filtro: {            
            activo: 1
          }
        };

        const response = await axios.post(
          routeAPI + "catalogo/tiposGrado",
          filtros
        );
        console.log(response);
        response.data.response.forEach(element => {            
          this.items.push({
            TipoGradoId: element["006TipoDeGrupoId"],
            Nombre: element["008Nombre"],
            Activo: element["008Activo"]
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