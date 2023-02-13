<!-- create generic form component add into ext library to use -->
<template>
  <Form @submit="onSubmit" class="form-group" style="text-align: initial">
    <div
      class="form-outline"
      v-for="{ as, name, label, ref, ...attrs } in schema.fields"
      :key="name"
    >
      <label :for="name" class="form-label"></label>
      <Field class="form-control" :placeholder="label" :as="as" :id="name" :name="name" v-bind="attrs" :rules="name === 'email' ? 'required|email' : name === 'password' ? 'required|min:6' : name === 'confirmPassword' ? 'required|min:6' : 'required'"/>
      <ErrorMessage class="error-message" as="div" :name=name v-slot="{ message }">
        <p>{{ message }}</p>
      </ErrorMessage>
    </div>
    <!-- btn component -->
    <!-- <button class="submit-btn">{{ btnLabel }}</button> -->
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

// Define the rule globally
defineRule('required', required);
// Generates a French message locale generator
configure({
  generateMessage: localize('fr', {
    messages: {
      required: 'Ce champ est obligatoire',
    },
  }),
});

export default {
  components: {
    // Form
  },

  props: {
    schema: {
      type: Object,
      required: true,
    },

    btnLabel: {
      type: String,
      default: 'Creer',
      required: false,
    }
  },

  data() {
    return {
      admin: false,
      newItems: [{description: ''}],
      newSale: {
        title: '',
        description: '',
        items: [],
      },
      lots: [{
        description: ''
      }],
      search: '',
      lastQueryUrl: ''
    }
  },

  methods: {
    onSubmit(values) {
      this.$emit('submitForm', JSON.stringify(values, null, 2))
    },
  }
}
</script>

<style scoped>
.submit-btn {
  background: hsl(101deg 94% 36%);
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}
.submit-btn:hover, .submit-btn:focus, .submit-btn:active, .submit-btn.active, .open>.dropdown-toggle.submit-btn {
    color: #fff;
    transition: opacity 0.5s;  
    opacity: 0.9;
}
.error-message {
  color: red;
  font-size: 13px;
  margin-bottom: 0;
}
.form-outline {
  position: relative;
  width: 100%;
}
.form-label {
  font-size: 16px;
}
</style>