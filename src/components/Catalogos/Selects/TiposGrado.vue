<template>
  <div>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>        
      <select class="form-control" v-model="valor" @change="seleccionar()" :disabled="disabled">
        <option value="-1">Seleccionar Grado</option>         
        <option v-for="(element, index) in items" :key="index" :value="element['TipoGradoId']">{{ element["Nombre"] }}</option>
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
        if (!response.data.hayError){
          if (response.data.response.length > 0){
          response.data.response.forEach(element => {            
          this.items.push({
            TipoGradoId: element["008TipoGradoId"],
            Nombre: element["008Nombre"],
            Activo: element["008Activo"]
          });
        });
          }
        }else{
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
    seleccionar: function(){                 
        this.$emit(this.$props.funcion, this.valor);
    }
  }
};
</script>