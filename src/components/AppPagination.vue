<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';
defineProps<{
  currentPage: number;
  finalPage: number;
}>();

const emit = defineEmits(['previousBtnClick', 'nextBtnClick']);
</script>

<template>
  <div class="pagination">
    <button
      type="button"
      aria-label="Previous"
      @click="emit('previousBtnClick')"
      :disabled="currentPage === 1"
    >
      <BaseIcon :name="'arrowLeft'" />
    </button>
    <span class="page">{{ currentPage }}</span>
    <span>of</span>
    <span class="page">{{ finalPage }}</span>
    <button
      type="button"
      aria-label="Next"
      @click="emit('nextBtnClick')"
      :disabled="currentPage === finalPage"
    >
      <BaseIcon :name="'arrowRight'" />
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  column-gap: 16px;
  color: var(--color-text-black-dimmed);
  font: 400 13px/1.5 'DM Sans';
  align-items: center;
}

.page {
  border: var(--color-line-gray) 1px solid;
  border-radius: 6px;
  padding: 5px 6px;
  min-width: 32px;
  aspect-ratio: 1;
  text-align: center;
}

.page:last-of-type {
  color: rgba(41, 49, 72, 0.45);
}
</style>
