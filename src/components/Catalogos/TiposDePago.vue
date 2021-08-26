<template>
  <div>
    <router-link :to="{ name: 'Create' }" class="button is-success mt-5"
      >Add New</router-link
    >
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
          <th>Folio</th>
          <th>Concepto</th>
          <th>Monto</th>
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.TipoDePagoId">
          <td>{{ item.TipoDePagoId }}</td>
          <td>{{ item.Nombre }}</td>
          <td>{{ item.Monto }}</td>
          <td class="has-text-centered">
            <router-link
              :to="{ name: 'Edit', params: { id: item.product_id } }"
              class="button is-info is-small"
              >Edit</router-link
            >
            <a
              class="button is-danger is-small"
              @click="deleteProduct(item.product_id)"
              >Delete</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 
<script>
// import axios
import axios from "axios";
 
export default {
  name: "ProductList",
  data() {
    return {
      items: [],
    };
  },
 
  created() {
    this.getTiposDePago();
  },
 
  methods: {
    // Get All Products
    async getTiposDePago() {
      try {
        const response = await axios.get("http://castelazo.edu.mx/app/tiposDePago");        
        response.data.forEach(element => {
          this.items.push({
            TipoDePagoId : element["001TipoDePagoId"],
            Nombre: element["001Nombre"],
            Monto: element["001Monto"]
          });
        });            
        console.log(this.items);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
 
<style>
</style>