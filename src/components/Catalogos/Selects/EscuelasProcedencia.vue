<template>
  <section>
    <div class="col-12">
      <label v-if="titulo" class="activo_label">{{ label }}</label>
      <select
        class="form-control"
        v-model="valor"
        @change="seleccionar()"
        :disabled="disabled"
      >
        <option value="-1">Seleccionar Escuela</option>
        <option
          v-for="(element, index) in items"
          :key="index"
          :value="element['EscuelaId']"
          >{{ element["Nombre"] }}</option
        >
      </select>
    </div>
  </section>
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
    escuelaId: Number,
    label: String,
    funcion: String,
    tipoDeCicloEscolarId: Number,
    titulo: { type: Boolean, required: true, default: true },
    disabled: Boolean,
  },
  created() {
    this.getEscuelas();

    if (this.$props.escuelaId > 0)
      this.valor = this.$props.tipoDeCicloEscolarId;
  },
  computed: {},
  methods: {
    async getEscuelas() {
      try {
        this.isLoading = true;

        const filtros = {
          filtro: {
            activo: 1,
          },
        };

        const response = await axios.post(
          routeAPI + "catalogo/escuelas",
          filtros
        );

        response.data.response.forEach((element) => {
          this.items.push({
            EscuelaId: element["015EscuelaDeProcedenciaId"],
            Nombre: element["015Nombre"],
            Activo: element["015Activo"],
          });
        });
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    seleccionar: function() {
      this.valor > 0
        ? this.$emit(this.$props.funcion, this.valor)
        : this.$emit(this.$props.funcion, null);
    },
  },
};
</script>
