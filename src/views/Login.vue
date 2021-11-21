<template lang="">
  <div class="custom-div">
    <div class="custom-div__inner">
      <h3 class="text-center">Вход</h3>
      <form > 
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :counter="17"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        
        <v-btn
          color="blue lighten-3"
          class="mr-4"
          @click="submit"
          :loading="LOADING_GETT"
          :disabled="LOADING_GETT"
        >
          Войти
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
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: '',
      password : '',
      snackbar:false
    };
  },
  methods: {
    ...mapActions(["LOGIN_ACTION","ERROR_ACTION"]),
    //*очистить форму
    clear () {
        this.$v.$reset()
        this.password = ''
        this.email = ''
    },
    //*логин
    async submit() {
      if (this.$v.$invalid) {
      this.$v.$touch();
      return;
      }
      const user = {
        email:this.email,
        password:this.password
      }
      try {
        await this.LOGIN_ACTION(user)
        this.$router.push({name:'Home'})
      } catch (error) {
        this.snackbar = true
      }
    },
  },
  computed: {
    ...mapGetters(['LOADING_GETT','ERROR_GETT']),
    //*ошибки валидации емейла
    emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) {
          return errors
        }
        !this.$v.email.email && errors.push('Введите существующий email')
        !this.$v.email.required && errors.push('Заполните поле')
        return errors
    },
    //*ошибки валидации пароля
    passwordErrors(){
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push('Заполните поле')
      !this.$v.password.minLength && errors.push(`Пароль должен быть длинне ${this.$v.password.$params.minLength.min} символов`)
      return errors
    }
  },
  watch: {},
   validations: {
    password: { required, minLength: minLength(4) },
    email: { email, required },
  },
  mounted(){
    if (this.$route.query.ErrorAuthGuard) {
      this.snackbar = true
      this.ERROR_ACTION('Войдите в систему')
    }
  }
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