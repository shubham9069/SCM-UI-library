<template>
  <div class="wrapper-user">
    <div class="chat">
      <div class="chat-profile-info">
        <div class="profile-icon">
          <img :src="userDetails?.image" alt="" />
        </div>
        <div class="profile-info">
          <span class="user-name">shubham </span>
          <span class="chat-date">16 May, 2:44 PM</span>
        </div>
      </div>
      <div class="message">
        {{ message?.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WrapperUser",
  props: {
    userDetails: Object,
    message: Object,
  },
};
</script>

<style>
@import "../../css/variable.css";

.wrapper-user {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}

.wrapper-user .chat {
  width: var(--hds-chatbox-container-chat-width);
  background: var(--hds-chatbox-container-chat-background);
  border-radius: var(--hds-chatbox-container-border-radius);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
}
.wrapper-user .message {
  color: var(--hds-chatbox-container-message-color);
  font-style: normal;
  font-weight: 400;
  font-size: var(--hds-chatbox-container-message-font-size);
  flex: none;
  order: 0;
  flex-grow: 1;
  padding: var(--hds-chatbox-container-message-padding);
}

.wrapper-user .chat-profile-info {
  display: flex;
  align-items: center;
  gap: var(--hds-chatbox-chat-profile-gap);
  padding: var(--hds-chatbox-chat-profile-padding);
}
.chat-profile-info .profile-icon {
  height: var(--hds-chatbox-chat-profile-height);
  min-width: var(--hds-chatbox-chat-profile-width);
  border-radius: var(--hds-chatbox-chat-profile-border-radius);
  overflow: hidden;
  background: var(--hds-chatbox-chat-profile-background);
}

.chat-profile-info .profile-icon img {
  height: 100%;
  width: 100%;
}
.chat-profile-info .profile-info {
  display: flex;
  flex-direction: column;
  gap: 3;
}

.chat-profile-info .profile-info .user-name {
  font-size: var(--hds-chatbox-chat-profile-font-size);
  font-weight: var(--hds-chatbox-chat-profile-font-weight);
  color: #343a40;
}

.chat-profile-info .profile-info .chat-date {
  color: var(--hds-chatbox-chat-profile-date-font-color);
  font-size: var(--hds-chatbox-chat-profile-date-font-size);
  font-weight: var(--hds-chatbox-chat-profile-date-font-weight);
}

.profile img {
  height: var(--hds-chatbox-profile-img-height);
  object-fit: contain;
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
</style>
