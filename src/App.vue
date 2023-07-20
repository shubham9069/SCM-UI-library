<template>
  <ToolKit
    :toolkitItems="toolkitItems"
    :toolkitStyle="toolkitStyle"
    :isVisible="isVisible"
    @open="this.isVisible = true"
    @closeSidebar="this.isVisible = false"
    @sentMessage="sentMessage"
    @chart="ChartBoxFun"
    @input="
      (value) => {
        this.inputMsg = value;
      }
    "
    :ChatComponent="ChatCom"
    :ChatProps="{
      inputMsg: inputMsg,
      chatBoxStyle: chatBoxStyle,
      emptyChatContent: emptyChatContent,
      chatBoxHeader: chatBoxHeader,
      savedTemplates: savedTemplates,
      chatMessages: chatMessages,
      userDetails: userDetails,
    }"
  />

  <div />
</template>

<script>
import { ToolKit, Chat } from "./components/index.js";
import { markRaw } from "vue";
/* eslint-disable vue/no-unused-components */
console.log(Chat);
export default {
  name: "app",
  emits: ["closeSidebar", "chart"],

  components: {
    ToolKit,
    Chat,
  },
  data() {
    return {
      toolkitItems: [
        {
          section: "Section 1",
          items: [
            {
              label: "Ai",
              routerLink: "",
              icon: "./assets/icons/ai-gradient.svg",
              selectedIcon: "./assets/icons/AI.svg",
              padding: 8,
            },
            {
              label: "Recent",
              routerLink: "",
              icon: "./assets/icons/history.svg",
              selectedIcon: "./assets/icons/recent.svg",
              padding: 10,
            },
          ],
        },
        {
          section: "Section 2",
          items: [
            {
              label: "Add",
              routerLink: "",
              icon: "./assets/icons/plus.svg",
              selectedIcon: "./assets/icons/plus-white.svg",
              padding: 10,
            },
            {
              label: "Notification",
              routerLink: "",
              icon: "./assets/icons/bell.svg",
              selectedIcon: "./assets/icons/notification-white.svg",
              padding: 10,
            },
            {
              label: "Setting",
              routerLink: "",
              icon: "./assets/icons/cog.svg",
              selectedIcon: "`./assets/icons/setting-white.svg",
              padding: 10,
            },
          ],
        },
        {
          section: "Section 3",
          items: [
            {
              label: "Chat",
              routerLink: "",
              icon: "./assets/icons/comments.svg",
              selectedIcon: "./assets/icons/chat-white.svg",
              padding: 10,
            },
          ],
        },
      ],
      // toolkitStyle: {
      //   iconWidth: "25px",
      //   iconHeight: "250px",
      //   toolkitHeight: "100vh",
      // },
      isVisible: false,
      ChatCom: markRaw(Chat),
      //chat prop
      chatBoxStyle: {
        logo: "./assets/icons/ai-gradient.svg",
        inputBoxPlaceholder: "Ask your data question",
        inputAttachmentIcon: "pi pi-paperclip",
        actionDropDownIcon: "pi pi-ellipsis-h",
      },
      emptyChatContent: {
        showEmptyChatHeader: true,
        title: "AI-Driven Insights Companion",
        inputPlaceholder: "Ask your data question",
        searchIcon: "../assets/icons/search.svg",
      },
      chatBoxHeader: {
        title: "AI Exploration",
        showChatBoxHeader: true,
      },
      savedTemplates: {
        icon: "../assets/icons/search-blue.svg",
        title: "Or Start With One of a Common Prompts",
        useTemplate: true,
        showSavedTemplate: true,
        templates: [
          {
            title: "Which category has most growth potential?",
            routerLink: "",
          },
          {
            title: "Which brands should be delisted? ",
            routerLink: "",
          },
          {
            title: "How are Price Driven Customers behaving?",
            routerLink: "",
          },
        ],
      },
      userDetails: {
        name: "shubham",
        image: "./assets/icons/user.jpg",
      },
      chatMessages: [],
      inputMsg: "",
    };
  },
  methods: {
    sentMessage(inputText) {
      const obj = {
        isAI: false,
        text: inputText,
        id: `${this.chatMessages?.length}`,
        chart: false,
        chartInfo: {},
        isChatActionArea: false,
        areaActionButtonOption: {
          title: "Recomandation",
          height: "100px",
          width: "300px",
          primaryButtonText: "Pin to Broad",
          secondaryButtonText: "Preview",
          primaryButtonIcon: "./assets/icons/placeholder.svg",
          secondaryButtonIcon: "./assets/icons/placeholder.svg",
        },
        isDisabled: false,
        date: new Date().toISOString(),
      };
      this.chatMessages.push(obj, { ...obj, isAI: true });
    },
    ChartBoxFun(id) {
      this.chatMessages = this.chatMessages?.map((msg) => {
        return id == msg?.id ? { ...msg, chart: !msg.chart } : msg;
      });
    },
  },
};
</script>

<style scoped></style>
