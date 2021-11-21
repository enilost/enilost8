<template>
  
    <v-app>
      <Header></Header>
      <v-main >
      <router-view></router-view>
      </v-main>
      <Footer></Footer>
    </v-app>
 
</template>

<script>
import Header from "./components/HeadFoot/header.vue";
import Footer from "./components/HeadFoot/footer.vue";
import { mapActions, mapGetters } from "vuex";


export default {
  name: "App",
  components: {
   Footer,
   Header,
  },
  data: () => ({}),
  methods:{
    ...mapActions(["ID_FROM_BASE_ACTION"]),
  },
  computed:{
    ...mapGetters(["USER_GETT"]),
  },
  async mounted(){
    await this.ID_FROM_BASE_ACTION();
  }
};
</script>

<style lang="">

</style>