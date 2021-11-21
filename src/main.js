import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import  firebase  from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/storage';
import 'firebase/compat/auth'
import 'firebase/compat/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)

const firebaseConfig = {
  apiKey: "AIzaSyCNFljLUAyssFhtk6gW15O3GtaiWiIVhWQ",
  authDomain: "vuetifyspa-60fe9.firebaseapp.com",
  projectId: "vuetifyspa-60fe9",
  storageBucket: "vuetifyspa-60fe9.appspot.com",
  messagingSenderId: "207735108336",
  appId: "1:207735108336:web:f5ba0eb2addce34a014835",
  measurementId: "G-WQYKV3WDXD",
  databaseURL: "https://vuetifyspa-60fe9-default-rtdb.europe-west1.firebasedatabase.app"
};
firebase.initializeApp(firebaseConfig)



let app
firebase.auth().onAuthStateChanged(() =>{
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})

