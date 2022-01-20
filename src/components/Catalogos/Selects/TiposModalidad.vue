<template>
  <div>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>        
      <select class="form-control" v-model="valor" @change="seleccionar()" :disabled="disabled">  
        <option value="-1">Seleccionar Modalidad</option>      
        <option v-for="(element, index) in items" :key="index" :value="element['TipoDeModalidadId']">{{ element["Nombre"] }}</option>
      </select>
    </div>
    <cargando v-if="isLoading"></cargando>
  </div>
</template>
<script>
import axios from "axios";
import routeAPI from "@/js/api";

export default {
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
    tipoDeModalidadId: Number,
    titulo: { type: Boolean, required: true, default: true},
    disabled: Boolean
  },
  created() {
      this.getTiposDeModalidad();
      
      if(this.$props.tipoDeModalidadId > 0)
        this.valor = this.$props.tipoDeModalidadId;
  },
  computed: {},
  methods: {
    async getTiposDeModalidad() {
      try {
        this.isLoading = true;        
        const filtros = {
          filtro: {            
            activo: 1
          }
        };

        const response = await axios.post(
          routeAPI + "catalogo/tiposDeModalidad",
          filtros
        );

        if (!response.data.hayError){
          if (response.data.response.length > 0){
            response.data.response.forEach(element => {            
            this.items.push({
              TipoDeModalidadId: element["004TipoModalidadId"],
              Nombre: element["004Nombre"],
              Activo: element["004Activo"]
            });
          });
         }
        }else{
        console.log(response);
        this.$alert(
          "No se pudo obtenera información, favor de volverlo a intentar."
        ); 
      }
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