<template lang="">
<div>
<v-app-bar app color="blue lighten-3" height="100"> 
    <v-col>
    <v-row class=" align-center " width="100%">
      <!-- mx-2 -->
      <v-app-bar-nav-icon @click="drawer=!drawer" class="d-flex d-md-none"></v-app-bar-nav-icon>

      <v-app-bar-title >
        <h3 class="h3p" @click="move()" style="cursor:pointer;">Мемчики</h3>
        </v-app-bar-title>
      <v-spacer></v-spacer>

    <v-tooltip bottom >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="blue darken-4" @click="LOGOUT_ACTION" v-show="USER_GETT">
          <v-icon v-bind="attrs" v-on="on">mdi-close-outline</v-icon>
        </v-btn>
      </template>
      <span>Выход</span>
    </v-tooltip> 

    <v-tooltip bottom >
      <template v-slot:activator="{ on, attrs }" >
        <v-btn icon color="blue darken-4" :to="{name:'Login'}" v-show="!USER_GETT">
          <v-icon v-bind="attrs" v-on="on">mdi-login</v-icon>
        </v-btn>
      </template>
      <span>Вход</span>
    </v-tooltip> 

    <v-tooltip bottom >
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="blue darken-4" :to="{name:'Registration'}" v-show="!USER_GETT">
                <v-icon v-bind="attrs" v-on="on">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <span>Регистрация</span>
    </v-tooltip> 
    
    </v-row>
    <v-row class="align-center" >
      <v-tabs
        class="d-none d-md-flex"
        background-color="blue lighten-3"
        dark
        :hide-slider="
        this.$route.name != 'Home' &&
        this.$route.name != 'MyMems' &&
        this.$route.name != 'NewMem' &&
        this.$route.name != 'Ad'
        "
      >
      
        <v-tab class="indigo--text" :to="{name:'Home', query: '' }" >
          Главная
        </v-tab>

        <v-tooltip bottom :disabled="USER_GETT != null">
          <template v-slot:activator="{ on, attrs }">
            <div v-on="on" class="disabled-tab-tooltip">
              <v-tab class="indigo--text" :to="{name:'MyMems'}" :disabled="!USER_GETT"
                v-bind="attrs" v-on="on"
              >
                Мои мемы
              </v-tab>
            </div>  
          </template>
          <span>Войдите или зарегистрируйтесь</span>
        </v-tooltip>

        <v-tooltip bottom :disabled="USER_GETT != null">
          <template v-slot:activator="{ on, attrs }">
            <div v-on="on" class="disabled-tab-tooltip">
              <v-tab class="indigo--text" :to="{name:'NewMem'}" :disabled="!USER_GETT"
                v-bind="attrs"
              >
                Загрузить мем
            </v-tab>
            </div>
        </template>
          <span>Войдите или зарегистрируйтесь</span>
        </v-tooltip>

      </v-tabs>
    </v-row>
    </v-col>
    
  </v-app-bar>  
  <v-navigation-drawer 
  v-model="drawer"
  fixed
  height="100%"
  temporary
  >
    <v-list nav dense>
      <v-list-item-group 
      
      active-class="text--acent-4">
        <v-list-item @click="move">
            <v-list-item-title >
                Главная
            </v-list-item-title>
        </v-list-item>
        
        <v-tooltip bottom :disabled="USER_GETT != null" >
          <template v-slot:activator="{ on, attrs }">
            <div v-on="on">
              <v-list-item :to="{name:'MyMems'}" :disabled="!USER_GETT" v-bind="attrs">
                  <v-list-item-title >
                      Мои мемы
                  </v-list-item-title>
              </v-list-item>
            </div>
          </template>
          <span>Войдите на сайт</span>
        </v-tooltip> 

        <v-tooltip bottom :disabled="USER_GETT != null" >
          <template v-slot:activator="{ on, attrs }">
            <div v-on="on">
          <v-list-item :to="{name:'NewMem'}" :disabled="!USER_GETT" v-bind="attrs">
              <v-list-item-title >
                  Загрузить мем
              </v-list-item-title>
          </v-list-item>
            </div>
          </template>
          <span>Войдите на сайт</span>
        </v-tooltip> 

        <v-list-item :to="{name:'Login'}" v-show="!USER_GETT">
            <v-list-item-title>
                Вход
            </v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name:'Registration'}" v-show="!USER_GETT">
            <v-list-item-title>
                Регистрация
            </v-list-item-title>
        </v-list-item>

        <v-list-item @click="LOGOUT_ACTION($event), drawer=false" v-show="USER_GETT">
            <v-list-item-title>
                Выход
            </v-list-item-title>
        </v-list-item>

        </v-list-item-group>
    </v-list>  
  </v-navigation-drawer>
  </div>
</template>
<script>
import {  mapActions, mapGetters } from "vuex";


export default {
  name: "Header",
  components: {},
  data() {
    return {
        drawer:false,
    };
  },
  methods: {
    ...mapActions(["LOGOUT_ACTION"]),
    qwe(){
      console.log(this.$route.query)
    },
    move() {
      let from = this.$route.fullPath;
      let to = this.$router.resolve("/").route.fullPath;
      if (from === to) {
        return;
      }
      this.$router.push({ name: "Home", query:'' });
    },
  },
  computed: {
    ...mapGetters(["USER_GETT"]),
  },
  watch: {
    USER_GETT(){
      if (this.USER_GETT===null && this.$route.name != 'Home' ) {
        this.$router.push({ name: "Home" });
      }
    }
  },
};
</script>
<style lang="scss">
.disabled-tab-tooltip{
  display: flex;
  align-items: center;
  a{
    width: 100%;
    height: 100%;
  }
}
</style>