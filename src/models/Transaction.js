import Model from './Model'

export default class Transaction extends Model {
  // Set the resource route of the model
  resource() {
    return 'transactions'
  }
}