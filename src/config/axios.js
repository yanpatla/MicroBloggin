import axios from "axios";
const clienteAxios = axios.create({
  baseURL: "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com",
});

export default clienteAxios;
