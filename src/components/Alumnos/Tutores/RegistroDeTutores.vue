<template>
  <div class="container is-max-desktop">
    <div class="col-12" id="Titulo">
      <h1 class="titulo_azul">Registro de Padre/Tutor</h1>
      <div class="line_red"></div>
    </div>
    <section id="filtro">
      <div class="col-12 row filtros_div" id="filtros_div">
        <div class="col-12 filtro_titulo">
          <div class="row">
            <div class="col-10">
              <h1 class="col-10">Favor de indicar filtros</h1>
            </div>
            <div
              class="col-2"
              @click="mostrarFiltros = !mostrarFiltros"
              :key="mostrarFiltros"
            >
              <i
                class="fas fa-angle-down"
                v-if="!mostrarFiltros"
                style="float: right;"
              ></i>
              <i
                class="fas fa-angle-up"
                v-if="mostrarFiltros"
                style="float: right;"
              ></i>
            </div>
          </div>
        </div>
        <div v-if="mostrarFiltros" class="col-12 row">
          <div class="col-4">
            <label>Nombre</label>
            <input
              class="form-control"
              type="search"
              v-model="filtros.filtro_nombre"
            />
          </div>
          <div class="col-4">
            <label>Apellido Paterno</label>
            <input
              class="form-control"
              type="search"
              v-model="filtros.filtro_apellidoPaterno"
            />
          </div>
          <div class="col-4">
            <label>Apellido Materno</label>
            <input
              class="form-control"
              type="search"
              v-model="filtros.filtro_apellidoMaterno"
            />
          </div>
          <div class="col-4">
            <label class="activo_label">Activo</label>
            <select class="form-control" v-model="filtros.filtro_activo">
              <option value="-1">Seleccionar Activo</option>
              <option value="1">Si</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>
        <div v-if="mostrarFiltros" class="filtro_footer">
          <button
            class="button is-default btn-sm mr-1"
            @click="limpiarFiltros()"
          >
            Mostrar Todo
          </button>
          <button class="button is-primary btn-sm" @click="getTutores()">
            Buscar
          </button>
        </div>
      </div>
    </section>
    <section id="data_table">
      <div class="col-12" style="margin-bottom:100px;">
        <button
          class="button is-primary mt-5 mb-1 align-left"
          @click="abrirModal('Agregar', true, {})"
        >
          <i class="fas fa-plus" style></i>&nbsp;&nbsp;Agregar padre/tutor
        </button>
        <br />
        <div
          class="row col-12"
          v-if="items.length <= 0"
          style="display: grid; justify-content: center;"
        >
          <p>No hay registros</p>
        </div>
        <div id="bootstrap_table" v-else>
          <div class="col-3 mr-0 align-rigth">
            <input
              class="form-control"
              v-model="filter"
              type="search"
              placeholder="Buscar"
              @blur="currentPage = 1"
            />
          </div>
          <b-table
            striped
            hover
            outlined
            :items="items"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
          >
            <template v-slot:cell(Activo)="data">
              <button
                class="btn btn-default"
                v-if="data.item.Activo == 1"
                :key="data.item.PadreId.val"
                style="cursor: default;"
              >
                <i class="far fa-check-square" style="color: green"></i>
              </button>
              <button
                v-else
                class="btn btn-default"
                :key="data.item.PadreId.val"
                style="cursor: default;"
              >
                <i class="far fa-times-circle" style="color: red"></i>
              </button>
            </template>
            <template v-slot:cell(opciones)="data">
              <button
                class="button is-default is-small"
                @click="abrirModal('', false, data.item)"
                value="Detalles"
                title="Ver Detalles"
              >
                <i class="far fa-eye"></i>
              </button>
              <button
                class="button is-info is-small"
                @click="abrirModal('Editar', true, data.item)"
                value="Editar"
                title="Editar"
              >
                <i class="far fa-edit"></i>
              </button>
              <button
                class="button is-danger is-small"
                :disabled="data.item.Activo == 0"
                @click="cancelar(data.item)"
                value="Eliminar"
                title="Cancelar"
              >
                <i class="fas fa-ban"></i>
              </button>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
          ></b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import routeAPI from "@/js/api";

export default {
  data() {
    return {
      isLoading: false,
      mostrarFiltros: true,
      mostrarModal: false,
      filtros: {
        filtro_nombre: "",
        filtro_apellidoPaterno: "",
        filtro_apellidoMaterno: "",
        filtro_activo: "1",
      },
      items: [],
      perPage: 5,
      currentPage: 1,
      fields: [
        {
          key: "AlumnoId.val",
          label: "Folio",
          sortable: true,
        },
        {
          key: "NombreCompleto.val",
          label: "Nombre",
          sortable: true,
        },
        {
          key: "Curp.val",
          label: "CURP",
          sortable: true,
        },
        {
          key: "NumeroDeControl.val",
          label: "Número de Control",
          sortable: true,
        },
        {
          key: "Genero.val",
          label: "Genero",
          sortable: true,
        },
        {
          key: "TipoEstadoAlumno.val.Nombre",
          label: "Estado",
          sortable: true,
        },
        {
          key: "Activo",
          label: "Activo",
          sortable: true,
        },
        {
          label: "Opciones",
          key: "opciones",
        },
      ],
      filter: "",
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    async getTutores() {
      try {
        this.isLoading = true;
        this.items = [];
        const filtros = {
          filtro: {},
        };

        if (this.filtros.filtro_nombre != "")
          filtros.filtro.nombre = this.filtros.filtro_nombre;
        if (this.filtros.filtro_apellidoPaterno != "")
          filtros.filtro.apellidoPaterno = this.filtros.filtro_apellidoPaterno;
        if (this.filtros.filtro_apellidoMaterno != "")
          filtros.filtro.apellidoMaterno = this.filtros.filtro_apellidoMaterno;
        if (this.filtros.filtro_activo != "")
          filtros.filtro.activo = Number(this.filtros.filtro_activo);

        const response = await axios.post(
          routeAPI + "alumnos/tutores",
          filtros
        );

        console.log(response.data.response);
        if (!response.data.hayError) {
          response.data.response.forEach((element) => {
            this.items.push({
              PadreId: {
                val: element["012PadreId"],
              },
              Nombre: {
                val: element["012Nombre"],
              },
              NombreCompleto: {
                val:
                  element["012Nombre"] +
                  " " +
                  element["012ApellidoPaterno"] +
                  " " +
                  element["012ApellidoMaterno"],
              },
              ApellidoPaterno: {
                val: element["012ApellidoPaterno"],
              },
              ApellidoMaterno: {
                val: element["012ApellidoMaterno"],
              },
              Domicilio: {
                val: element["012Domicilio"],
              },
              Activo: Number(element["012Activo"]),
            });
          });
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
    limpiarFiltros() {
      this.filtros.filtro_nombre = "";
      this.filtros.filtro_apellidoPaterno = "";
      this.filtros.filtro_apellidoMaterno = "";
      this.filtros.filtro_activo = "1";
      this.getTutores();
    },
  },
};
</script>
