<template>
  <div>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>
      <select
        class="form-control"
        v-model="valor"
        @change="seleccionar()"
        :disabled="disabled"
      >
        <option value="-1">Seleccionar Ciclo Escolar</option>
        <option
          v-for="(element, index) in items"
          :key="index"
          :value="element['TipoDeCicloEscolarId']"
          >{{ element["AñoDeInicio"] }} - {{ element["AñoDeTermino"] }}</option
        >
      </select>
    </div>
    <cargando v-if="isLoading"></cargando>
  </div>
</template>
<script>
import axios from "axios";
import routeAPI from "@/js/api";

export default {
  emits: ['seleccionarCicloEscolar'],
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
    tipoDeCicloEscolarId: Number,
    titulo: { type: Boolean, required: true, default: true },
    disabled: Boolean,
    actual: { type: Boolean, default: false }
  },
  created() {
    this.getTiposDeCicloEscolar();

    if (this.$props.tipoDeCicloEscolarId > 0)
      this.valor = this.$props.tipoDeCicloEscolarId;    
  },
  computed: {},
  methods: {
    async getTiposDeCicloEscolar() {
      try {
        this.isLoading = true;

        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/tiposDeCicloEscolarCatalogo",
          filtros
        );
        if (!response.data.hayError){
          if (response.data.response.length > 0){
          response.data.response.forEach((element) => {
          this.items.push({
            TipoDeCicloEscolarId: element["002TipoDeCicloEscolarId"],
            AñoDeInicio: element["002AñoDeInicio"],
            AñoDeTermino: element["002AñoDeTermino"],
            Activo: element["002Activo"],
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
        if (this.$props.actual > 0)
          this.seleccionarActual();

      } catch (err) {
        console.log(err);
      }
    },
    seleccionar: function() {
      this.valor > 0 ? this.$emit(this.$props.funcion, this.valor) : this.$emit(this.$props.funcion, null);
    },
    seleccionarActual: function(){
      const year = new Date().getFullYear();      
      var options = this.items.filter(i => i.AñoDeInicio == year || i.AñoDeTermino == year);
      this.valor = options[options.length - 1].TipoDeCicloEscolarId;     
      
      this.seleccionar();
    }
  },
};
</script>
