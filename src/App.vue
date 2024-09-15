<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import BaseIcon from './components/BaseIcon.vue';
import { HEADER_LINKS } from './utils/constants';

const route = useRoute();
</script>

<template>
  <header class="header">
    <div>
      <p class="header__title">Demo Test</p>
      <nav>
        <ul class="header__links-list">
          <li
            v-for="link of HEADER_LINKS"
            :key="JSON.stringify(link)"
            :class="['header__link-item', { 'header__link-item_active': route.path === link.path }]"
          >
            <BaseIcon :name="link.icon"></BaseIcon>
            <RouterLink v-if="link.path !== '#'" :to="link.path">{{ link.title }}</RouterLink>
            <a v-else :href="link.path">{{ link.title }}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header__wave" />
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  background-color: var(--color-background);
  flex-basis: 256px;
  min-height: 1386px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.header__title {
  font: 700 24px/1 'DM Sans';
  color: var(--color-text-white);
  margin: 0 0 100px 56px;
}

.header__links-list {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.header__link-item {
  color: var(--color-text-white-dimmed);
  display: flex;
  column-gap: 20px;
  padding: 12px 30px;
  cursor: pointer;
  position: relative;
  transition:
    opacity 0.3s ease,
    background-color 0.3s ease;
}

.header__link-item:hover {
  opacity: 0.7;
}

.header__link-item_active {
  background-color: var(--color-background-dimmed);
}

.header__link-item_active::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: var(--color-red);
  inset: 0;
}

.header__link-item_active > a {
  color: var(--color-text-white);
}

.header__wave {
  background: url('@/assets/images/wave.png') no-repeat;
  width: 100%;
  height: auto;
  flex-grow: 1;
  flex-shrink: 0;
}
</style>
