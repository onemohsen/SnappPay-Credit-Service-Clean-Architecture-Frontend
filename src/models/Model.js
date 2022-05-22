import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {

  // Define a base url for a REST API
  baseURL() {
    return (import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1');
  }

  // Implement a default request method
  request(config) {
    return this.$http.request(config)
  }
}