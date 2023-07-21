<template>
  <component
    :is="TopBar"
    @close="$emit('close')"
    :chatBoxHeader="chatBoxHeader"
  />
  <div class="Chat-Box">
    <h5>{{ Content }}</h5>
  </div>
</template>

<script>
import TopBarVue from "../Chat/TopBar.vue";
import { markRaw } from "vue";

export default {
  name: "MainVue",
  emits: ["open", "closeSidebar", "sentMessage", "isChatActionArea"],
  props: {
    chatBoxHeader: {
      type: Object,
    },
    Content: String,

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
