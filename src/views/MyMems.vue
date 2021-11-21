<template lang="" :key="MY_ADDS_GETT">
  <v-container >
    <v-subheader>Мои мемы</v-subheader>
    <v-row>
      <v-card
        class="mx-auto mb-4"
        max-width="345"
        v-for="(card,i) in MY_ADDS_GETT" :key="i"
      >
        <v-img
          :src="card.img"
          height="150px"
        ></v-img>

        <v-card-title>
          {{card.title}}
        </v-card-title>

        <v-card-actions>

          <v-btn
            color="indigo darken-3"
            text
            @click="rout(card)"
          >
            Редактировать
          </v-btn>

          <v-btn
            text
            color="red lighten-2"
            @click="deleteModal(card)"
          >
            Удалить
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            icon
            @click="show = !show"
          >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              {{card.description}}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-row>
      <v-row justify="center">
    <!-- <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Open Dialog
    </v-btn> -->

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Удаление
        </v-card-title>

        <v-card-text >
          Вы точно хотите удалить мемчик - {{selectedCard.title}}?)
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange darken-1"
            text
            @click="dialog = false"
          >
            Отмена
          </v-btn>
            <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="deleteCard()"
            :loading="LOADING_GETT"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MyMems",
  components: {},
  data() {
    return {
      show: false,
      dialog:false,
      // modaltext:'',
      selectedCard:{}
    };
  },
  methods: {
    ...mapActions(["ALL_ADS_ACTION","DELETE_ADD_ACTION"]),
    //*роут на редактирование
    rout(id){
      this.$router.push({
        name:'Detail',
        params:{
          id:id.key
        }
      })
    },
    //*модалка на удаление
    deleteModal(card){
      this.selectedCard = card;
      this.dialog = true;
    },
    //*удаление
    async deleteCard(){
      try {
        await this.DELETE_ADD_ACTION(this.selectedCard);
        this.dialog = false
      } catch (error) {
        console.log(error);
        this.dialog = false;
      }
    }
  },
  computed: {
    ...mapGetters(["MY_ADDS_GETT","LOADING_GETT"]),
  },
  watch: {
  },
   mounted(){
    this.ALL_ADS_ACTION();
  }
};
</script>
<style lang="">
</style>