<template>
  <div class="sidebar">
    <section
      class="sidebox"
      :style="{ display: `${isVisible ? 'Block' : 'none'}` }"
    >
      <div class="bottom">
        <keep-alive>
          <component
            :is="Component"
            v-bind="Props"
            :chatMessages="chatMessages"
            :userDetails="userDetails"
            @close="$emit('closeSidebar')"
            @SentMessage="sentMessageParentComponent"
            @isChatActionArea="(id) => $emit('isChatActionArea', id)"
          />
        </keep-alive>
      </div>
    </section>

    <template v-for="section in toolkitItems" :key="section.section">
      <template v-if="section.section == 'Section 1'">
        <div
          class="sidebaricon1"
          v-for="item in section.items"
          :key="item.label"
          @click="ActiveComponent(item.label, item.Component, item.Props)"
          :style="{
            background: `${
              isVisible && item.label == selectedLabel
                ? 'linear-gradient(135deg, #0074E8 0%, #A933FB 100%)'
                : 'transparent'
            }`,
          }"
        >
          <img
            :src="
              isVisible && item.label == selectedLabel
                ? item.selectedIcon
                : item.icon
            "
          />
        </div>
        <div class="line" />
      </template>

      <template v-if="section.section == 'Section 2'">
        <div
          @click="$emit('open')"
          class="sidebaricon2"
          v-for="item in section.items"
          :key="item.label"
        >
          <img :src="item.icon" />
        </div>
        <div class="line" />
      </template>
      <template v-if="section.section == 'Section 3'">
        <div
          @click="$emit('open')"
          class="sidebaricon3"
          v-for="item in section.items"
          :key="item.label"
        >
          <img :src="item.icon" />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "ToolKit",
  emits: ["open", "closeSidebar", "sentMessage", "isChatActionArea"],
  components: {},
  data() {
    return {
      Component: "",
      Props: "",
    };
  },
  props: {
    toolkitItems: Array,
    toolkitStyle: Object,
    isVisible: Boolean,
    selectedLabel: String,
    chatMessages: Array,
    userDetails: Object,
  },
  methods: {
    ActiveComponent(label, component, props) {
      this.Component = component;
      this.Props = props;
      this.$emit("open", label);
    },
    sentMessageParentComponent(value) {
      this.$emit("sentMessage", value);
    },
  },
};
</script>

<style>
@import "../../css/variable.css";

.sidebar {
  border: 1px solid #e7ecf1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  /* background: grey; */
  height: 100vh;
  width: fit-content;
  margin-left: auto;
  position: relative;
}
.sidebar > .sidebaricon1,
.sidebar > .sidebaricon3,
.sidebar > .sidebaricon2 {
  padding: 8px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.sidebar img {
  width: var(--hds-chatbox-header-logo-width);
  height: var(--hds-chatbox-header-logo-height);
}
.sidebar .line {
  height: 1px;
  width: 100%;
  background: #e7ecf1;
}

.sidebox {
  min-width: 342px;
  max-width: 342px;
  height: 100%;

  width: max-content;
  position: absolute;
  top: 0;
  right: 100%;
}

.sidebox > .bottom {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
