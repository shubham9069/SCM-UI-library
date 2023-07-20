<template>
  <component
    :is="TopBar"
    @close="$emit('close')"
    :chatBoxHeader="chatBoxHeader"
  />

  <div class="Chat-Box" v-if="!chatMessages?.length">
    <div class="chatbox-header">
      <img :src="chatBoxStyle.logo" />
      <p>{{ emptyChatContent?.title }}</p>
    </div>

    <div className="chat-box-input">
      <input
        type="text"
        :placeholder="emptyChatContent?.inputPlaceholder"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="SendMessage(this.inputMsg)"
      />
      <div @click="SendMessage(this.inputMsg)">
        <img :src="emptyChatContent?.searchIcon" />
      </div>
    </div>

    <div className="chat-box-Suggestion">
      <span
        ><img :src="savedTemplates?.icon" /> {{ savedTemplates?.title }}</span
      >

      <div
        v-for="data in savedTemplates.templates"
        :key="data?.title"
        @click="SendMessage(data?.title)"
        class="chat-box-Suggestion-div"
      >
        {{ data?.title }}
      </div>
    </div>
  </div>
  <div class="chat-ui" v-else>
    <div
      class="chat_container chat-box"
      id="chatcontainer"
      :style="{ height: chatBoxInnerHeight }"
    >
      <template v-for="(message, index) in chatMessages" :key="index">
        <component
          :is="WrapperAi"
          v-if="message?.isAI"
          :message="message"
          :chatBoxStyle="chatBoxStyle"
          @isChatActionArea="
            (id) => {
              $emit('isChatActionArea', id);
            }
          "
        />
        <component
          :is="WrapperUser"
          v-else
          :message="message"
          :userDetails="userDetails"
        />
      </template>
    </div>

    <form class="chat-form" @submit.prevent="SendMessage(this.inputMsg)">
      <div class="chat-input-group">
        <div class="chat-icon">
          <img :src="chatBoxStyle?.logo" alt="" />
        </div>
        <input
          type="text"
          name="query"
          :placeholder="chatBoxStyle?.inputBoxPlaceholder"
          class="chat-textbox"
          @input="$emit('input', $event.target.value)"
          autocomplete="off"
          :disabled="isInputDisabled"
          :readonly="isInputDisabled"
        />
        <div class="chat-icon">
          <i></i>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TopBarVue from "./TopBar.vue";
import WrapperAiVue from "./WrapperAi.vue";
import WrapperUserVue from "./WrapperUser.vue";
import { markRaw } from "vue";

export default {
  name: "ChatComponent",
  components: {
    TopBarVue,
    WrapperUserVue,
    WrapperAiVue,
  },
  emits: ["close", "SentMessage", "isChatActionArea", "input"],
  props: {
    inputMsg: String,
    chatBoxStyle: {
      type: Object,
    },
    emptyChatContent: {
      type: Object,
    },
    chatBoxHeader: {
      type: Object,
    },
    savedTemplates: Object,
    chatMessages: {
      type: Array,
      default: () => [],
    },
    userDetails: Object,
  },
  watch: {
    chatMessages: {
      handler(newVal, oldVal) {
        this.scrollToBottom();
      },
      deep: true,
    },
  },
  data() {
    return {
      TopBar: markRaw(TopBarVue),
      WrapperUser: markRaw(WrapperUserVue),
      WrapperAi: markRaw(WrapperAiVue),
    };
  },
  methods: {
    SendMessage(inputText) {
      if (inputText) {
        this.$emit("SentMessage", inputText);
      }
    },
    scrollToBottom() {
      const chatContainer = document.getElementById("chatcontainer");

      if (chatContainer) {
        chatContainer.scrollTop = chatContainer?.scrollHeight;
        console.log(chatContainer);
      }
    },
  },
};
</script>

<style>
@import "../../css/variable.css";

.Chat-Box {
  padding: var(--hds-chatbox-padding);
  background: var(--hds-chatbox-background);

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: var(--hds-sidebar-border);
}

.chatbox-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: var(--hds-chatbox-header-gap);
  padding: var(--hds-chatbox-header-paddingY);
}
.chatbox-header > img {
  width: var(--hds-chatbox-header-logo-width);
  height: var(--hds-chatbox-header-logo-height);
}
.chatbox-header > p {
  margin: 0;
  font-size: var(--hds-chatbox-header-text);
  font-weight: var(--hds-chatbox-header-text-weight);
}

