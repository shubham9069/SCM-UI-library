<template>
  <span
    class="tag-button"
    :style="{
      background: styleObj?.background,
      color: styleObj?.color,
      borderRadius: styleObj?.rounded,
    }"
    ><img :src="buttonDetails.Icon" />
    {{ buttonDetails.Text }}
  </span>
</template>

<script>
export default {
  name: "TagButton",
  props: {
    buttonDetails: Object,
    styleObj: Object,
  },
};
</script>

<style>
@import "../../css/variable.css";
.tag-button {
  font-size: var(--hds-chatbox-TagButton-font-size);

  font-weight: var(--hds-chatbox-TagButton-font-weight);
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: var(--hds-chatbox-TagButton-gap);
  padding: var(--hds-chatbox-TagButton-padding);
  cursor: pointer;
}
.tag-button > img {
  width: var(--hds-chatbox-TagButton-img-width);
}
</style>
