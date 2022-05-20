import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {

  // Define a base url for a REST API
  baseURL() {
    return 'http://snapp-pay-credit-service.test/api/v1'
  }

  // Implement a default request method
  request(config) {
    return this.$http.request(config)
  }
}