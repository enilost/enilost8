<template lang="">
  <v-card
    class="mx-auto mb-2 col-sm-5 col-xs-12 col-md-4 "
    max-width="600"
    min-width="200"

  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="card.img"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      @click="modalIMG(card.img)"
    >
      <v-card-title>{{card.title}}</v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <div>{{card.name}}</div>

      <div>{{card.description}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="USER_UID === card.id"
        color="orange"
        text
        @click="routeCard(card.key)"
      >
        Изменить
      </v-btn>

      <!-- <v-btn
      depressed
      color="blue lighten-3"
    >
      Купить
    </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
 /* eslint-disable */
import { mapGetters } from "vuex";

export default {
  name: "card",
  components: {},
  props: {
    card: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    modalIMG(src){
      this.$emit('modal', src);
    },
    routeCard(key){
      this.$emit('routeCard', key);
    }

  },
  computed: {
    ...mapGetters(["USER_UID"]),
  },
  watch: {},
};
</script>
<style lang="scss">

</style>