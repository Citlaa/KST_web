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
        <option value="-1">Seleccionar tipo de pago</option>
        <option
          v-for="(element, index) in items"
          :key="index"
          :value="element['TipoDePagoId']"
          >{{ element["Nombre"] }}</option
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
  emits: ["seleccionarTipoDePago"],
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
    tipoDePagoId: Number,
    TipoDeCicloEscolarId: Number,
    titulo: { type: Boolean, required: true, default: true },
    disabled: Boolean,
  },
  created() {
    this.getTiposDePago();

    if (this.$props.tipoDePagoId > 0) this.valor = this.$props.tipoDePagoId;
  },
  computed: {},
  methods: {
    async getTiposDePago() {
      try {
        this.isLoading = true;

        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/tiposDePago",
          filtros
        );
        
        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
                 
              

            response.data.response.forEach((element) => {              
              this.items.push({
                TipoDePagoId: element["001TipoDePagoId"],
                Nombre: element["001Nombre"],
                Monto: Number(element["001Monto"]),
                TipoDeCicloEscolarId: Number(element["002TipoDeCicloEscolarId"]),                
                Activo: element["001Activo"],
              });
            });

            if(this.$props.TipoDeCicloEscolarId > 0){
              this.items = this.items.filter(i => i.TipoDeCicloEscolarId == this.$props.TipoDeCicloEscolarId);
            }
          }
        } else {
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
    seleccionar: function() {
      let _item = this.items.find(i => i.TipoDePagoId === 1);

      this.valor > 0
        ? this.$emit(this.$props.funcion, { id: this.valor, monto: _item.Monto})
        : this.$emit(this.$props.funcion, null);
    },
  },
};
</script>
