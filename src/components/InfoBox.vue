<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';

defineProps<{
  isChecked?: boolean;
}>();
</script>

<template>
  <div :class="{ checked: isChecked }" class="info-box">
    <BaseIcon v-if="isChecked" :name="'check'" class="check-icon" />
    <slot />
  </div>
</template>

<style scoped>
.info-box {
  background-color: var(--color-background-gray);
  padding: 4px 14px;
  border-radius: 6px;
  font: 700 15px/1.4 'DM Sans';
  color: var(--color-text-black-dimmed);
  display: flex;
  align-items: center;
  column-gap: 8px;
}

div.checked {
  color: var(--color-text-green);
  background-color: var(--color-background-green);
}

.check-icon {
  width: 16px;
  aspect-ratio: 1;
}
</style>
