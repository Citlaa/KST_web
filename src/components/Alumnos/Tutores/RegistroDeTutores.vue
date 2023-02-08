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
            <label class="activo_label">Género</label>
            <select class="form-control" v-model="filtros.filtro_genero">
              <option value="-1" selected>Seleccionar Género</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
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
            responsive="sm"
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
    <section id="modal">
      <div v-if="mostrarModal" class="modal_div" id="modal_div">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog modal-xl">
                <div class="modal-content modal-xl">
                  <div class="modal-header">
                    <div class="col-11">
                      <h2 class="modal-title text-center">
                        {{ titutoModal }} Padre/Tutor
                      </h2>
                      <div class="line_red"></div>
                    </div>
                    <a class="button close_modal" @click="mostrarModal = false">
                      <span aria-hidden="true">&times;</span>
                    </a>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <section id="data_tutor">
                        <div class="row seccion_modal">
                          <div class="col-12 seccion_titulo_modal">
                            <h3>Datos del padre o tutor</h3>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Nombre*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.Nombre.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('Nombre')"
                            />
                            <p v-if="!item.Nombre.isValid" style="color: red">
                              Favor de ingresar un nombre
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Apellido Paterno*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.ApellidoPaterno.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('ApellidoPaterno')"
                            />
                            <p
                              v-if="!item.ApellidoPaterno.isValid"
                              style="color: red"
                            >
                              Favor de ingresar un apellido
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 form-group padding-model">
                            <label>Apellido Materno*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.ApellidoMaterno.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('ApellidoMaterno')"
                            />
                            <p
                              v-if="!item.ApellidoMaterno.isValid"
                              style="color: red"
                            >
                              Favor de ingresar un apellido
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-4 padding-model">
                            <label>Género*</label>
                            <select
                              class="form-control"
                              v-model="item.Genero.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('Genero')"
                            >
                              <option value="-1" selected
                                >Seleccionar Género</option
                              >
                              <option value="Femenino">Femenino</option>
                              <option value="Masculino">Masculino</option>
                            </select>
                            <p v-if="!item.Genero.isValid" style="color: red">
                              Favor de ingresar género
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                          <div class="col-8 form-group padding-model">
                            <label>Domicilio*</label>
                            <textarea
                              type="text"
                              class="form-control"
                              rows="1"
                              v-model="item.Domicilio.val"
                              :disabled="!inhabilitar"
                              @blur="limpiarValidez('Domicilio')"
                            />
                            <p
                              v-if="!item.Domicilio.isValid"
                              style="color: red"
                            >
                              Favor de ingresar domicilio
                              <i
                                class="far fa-times-circle"
                                style="color: red"
                              ></i>
                            </p>
                          </div>
                        </div>
                      </section>
                      <section id="data_tutor">
                        <div class="row seccion_modal">
                          <div class="row col-12">
                            <div class="col-12 seccion_titulo_modal">
                              <h3>Alumnos</h3>                                                            
                            </div>                            
                            <div class="col-12">
                              <div
                                v-if="item.alumnos.val.length <= 0"
                                class="row"
                                style="display: grid; justify-content: center;"
                              >
                                <div class="col-12">
                                  <p>No hay alumnos del padre o tutor</p>
                                </div>
                              </div>
                              <div v-else>                                
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th>Folio</th>
                                      <th>Nombre</th>
                                      <th>Apellido Paterno</th>
                                      <th>Apellido Materno</th>
                                      <th>Parentesco</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="alumno in item.alumnos.val"
                                      :key="alumno.AlumnoId"
                                    >
                                      <td>{{ alumno.AlumnoId }}</td>
                                      <td>{{ alumno.Nombre }}</td>
                                      <td>{{ alumno.ApellidoPaterno }}</td>
                                      <td>{{ alumno.ApellidoMaterno }}</td>
                                      <td>{{ alumno.NombreParentesco }}</td>
                                      <td>
                                        {{ }}
                                      </td>                                      
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="button is-primary"
                      v-if="inhabilitar"
                      @click="guardarTutor()"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="mostrarModal = false"
                      v-if="inhabilitar"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="mostrarModal = false"
                      v-if="!inhabilitar"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
        filtro_genero: "-1",
        filtro_activo: "1",
      },
      filtro_alumnos: {
        filtro_nombre: "",
        filtro_apellidoPaterno: "",
        filtro_apellidoMaterno: "",
      },
      items: [],
      temIsValid: true,
      perPage: 5,
      currentPage: 1,
      fields: [
        {
          key: "PadreId.val",
          label: "Folio",
          sortable: true,
        },
        {
          key: "NombreCompleto.val",
          label: "Nombre",
          sortable: true,
        },
        {
          key: "Domicilio.val",
          label: "Domicilio",
          sortable: true,
        },
        {
          key: "Genero.val",
          label: "Genero",
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
      item: {
        PadreId: {
          val: null,
          isValid: true,
        },
        Nombre: {
          val: "",
          isValid: true,
        },
        ApellidoPaterno: {
          val: "",
          isValid: true,
        },
        ApellidoMaterno: {
          val: "",
          isValid: true,
        },
        Genero: {
          val: "-1",
          isValid: true,
        },
        Domicilio: {
          val: "",
          isValid: true,
        },
        alumnos: {
          val: [],
          isValid: true,
        },
        parentesco: {
          val: 0,
          isValid: true,
        },
        Activo: {
          val: 0,
        },
      },
      alumnos: {
        val: [],
        isValid: true,
      }
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  created() {
    this.getTutores();   
  },
  watch: {
    mostrarModal: function(newVal) {
      if (!newVal) {
        this.limpiarVariables();
      }
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
        if (this.filtros.filtro_genero > 0)
          filtros.filtro.genero = this.filtros.filtro_genero;
        if (this.filtros.filtro_activo >= 0  )
          filtros.filtro.activo = Number(this.filtros.filtro_activo);

        const response = await axios.post(
          routeAPI + "alumnos/tutores",
          filtros
        );
        
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
              Genero: {
                val: element["012Genero"],
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
      this.filtros.filtro_activo = "-1";
      this.filtros.filtro_genero = "-1";
      this.getTutores();
    },
    limpiarVariables() {
      this.item.PadreId.val = null;
      this.item.Nombre.val = "";
      this.item.ApellidoPaterno.val = "";
      this.item.ApellidoMaterno.val = "";
      this.item.Genero.val = "-1";
      this.item.Domicilio.val = "";
      this.item.alumnos.val = [];
      this.alumnos = [];
      this.filtro_tutores = {
        filtro_nombre: "",
        filtro_apellidoPaterno: "",
        filtro_apellidoMaterno: "",
      };
    },
    abrirModal: function(tipo, inhabilitar, item) {
      this.titutoModal = tipo;
      this.inhabilitar = inhabilitar;    
      
      if (item && item.PadreId && item.PadreId.val && item.PadreId.val > 0){
          this.cargarItem(item);
      }
        
      this.mostrarModal = !this.mostrarModal;
    },
    async getAlumnos(){
        try {
        this.isLoading = true;
        this.item.alumnos.val = [];

        const data = {
          padreId: this.item.PadreId.val,
        };

        const response = await axios.post(
          routeAPI + "alumnos/alumnosDeTutor",
          data
        );

        if (!response.data.hayError) {
          if (response.data.response.length > 0) {
            response.data.response.forEach((element) => {
              var tutor = {
                AlumnoId: element["011AlumnoId"],
                Nombre: element["011Nombre"],
                ApellidoPaterno: element["011ApellidoPaterno"],
                ApellidoMaterno: element["011ApellidoMaterno"],
                ParentescoId: element["016TipoParentescoId"],
                NombreParentesco: element["016Nombre"],
              };

              this.item.alumnos.val.push(tutor);
              console.log(this.item.alumnos);
            });
          }
        } else
          this.$alert(
            "No se pudo obtener información, favor de volverlo a intentar."
          );

        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    cargarItem: async function(item) {
      this.item.PadreId.val = item.PadreId.val;
      this.item.Nombre.val = item.Nombre.val;
      this.item.ApellidoPaterno.val = item.ApellidoPaterno.val;
      this.item.ApellidoMaterno.val = item.ApellidoMaterno.val;
      this.item.Genero.val = item.Genero.val;
      this.item.Domicilio.val = item.Domicilio.val;
      this.item.Activo = item.Activo;
      
      //cargar Alumnos
      this.getAlumnos();
    },
    async cancelar(item) {
      try {
        this.isLoading = true;

        const data = {
          alumno: {
            id: item.PadreId.val,
            Activo: Number(0),
          },
        };

        const response = await axios.post(
          routeAPI + "alumnos/cancelarTutor",
          data
        );
        this.isLoading = false;
        if (!response.data.hayError) {
          this.$alert("El tutor se canceló correctamente.");
          this.getTutores();
        } else {
          console.log(response);
          this.$alert("Sucedio un error, favor de volver a intentarlo.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async guardarTutor() {
      this.validarTutor();
      console.log("guardarAlumno");
      console.log(this.item);
      if (this.itemIsValid) {
        if (this.item.PadreId.val > 0) this.editarTutor();
        else this.agregarTutor();
      } else {
        this.$alert("Favor de completar los datos.");
      }
    },
    limpiarValidez(input) {
      this.item[input].isValid = true;
    },
    async validarTutor() {
      this.itemIsValid = true;

      if (this.$store.getters.userId <= 0 || this.$store.getters.userId == undefined) {
        this.itemIsValid = true;
        this.$router.push({ name: "Login" });
      }

      if (this.item.Nombre.val === "") {
        this.item.Nombre.isValid = false;
        this.itemIsValid = false;
      }
      if (
        this.item.ApellidoPaterno.val === "" &&
        this.item.ApellidoMaterno.val === ""
      ) {
        if (this.item.ApellidoPaterno.val === "") {
          this.item.ApellidoPaterno.isValid = false;
        }
        if (this.item.ApellidoMaterno.val === "") {
          this.item.ApellidoMaterno.isValid = false;
        }
        this.itemIsValid = false;
      }
      if (this.item.Genero.val === "") {
        this.item.Genero.isValid = false;
        this.itemIsValid = false;
      }
      if (this.item.Domicilio.val === "") {
        this.item.Domicilio.isValid = false;
        this.itemIsValid = false;
      }      
    },
    async agregarTutor() {         
      //Guardamos
      const data = {
        tutor: {
          Nombre: this.item.Nombre.val,
          ApellidoPaterno: this.item.ApellidoPaterno.val,
          ApellidoMaterno: this.item.ApellidoMaterno.val,
          Genero: this.item.Genero.val,
          Domicilio: this.item.Domicilio.val,
          UsuarioId: this.$store.getters.userId,
          FechaRegistro: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          Activo:  "1",
        },
      };

      try {
        this.isLoading = true;

        const response = await axios.post(
          routeAPI + "alumnos/agregarTutor",
          data
        );

        this.isLoading = false;

        if (!response.data.hayError) {                                                  
            this.$alert("El tutor se guardó con éxito.");
            this.getTutores();
            this.mostrarModal = false;                    
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editarTutor() {
      //Guardamos
      const data = {
        tutor: {
          PadreId: this.item.PadreId.val,
          Nombre: this.item.Nombre.val,
          ApellidoPaterno: this.item.ApellidoPaterno.val,
          ApellidoMaterno: this.item.ApellidoMaterno.val,
          Genero: this.item.Genero.val,
          Domicilio: this.item.Domicilio.val,     
          UsuarioId: this.$store.getters.userId,   
          FechaRegistro: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),  
          Activo: this.item.Activo,
        },
      };

      try {
        this.isLoading = true;

        const response = await axios.post(
          routeAPI + "alumnos/editarTutor",
          data
        );       

        if (!response.data.hayError) {
          this.isLoading = false;
                    
          this.$alert("El tutor se guardó con éxito.");
          this.mostrarModal = false;
          this.getTutores();
                                
        } else {
          console.log(response);
          this.$alert("No se pudo guardar, favor de volverlo a intentar.");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.modal-content {
  width: 1140px;
}

.seccion_modal {
  padding: 10px;
  margin: 5px;
  width: 99%;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.seccion_titulo_modal {
  /* display: flex; */
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
}
</style>