<template lang="">
<div class="custom-div">
  <div class="custom-div__inner">
    <h3 class="text-center">Регистрация</h3>
  <form> 
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        :type="show1 ? 'text' : 'password'"
        v-model="password"
        :error-messages="PasswordErrors"
        :counter="17"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>

      <v-text-field
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show2 = !show2"
        :type="show2 ? 'text' : 'password'"
        v-model="confirmPassword"
        :error-messages="confirmPasswordErrors"
        :counter="17"
        label="Сonfirm password"
        required
        @input="$v.confirmPassword.$touch()"
        @blur="$v.confirmPassword.$touch()"
      ></v-text-field>
      
      <v-btn
        color="blue lighten-3"
        class="mr-4"
        @click="submit"
        :loading="LOADING_GETT"
        :disabled="LOADING_GETT"
      >
        Зарегистрироваться
      </v-btn>
      <v-btn @click="clear" color="blue lighten-3">
        Очистить
      </v-btn>
    </form>

    <v-snackbar
        v-if="snackbar"
        v-model="snackbar"
        :timeout="5000"
        top
      >
        {{ ERROR_GETT }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    </div> 
 </div>     
</template>
<script>
import { required, email, minLength,sameAs } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Registration",
  components: {},
  data() {
    return {
      show1: false,
      show2: false,
      email: '',
      password : '',
      confirmPassword : '',
      snackbar:false,
    };
  },
  methods: {
     ...mapActions(["REGISTRATION_ACTION"]),
    clear () {
        this.$v.$reset()
        this.password = ''
        this.email = ''
      },
      async submit () {
        if (this.$v.$invalid) {
        this.$v.$touch();
        return;
        }
        const user = {
          email: this.email,
          password: this.password,
        }
        try {
          await this.REGISTRATION_ACTION(user)
          this.$router.push({name:'Home'})
        } catch (error) {
          this.snackbar = true;
          console.log(error);
        }
      },
  },
  computed: {
    ...mapGetters(['LOADING_GETT',"ERROR_GETT"]),
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Введите существующий email')
      !this.$v.email.required && errors.push('Заполните поле')
      return errors
    },
    PasswordErrors(){
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push('Заполните поле')
      !this.$v.password.minLength && errors.push(`Пароль должен быть длинне ${this.$v.password.$params.minLength.min} символов`)
      return errors
    },
    confirmPasswordErrors(){
      const errors = []
      if (!this.$v.confirmPassword.$dirty) {
        return errors
      }
      !this.$v.confirmPassword.required && errors.push('Заполните поле')
      !this.$v.confirmPassword.sameAs && errors.push('Пароли не совпадают')
      return errors
    }
  },
  watch: {},
   validations: {
    password: { required, minLength: minLength(6) },
    email: { email, required },
    confirmPassword: {required,sameAs: sameAs('password')}
  },
};
</script>
<style lang="scss" >
.custom-div{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &__inner{
    flex: 0 1 500px;
    padding: 10px;
    border: 2px solid rgba(66, 66, 143, 0.466);
    border-radius: 15px;
    align-items: center;
    box-shadow: 3px 5px 15px rgba(66, 66, 143, 0.466);
  }
}
</style>