.chat-box-input {
  display: flex;
  padding: var(--hds-chatbox-header-paddingY);
}
.chat-box-input input {
  width: var(--hds-chatbox-input-width);
  height: var(--hds-chatbox-input-height);
  border: var(--hds-chatbox-input-border);
  border-radius: var(--hds-chatbox-input-border-radius);
  background: var(--hds-chatbox-input-background);
  padding: var(--hds-chatbox-input-padding);
  outline: none;
}
.chat-box-input > div {
  border-radius: var(--hds-chatbox-input-search-border-radius);
  background: var(--hds-chatbox-input-search-background);
  padding: var(--hds-chatbox-input-search-padding);
  height: var(--hds-chatbox-input-height);
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat_container .suggestion-box {
  display: flex;
  grid-gap: var(--hds-chatbox-gap);
  width: 100%;
  flex-wrap: wrap;
}
.chat-box-Suggestion > span {
  display: flex;
  align-items: center;
  font-weight: var(--hds-chatbox-saved-template-head-font-weight);
  color: var(--hds-chatbox-saved-template-head-color);
  font-size: var(--hds-chatbox-saved-template-head-font-size);
  grid-gap: var(--hds-chatbox-saved-template-head-gap);
}
.chat_container .suggestion-box > .chat-box-Suggestion-div {
  margin: 0;
}

.chat-box-Suggestion-div {
  display: flex;
  align-items: center;
  grid-gap: var(--hds-chatbox-saved-template-head-gap);
  background: var(--hds-chatbox-saved-template-card-background);
  border: var(--hds-chatbox-saved-template-card-border);
  border-radius: var(--hds-chatbox-saved-template-card-border-radius);
  padding: var(--hds-chatbox-saved-template-card-padding);
  color: var(--hds-chatbox-saved-template-card-color);
  font-size: var(--hds-chatbox-saved-template-card-font-size);
  font-weight: var(--hds-chatbox-saved-template-card-font-weight);
  cursor: pointer;
  margin: var(--hds-chatbox-saved-template-list-margin);
  line-height: 21px;
}

.chat-ui {
  background: var(--hds-chatbox-background);
  border: var(--hds-sidebar-border);

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
}
.chat-ui::-webkit-scrollbar,
.chat-ui::-webkit-scrollbar-thumb {
  display: none;
}

.chat-ui .chat-box {
  width: var(--hds-chatbox-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--hds-chatbox-padding);
  gap: var(--hds-chatbox-gap);
}
.chat_container {
  flex: 1;
  width: 100%;

  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: var(--hds-chatbox-container-gap);
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.chat_container::-webkit-scrollbar {
  display: none;
}

.chat_container::-webkit-scrollbar-thumb {
  background: #b2b2b2c1;
  border-radius: 80px;
}

.message::-webkit-scrollbar {
  display: none;
}

.chat-form {
  width: var(--hds-chatbox-form-width);
  height: var(--hds-chatbox-form-height);
  background: var(--hds-chatbox-form-background);
  border: var(--hds-chatbox-form-border);
  border-radius: var(--hds-chatbox-form-border-radius);
  padding: var(--hds-chatbox-form-padding);
}

.chat-form .chat-input-group {
  width: var(--hds-chatbox-form-input-width);
  display: grid;
  grid-template-columns: var(--hds-chatbox-form-input-grid-template-columns);
  align-items: center;
  border: var(--hds-chatbox-form-input-border);
  border-radius: var(--hds-chatbox-form-input-border-radius);
}

.chat-form .chat-input-group .chat-icon {
  height: var(--hds-chatbox-form-input-chat-icon-height);
  width: var(--hds-chatbox-form-input-chat-icon-width);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chat-textbox {
  width: var(--hds-chatbox-form-input-chat-text-box-width);
  color: var(--hds-chatbox-form-input-chat-text-box-color);
  font-size: var(--hds-chatbox-form-input-chat-text-box-font-size);
  padding: var(--hds-chatbox-form-input-chat-text-box-padding);
  background: transparent;
  border-radius: var(--hds-chatbox-form-input-chat-border-radius);
  border: none;
  outline: none;
}

.chat-textbox::placeholder {
  color: var(--hds-chatbox-form-input-chat-placeholder-color);
  font-size: var(--hds-chatbox-form-input-chat-placeholder-font-size);
}

.chat-btn {
  outline: 0;
  border: 0;
  cursor: pointer;
  background: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
