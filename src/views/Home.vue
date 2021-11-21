<template lang="">
  <v-container>
    <v-carousel
    cycle
    height="500"
    hide-delimiter-background
    show-arrows-on-hover
    class="mb-4"
    >
      <v-carousel-item
        v-for="(slide, i) in ADS_PROMO_GETT"
        :key="i"
        :src="slide.img"
        @click.stop="modal(slide.img)"
      >
        <v-row
          class="fill-height mx-3"
          align="center"
          justify="center"
          style="height: auto;"
          pointer
        >
          <div class="text-h4 white--text shdw px-2 pt-4" 
          @click.stop="routeSlide(slide.key)"
          v-if="USER_UID === slide.id"
          height="auto"
          >
            {{ slide.title }} <p>Редактировать</p>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-divider></v-divider>
    <v-row class="mx-2 my-4" grid-list-lg>
      <card v-for="i in paginationHome"
        :key="i.key" 
        @routeCard="routeCard"
        :card="i"
        @modal="modal"
        >
        </card>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="7"
      ></v-pagination>
    </div>
    <modal v-bind:src="src"></modal>
  </v-container>
</template>

<script>

import card from "@/components/card";
import modal from "@/components/imgModal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    card,
    modal
  },
  data() {
    return {
      src:'',
      page: 1,
      pages: 0,
      itemInPages: 7,
    };
  },
  methods: {
    ...mapActions(["ALL_ADS_ACTION","IS_SHOW_MODAL_ACTION"]),
    //*редактирование в слайдере
    routeSlide(id){
      this.$router.push({
        name:'Detail',
        params: {
          id: id,
        },
        })
    },
    //*редактирование в картах, емитится из дочернего компонента карточки
    routeCard(id){
      this.$router.push({
        name:'Detail',
        params: {
          id: id,
        },
      })
    },
    //*вызов модалки, емитится из дочернего ком-та карточки, которая присылает путь к картинке
    //*этот путь пропсом прокидывается в модалку
    //*запускает экшен, в котором тогглится переменная тру/фолс
    //*а в модалке ватчер на нее, при изменении тригерит включение модалки
    modal(src){
      this.src = src;
      this.IS_SHOW_MODAL_ACTION();
    },
  },
  computed: {
    ...mapGetters(["ADS_GETT","ADS_PROMO_GETT","USER_UID"]),
    paginationHome(){
      const pagin = this.ADS_GETT.slice((this.page - 1)*this.itemInPages, this.page * this.itemInPages)
      return pagin
    }
  },
  watch: {
    ADS_GETT(){
      this.pages = Math.ceil(this.ADS_GETT.length / this.itemInPages)
    },
    //*меняет страницу на 1, если находясь на других страницах пагинации пользователь щелкнул на главную в хедере, если query урла пустой
    "$route.query"(){
      if (!this.$route.query.page) {
        this.page = 1
      }
    },
    //*добавляет query параметр при пагинации(смене страниц)
    page( newValP ){
      if (newValP != +this.$route.query.page ) { 
        this.$router.push({
          name: "Home",
          query: {
          page: this.page,
          },
        });
      }
    }
  },
  mounted(){
    this.ALL_ADS_ACTION()
    this.page =  +this.$route.query.page || 1
    
  }
};
</script>
<style lang="scss">
.shdw{
  box-shadow: inset 50px 50px 50px rgba(8, 33, 70, 0.527) ;
  cursor: pointer;
  transition-property: all;
  transition-duration: 0.5s;
  &:hover{
    box-shadow: inset 50px 50px 50px rgba(249, 250, 252, 0.733) ;
    color: black !important;
    transition-property: all;
    transition-duration: 0.5s;
  }
}
</style>
