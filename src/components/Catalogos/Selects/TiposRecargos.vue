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
        <option value="-1">Seleccionar recargo</option>
        <option
          v-for="(element, index) in items"
          :key="index"
          :value="element['TipoDeRecargoId']"
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
  emits: ["seleccionarTipoDeRecargo"],
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
    tipoDeRecargoId: Number,
    TipoDeCicloEscolarId: Number,
    titulo: { type: Boolean, required: true, default: true },
    disabled: Boolean,
  },
  created() {
    this.getTiposDeRecargo();

    if (this.$props.tipoDeRecargoId > 0) this.valor = this.$props.tipoDeRecargoId;
  },
  computed: {},
  methods: {
    async getTiposDeRecargo() {
      try {
        this.isLoading = true;

        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "administracion/tiposDeRecargo",
          filtros
        );
        
        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {              
              this.items.push({
                TipoDeRecargoId: element["003TipoDeRecargoId"],
                Nombre: element["003Nombre"],
                Monto: "$" + element["003Monto"],
                TipoDeCicloEscolarId: Number(element["003TipoDeCicloEscolarId"]),                
                Activo: element["003Activo"],
              });
            });

            if(this.$props.TipoDeCicloEscolarId > 0){
              this.items = this.items.filter(i => i.TipoDeCicloEscolarId == this.$props.TipoDeCicloEscolarId);
            }
          }
        } else {
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
    seleccionar: function() {

      let _item = this.items.find(i => i.TipoDeRecargoId === this.valor);

      this.valor > 0
        ? this.$emit(this.$props.funcion, { TipoDeRecargoId: this.valor, Nombre: _item.Nombre, Monto: _item.Monto})
        : this.$emit(this.$props.funcion, null);
    },
  },
};
</script>
