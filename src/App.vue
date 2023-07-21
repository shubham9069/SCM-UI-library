<template>
  <ToolKit
    :toolkitItems="toolkitItems"
    :isVisible="isVisible"
    :selectedLabel="selectedTab"
    :chatMessages="chatMessages"
    :userDetails="userDetails"
    @open="
      (label) => {
        if (this.selectedTab == label) {
          this.isVisible = !isVisible;
        } else {
          this.selectedTab = label;
          this.isVisible = true;
        }
      }
    "
    @closeSidebar="this.isVisible = false"
    @sentMessage="sentMessage"
    @isChatActionArea="ChatActionFunc"
  />

  <div />
</template>

<script>
import { ToolKit, Chat, Recent } from "./components/index.js";
import { markRaw } from "vue";
/* eslint-disable vue/no-unused-components */
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
              Component: markRaw(Chat),
              Props: {
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
              },
            },
            {
              label: "Recent",
              routerLink: "",
              icon: "./assets/icons/history.svg",
              selectedIcon: "./assets/icons/white-history.svg",
              padding: 10,
              Component: markRaw(Recent),
              Props: {
                chatBoxHeader: {
                  title: "Recent",
                  showChatBoxHeader: true,
                },
                Content: "shubham Recent Search ",
              },
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

      isVisible: false,
      userDetails: {
        name: "shubham",
        image: "./assets/icons/user.jpg",
      },
      chatMessages: [],
      selectedTab: "",
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
      this.chatMessages.push(obj, {
        ...obj,
        isAI: true,
        id: this.chatMessages?.length + 1,
      });

      // scroll to bottom function
      //  when new msg are added into the chatMEssage Array so it will take few millisecound to update Dom so according to updated dom they will now look updated height of chat_container then scroll bottom

      setTimeout(function () {
        const chatContainer = document.getElementById("chatcontainer");

        if (chatContainer) {
          chatContainer.scrollTop = chatContainer?.scrollHeight;
          console.log(chatContainer);
        }
      }, 50);
    },
    ChatActionFunc(id) {
      this.chatMessages = this.chatMessages?.map((msg) => {
        return id == msg?.id
          ? { ...msg, isChatActionArea: !msg.isChatActionArea }
          : msg;
      });
    },
  },
};
</script>

<style scoped></style>
