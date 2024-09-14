<script setup lang="ts">
defineProps<{
  isChecked?: boolean;
}>();
</script>

<template>
  <div :class="{ checked: isChecked }">
    <slot />
  </div>
</template>

<style scoped>
div {
  background-color: var(--color-background-gray);
  padding: 4px 14px;
  border-radius: 6px;
  font: 700 15px/1.4 'DM Sans';
  color: var(--color-text-black-dimmed);
  display: inline;
}

div.checked {
  color: var(--color-text-green);
  background-color: var(--color-background-green);
}
</style>
