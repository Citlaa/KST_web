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
        <option value="-1">Seleccionar Grupo</option>
        <option
          v-for="(element, index) in items"
          :key="index"
          :value="element['TipoDeGrupoId']"
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
      ciclosEscolares: [],
      items: [],
    };
  },
  props: {
    label: String,
    funcion: String,
    tipoDeGrupoId: Number,
    titulo: { type: Boolean, required: true, default: true },
    filtrosEstablecidos: {},
    disabled: Boolean,
  },
  created() {
    this.getTipoDeCicloEscolar();
    this.getGrupos();

    if (this.$props.tipoDeGrupoId > 0) this.valor = this.$props.tipoDeGrupoId;
  },
  computed: {},
  methods: {
    async getTipoDeCicloEscolar() {
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

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {
              this.ciclosEscolares.push({
                TipoDeCicloEscolarId: element["002TipoDeCicloEscolarId"],
                Nombre:
                  element["002AñoDeInicio"] + "-" + element["002AñoDeTermino"],
              });
            });
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
    async getGrupos() {
      try {
        this.isLoading = true;
        const filtros = {
          filtro: {
            activo: 1,
          },
        };
        console.log('filtrosEstablecidos');
        console.log(this.filtrosEstablecidos);
        if (this.filtrosEstablecidos.filtro_cicloEscolar != "")
          filtros.filtro.cicloEscolar = this.filtros.filtro_cicloEscolar;
        if (this.filtrosEstablecidos.filtro_nivel != "")
          filtros.filtro.nivel = Number(this.filtros.filtro_nivel);
        if (this.filtrosEstablecidos.filtro_modalidad != "")
          filtros.filtro.modalidad = Number(this.filtros.filtro_modalidad);
        if (this.filtrosEstablecidos.filtro_periodo != "")
          filtros.filtro.periodo = Number(this.filtros.filtro_periodo);
        if (this.filtrosEstablecidos.filtro_grado != "")
          filtros.filtro.grado = Number(this.filtros.filtro_grado);

        const response = await axios.post(
          routeAPI + "administracion/estructurasDeGrupo",
          filtros
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            console.log(response.data.response);
            response.data.response.forEach((element) => {
              this.items.push({
                EstructuraDeGrupoId: element["010EstructuraDeGrupoId"],
                TipoDeCicloEscolar: this.ciclosEscolares.find(
                  (ciclo) =>
                    ciclo.TipoDeCicloEscolarId ===
                    Number(element["002TipoDeCicloEscolarId"])
                ),
                // TipoModalidad: this.modalidades.find(
                //   (modalidad) =>
                //     modalidad.TipoDeModalidadId ===
                //     Number(element["004TipoModalidadId"])
                // ),
                // TipoPeriodo: this.periodos.find(
                //   (per) =>
                //     per.TipoPeriodoId === Number(element["005TipoPeriodoId"])
                // ),
                // TipoDeGrupo: this.tiposDeGrupos.find(
                //   (grupo) =>
                //     grupo.TipoGrupoId === Number(element["006TipoDeGrupoId"])
                // ),
                // TiposNivel: this.tiposDeNivel.find(
                //   (nivel) =>
                //     nivel.TipoNivelId === Number(element["007TiposNivelId"])
                // ),
                TipoGrado: this.tiposDeGrado.find(
                  (grado) =>
                    grado.TipoGradoId === Number(element["008TipoGradoId"])
                ),
                Especialidad: this.especialidades.find(
                  (especialidad) =>
                    especialidad.EspecialidadId ===
                    Number(element["009TipoEspecialidadId"])
                ),
                Activo: element["010Activo"],
              });
            });
          }
        } else
          this.$alert(
            "No se pudo obtenera información, favor de volverlo a intentar."
          );

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
