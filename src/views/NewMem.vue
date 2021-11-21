<template lang="">
<v-container>
  <v-subheader>Загрузить новый мем </v-subheader>
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

        <v-file-input
          show-size
          truncate-length="15"
          label="прикрепите изображение"
          v-model="img"
          @change="fileChange"
          :error-messages="FileError"
          accept="image/png, image/jpeg, image/bmp, image/jpg"
        ></v-file-input>

        <v-row class="mt-6 mb-4">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="150"
            max-width="250"
            :src="imgSRCforPage || 'https://picsum.photos/id/11/10/6'"
          ></v-img>
        </v-row>
        <v-switch
          v-model="isSwitch"
          label="Разместить в слайдере?"
          color="indigo darken-3"

          hide-details
        ></v-switch>

        <v-btn
          color="blue lighten-3"
          class="mt-4"
          @click="submit"
          :disabled="LOADING_GETT"
          :loading="LOADING_GETT"
        >
          Опубликовать
        </v-btn>
      </form>
    </v-sheet>
  </v-container>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
        /* eslint-disable */

export default {
  name: "NewMem",
  components: {
  },
  data() {
    return {
      title:'',
      description:'',
      img:null,
      isSwitch: true,
      imgSRCforPage:'',
      FileErrorText:''
    };
  },
  methods: {
    ...mapActions(["NEW_ADD_ACTION"]),
    //*выбор и загрузка картинки
    fileChange(){
      this.FileErrorText = "";
      if (!this.imgSRCforPage && this.img) {
      const reader = new FileReader()
      reader.onload = e => {
        this.imgSRCforPage = reader.result
      }
      reader.readAsDataURL(this.img)
      }
      this.imgSRCforPage = null
    },
    submit(){
      if (this.$v.$invalid) {//|| !this.img
        this.$v.$touch();
        return;
      }
      if (!this.img) {
        this.$v.$touch();
        this.FileErrorText = 'прикрепите изображение';
        return;
      }
      const item = {
        title: this.title,
        description: this.description,
        promo: this.isSwitch,
        img: this.img,
      }
      try {
        this.NEW_ADD_ACTION(item);
          this.title = '';
          this.description = '';
          this.img = null;
          this.isSwitch =  true;
          this.imgSRCforPage = '';
          this.FileErrorText = '';
          this.$v.$reset();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["LOADING_GETT"]),
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
    //*ошибка отсутствия картинки
    FileError(){
      return this.FileErrorText
    }
  },
  watch: {},
  validations: {
    title: {required},
    description: {required, minLength: minLength(10)}
  },
};
</script>
<style lang="">
</style>