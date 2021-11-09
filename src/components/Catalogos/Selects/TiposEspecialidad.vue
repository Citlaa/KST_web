<template>
  <div>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>        
      <select class="form-control" v-model="valor" @change="seleccionar()" :disabled="disabled">        
        <option v-for="(element, index) in items" :key="index" :value="element['TipoGrupoId']">{{ element["Nombre"] }}</option>
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
    tipoEspecialidadId: Number,
    titulo: { type: Boolean, required: true, default: true},
    disabled: Boolean
  },
  created() {
      this.getEspecialidades();
      
      if(this.$props.tipoEspecialidadId > 0)
        this.valor = this.$props.tipoEspecialidadId;
  },
  computed: {},
  methods: {
    async getEspecialidades() {
      try {
        this.isLoading = true;        
        const filtros = {
          filtro: {            
            activo: 1
          }
        };

        const response = await axios.post(
          routeAPI + "catalogo/especialidades",
          filtros
        );
        
        response.data.response.forEach(element => {            
          this.items.push({
            TipoGrupoId: element["009EspecialidadId"],
            Nombre: element["009Nombre"],
            Activo: element["009Activo"]
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