<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import UserIcon from './components/icons/UserIcon.vue';
import RimIcon from './components/icons/RimIcon.vue';
import SettingsIcon from './components/icons/SettingsIcon.vue';

const HEADER_LINKS = [
  {
    title: 'Profile',
    path: '#',
    icon: UserIcon
  },
  {
    title: 'Vehicles',
    path: '/vehicles',
    icon: RimIcon
  },
  {
    title: 'Setting',
    path: '#',
    icon: SettingsIcon
  }
];

const route = useRoute();
</script>

<template>
  <header class="header">
    <div>
      <p class="header__title">Demo Test</p>
      <nav class="header__nav">
        <ul>
          <li
            v-for="link of HEADER_LINKS"
            :key="JSON.stringify(link)"
            :class="['header__link-item', { 'header__link-item_active': route.path === link.path }]"
          >
            <component :is="link.icon"></component>
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
  max-width: 256px;
  min-height: 1400px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 64px;
}

.header__title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-white);
  text-align: center;
  margin-bottom: 115px;
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
