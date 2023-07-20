<template>
  <component
    :is="TopBar"
    @close="$emit('close')"
    :chatBoxHeader="chatBoxHeader"
  />
  <div class="Chat-Box">
    <h5>Recent Section</h5>
  </div>
</template>

<script>
import TopBarVue from "../Chat/TopBar.vue";
import { markRaw } from "vue";

export default {
  name: "MainVue",
  emits: ["close"],
  props: {
    inputMsg: String,

    chatBoxHeader: {
      type: Object,
    },

    userDetails: Object,
  },
  data() {
    return {
      TopBar: markRaw(TopBarVue),
    };
  },
};
</script>

<style></style>
