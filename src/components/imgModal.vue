<template lang="">
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="700"
    >

      <v-card>
        <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="100%"
            max-width="100%"
            :src="src"
        ></v-img>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: "modal",
  components: {},
  props:{
      src:{
          type: String,
          default(){
            return '';
          }
      },
  },
  data() {
    return {
        dialog: false,
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["IS_SHOW_MODAL_GETT"]),
  },
  watch: {
    IS_SHOW_MODAL_GETT(){
        this.dialog = true;
    }
  },
};
</script>
<style lang="">
</style>