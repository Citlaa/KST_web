let timer;
import axios from "axios";
import routeAPI from "@/js/api";

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
    });
  },
  async auth(context, payload) {
    let url = routeAPI + "auth/usuarios";
    const data = {
      usuario: {
        email: payload.email,
        password: payload.password,
      },
    };

    const response = await axios.post(url, data);
    
    if (response.data.hayError) {
      console.log(response);
      const error = new Error(
        response.data.error ||
          'No se puedo autenticar, favor de volverlo a intentar.'
      );
      throw error;
    }

    if(response.data.response.length <= 0){
      const error = new Error(
        response.data.error ||
          'El usuario o la contraseña no coincide, favor de verificarlo.'
      );
      throw error;
    }
    
    const expiresIn = +999 * 1000;
    const expirationDate = new Date().getTime() + expiresIn;    

    localStorage.setItem("userId", response.data.response[0]['019Activo']);
    localStorage.setItem("tokenExpiration", expirationDate);

    // timer = setTimeout(function() {
    //   context.dispatch("autoLogout");
    // }, expiresIn);

    context.commit("setUser", {
      userId: response.data.response[0]['019Activo'],
    });
  },
  logout(context) {
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);
    
    context.commit("setUser", {
      userId: null,
    });    
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
