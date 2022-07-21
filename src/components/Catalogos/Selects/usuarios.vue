<template>
  <div>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>        
      <select class="form-control" v-model="valor" @change="seleccionar()" :disabled="disabled"> 
        <option value="-1">Seleccionar Periodo</option>       
        <option v-for="(element, index) in items" :key="index" :value="element['UsuarioId']">{{ element["Nombre"] }}</option>
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
    usuarioId: Number,
    titulo: { type: Boolean, required: true, default: true},
    disabled: Boolean
  },
  created() {
      this.getUsuarios();
      
      if(this.$props.usuarioId > 0)
        this.valor = this.$props.usuarioId;
  },
  computed: {},
  methods: {
    async getUsuarios() {
      try {
        this.isLoading = true;        
        const filtros = {
          usuario: {            
            activo: 1
          }
        };

        const response = await axios.post(
          routeAPI + "auth/usuarios",
          filtros
        );
        
        if (!response.data.hayError){
          if (response.data.response.length > 0){
            response.data.response.forEach(element => {            
            this.items.push({
              UsuarioId: element["019UsuarioId"],
              Nombre: element["019Nombre"] + " " + element["019ApellidoPaterno"] + " " + element["019ApellidoMaterno"],
              Activo: element["005Activo"]
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