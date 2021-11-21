<template lang="">
    <v-container>
      <v-subheader>Редактировать </v-subheader>
          <v-sheet
            color="white"
            elevation="3"
            height="auto"
            max-width="500"
            class="px-4 py-6  mx-auto"
          >
       <form class="" > 
      <v-text-field
        class="mb-4"
        v-model="title"
        :error-messages="TitleError"
        label="Название"
        required
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
      ></v-text-field>
      
      <v-textarea
        class="mb-4"
        outlined
        name="input-7-4"
        label="Описание"
        v-model="description"
        :error-messages="DescriptionError"
        @input="$v.description.$touch()"
        @blur="$v.description.$touch()"
      ></v-textarea>

      <!-- <v-btn @click="load" color="blue lighten-3">
        Загрузить
        <v-icon
        right
      >
        mdi-cloud-upload
      </v-icon>
      </v-btn> -->

      <v-file-input
        show-size
        truncate-length="15"
        label="изменить изображение"
         v-model="img"
        @change="fileChange"
        accept="image/png, image/jpeg, image/bmp, image/jpg"
      ></v-file-input>
<!-- v-model="img" -->
      <v-row class="mt-6 mb-4">
        <v-img v-if="cardId"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="150"
          max-width="250"
          :src="imgSRCforPage || cardId.img"
        ></v-img>
      </v-row>
      <v-switch
        v-if="cardId"
        :value="cardId.promo"
        v-model="isSwitch"
        label="Разместить в слайдере?"
        color="indigo darken-3"
        hide-details
      ></v-switch>

      <v-btn
        color="blue lighten-3"
        class="mt-4"
        @click="submit"
        :loading="LOADING_GETT"
      >
        Редактировать
      </v-btn>
    </form>
  </v-sheet>
          <v-snackbar
          v-if="snackbar"
          v-model="snackbar"
          :timeout="3000"
          top
        >
          {{ snackbarText }}
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
</v-container>
</template>
<script>
        /* eslint-disable */

import { mapActions, mapGetters } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "RedactMem",
  components: {},
  data() {
    return {
      title:'',
      description:'',
      isSwitch: false,
      img: null,
      imgSRCforPage: null,
      snackbar: false,
      snackbarText: 'Изменения вступили в силу'
    };
  },
  methods: {
    ...mapActions(["ALL_ADS_ACTION","REDACT_AD_ACTION"]),
    async submit(){
      if (this.$v.$invalid ) {
        this.$v.$touch();
        return;
      }
      const item = {
        title: this.title,
        description: this.description,
        img: this.img || this.cardId.img,
        promo: this.isSwitch,
        key: this.cardId.key
      }
      try {
        await this.REDACT_AD_ACTION(item);
        this.imgSRCforPage = null;
        this.img = null;
        this.snackbar = true
        // this.$router.push({ name: 'MyMems'})
      } catch (error) {
        console.log(error);
      }
    },

    //*смена картинки
    fileChange(){
      if (!this.imgSRCforPage && this.img) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imgSRCforPage = reader.result
        }
        reader.readAsDataURL(this.img)
      }
      this.imgSRCforPage = null;
    }
  },
  computed: {
    ...mapGetters(["ADS_GETT","LOADING_GETT"]),
    //*нужная карта по query URL
    cardId() {
      let a = this.ADS_GETT.find((e) => {
        return e.key == this.$route.params.id;
      });
      return a;
    },
    //*ошибка заголовка
    TitleError(){
      const errors = []
      if (!this.$v.title.$dirty) {
        return errors
      }
      !this.$v.title.required && errors.push('Заполните поле')
      return errors
    },
    //*ошибка описания
    DescriptionError(){
      const errors = []
      if (!this.$v.description.$dirty) {
        return errors
      }
      !this.$v.description.required && errors.push('Заполните поле')
      !this.$v.description.minLength && errors.push(`Минимумм ${this.$v.description.$params.minLength.min} символов`)
      return errors
    },
  },
  watch: {},
  validations: {
    title: {required},
    description: {required, minLength: minLength(10)}
  },
  async mounted(){
    let ads = await this.ALL_ADS_ACTION()
    this.title = this.cardId.title
    this.description =this.cardId.description
    this.isSwitch = this.cardId.promo
  }
};
</script>
<style lang="">
</style>