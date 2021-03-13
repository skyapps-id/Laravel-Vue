import Vue from 'vue'

import {
  extend,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import {
  email,
  max,
  min,
  max_value,
  min_value,
  numeric,
  required,
  alpha,
} from 'vee-validate/dist/rules'

extend('email', email)
extend('max', max)
extend('min', min)
extend('min_value', min_value)
extend('max_value', max_value)
extend('numeric', numeric)
extend('required', required)
extend('alpha', alpha)

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
