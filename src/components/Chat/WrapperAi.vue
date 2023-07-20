<template>
  <div class="wrapper-ai">
    <div class="chat-ai">
      <div class="chat-profile-info">
        <div class="profile-icon" style="padding: 5px">
          <img :src="chatBoxStyle?.logo" alt="" />
        </div>
        <div class="ai-profile-head">
          <div class="profile-info">
            <span class="user-name">Ai Logi </span>
            <span class="chat-date">12-06-2883</span>
          </div>
        </div>
        <div class="three-dot">
          <svg
            @click="this.DropDown_Toggle = !this.DropDown_Toggle"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="menu_dots_horizontal">
              <path
                id="Union"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.75 12C6.75 12.9665 5.9665 13.75 5 13.75C4.0335 13.75 3.25 12.9665 3.25 12C3.25 11.0335 4.0335 10.25 5 10.25C5.9665 10.25 6.75 11.0335 6.75 12ZM12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75ZM19 13.75C19.9665 13.75 20.75 12.9665 20.75 12C20.75 11.0335 19.9665 10.25 19 10.25C18.0335 10.25 17.25 11.0335 17.25 12C17.25 12.9665 18.0335 13.75 19 13.75Z"
                fill="#656C78"
              />
            </g>
          </svg>
          <ul
            class="dropdown-menu post-dropdown"
            :style="{ display: `${DropDown_Toggle ? 'Block' : 'none'}` }"
          >
            <li>
              <p>Hide Post</p>
            </li>
            <li>
              <p>Edit Post</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="loading-animation" v-if="message.isDisabled">
        <div class="item">
          <div class="skeleton title"></div>
          <div class="skeleton content"></div>
          <div class="skeleton content"></div>
          <div class="skeleton content"></div>
        </div>
      </div>
      <div>
        <div
          v-if="!message?.isChatActionArea"
          class="message"
          :id="message?.id"
        >
          {{ message?.text }}
        </div>
        <div class="chatAction" v-if="message?.isChatActionArea">
          <p>{{ message?.areaActionButtonOption?.title }}</p>
          <div class="center-div">
            <component
              :is="Tagbutton"
              :styleObj="{
                background: '#e6f7ff',
                color: '#005ac2',
                rounded: '27px',
              }"
              :buttonDetails="{
                Icon: message?.areaActionButtonOption?.secondaryButtonIcon,
                Text: message?.areaActionButtonOption?.secondaryButtonText,
              }"
            />
            <component
              :is="Tagbutton"
              :styleObj="{
                background: '#0074E8',
                color: 'white',
                rounded: '27px',
              }"
              :buttonDetails="{
                Icon: message?.areaActionButtonOption?.primaryButtonIcon,
                Text: message?.areaActionButtonOption?.primaryButtonText,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="suggestion-box">
      <div
        class="chat-box-Suggestion-div"
        @click="$emit('isChatActionArea', message?.id)"
      >
        Make This Widget
      </div>
    </div>
  </div>
</template>

<script>
import TagbuttonVue from "./Tagbutton.vue";
import { markRaw } from "vue";

export default {
  name: "WrapperAi",
  emits: ["isChatActionArea"],
  components: {
    TagbuttonVue,
  },
  props: {
    chatBoxStyle: Object,
    message: Object,
  },
  data() {
    return {
      DropDown_Toggle: false,
      Tagbutton: markRaw(TagbuttonVue),
    };
  },
};
</script>

<style>
@import "../../css/variable.css";
.wrapper-ai {
  width: var(--hds-chatbox-warpper-input-width);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: var(--hds-chatbox-warpper-input-gap);
}

.wrapper-ai .chat-ai {
  width: var(--hds-chatbox-warpper-input-width);
  gap: var(--hds-chatbox-warpper-input-gap);
  background: var(--hds-chatbox-warpper-input-background);
  border: var(--hds-chatbox-warpper-input-border);
  border-radius: var(--hds-chatbox-warpper-input-border-radius);
}

.wrapper-ai .ai-profile-head {
  display: grid;
  grid-template-columns: var(
    --hds-chatbox-warpper-profile-head-grid-template-columns
  );

  width: var(--hds-chatbox-warpper-profile-head-width);
}

.wrapper-ai .message {
  color: var(--hds-chatbox-warpper-message-color);
  font-style: normal;
  font-weight: var(--hds-chatbox-warpper-message-font-weight);
  font-size: var(--hds-chatbox-warpper-message-font-size);
  max-width: 100%;
  white-space: pre-line;
  padding: var(--hds-chatbox-warpper-message-padding);
  border-top: var(--hds-chatbox-chat-profile-border-bottom);
}

.wrapper-ai .message.bot-message {
  float: left;
}
.wrapper-ai .chat-profile-info {
  display: flex;
  align-items: center;
  gap: var(--hds-chatbox-chat-profile-gap);
  padding: var(--hds-chatbox-chat-profile-padding);
}

.loading-animation .item {
  vertical-align: top;
  background: #ffffff;
  border-radius: 3px;
  padding: 16px;
  width: 100%;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
}

.loading-animation .skeleton {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 100px;
}

.loading-animation .title {
  height: 20px;
  width: 200px;
  margin-top: 8px;
  margin-bottom: 26px;
}

.loading-animation .content {
  height: 20px;
  width: 100%;
  margin-bottom: 8px;
}
.three-dot {
  position: relative;
  cursor: pointer;
}

.post-dropdown {
  padding: 0.5rem !important;
  width: max-content;
  min-width: 110px;
  position: absolute;
  top: 10px;
  background: white;
  right: 0;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.post-dropdown p {
  font-size: 12px;
  margin: 0 !important;
}
.post-dropdown > li {
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  cursor: pointer;
}
.post-dropdown > li:hover {
  background-color: #eef6ff;
}
.post-dropdown > li:hover p {
  color: #00a3ff !important;
}

.chatAction {
  padding: 12px 16px;
  margin: 1rem;
  border: var(--hds-sidebar-border);
  border-radius: 8px;
}
.chatAction > p {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
}
.chatAction > .center-div {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
