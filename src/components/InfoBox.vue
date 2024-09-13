<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
div {
  background-color: var(--color-background-gray);
  padding: 4px 14px;
  border-radius: 6px;
  font: 700 15px/1.4 'DM Sans';
  color: var(--color-text-black-dimmed);
}
</style>
