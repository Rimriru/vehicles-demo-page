<script setup lang="ts">
import PlusIcon from './icons/PlusIcon.vue';

defineProps<{
  size: 'sm' | 'lg';
  isTransparent: boolean;
}>();
</script>

<template>
  <button
    :class="[
      'add-btn',
      {
        'add-btn_size_small': size === 'sm',
        'add-btn_size_large': size === 'lg',
        'add-btn_transparent': isTransparent
      }
    ]"
    type="button"
    :aria-label="size === 'sm' ? 'Add' : ''"
  >
    <PlusIcon :color="isTransparent ? 'red' : 'white'" />
    <slot />
  </button>
</template>

<style scoped>
.add-btn {
  padding-block: 9px;
  font: 700 12px/1.66 'DM Sans';
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn_size_small {
  width: 42px;
  aspect-ratio: 1;
  border: var(--color-btn-red) 1px solid;
  border-radius: 6px;
}

.add-btn_size_large {
  border-radius: 10px;
  padding-inline: 18px;
  display: flex;
  column-gap: 16px;
  background-color: var(--vt-c-red);
  color: var(--color-text-white);
}

.add-btn_transparent {
  background-color: transparent;
}
</style>
