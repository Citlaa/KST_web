<template>
  <div>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>        
      <select class="form-control" v-model="valor" @change="seleccionar()" :disabled="disabled"> 
        <option value="-1">Seleccionar Estado</option>       
        <option v-for="(element, index) in items" :key="index" :value="element['TiposEstadoAlumnoId']">{{ element["Nombre"] }}</option>
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
    estadoAlumnoId: Number,
    titulo: { type: Boolean, required: true, default: true},
    disabled: Boolean
  },
  created() {
      this.getEstadosAlumnos();
      
      if(this.$props.estadoAlumnoId > 0)
        this.valor = this.$props.estadoAlumnoId;
  },
  computed: {},
  methods: {
    async getEstadosAlumnos() {
      try {
        this.isLoading = true;        
        const filtros = {
          filtro: {            
            activo: 1
          }
        };

        const response = await axios.post(
          routeAPI + "catalogo/estadosDeAlumnos",
          filtros
        );
        
        if (!response.data.hayError){
          if (response.data.response.length > 0){
            response.data.response.forEach(element => {            
            this.items.push({
              TiposEstadoAlumnoId: element["014TiposEstadoAlumnoId"],
              Nombre: element["014Nombre"],
              Activo: element["014Activo"]
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