<script setup lang="ts">
import { computed } from 'vue';

import UserIcon from './icons/UserIcon.vue';
import RimIcon from './icons/RimIcon.vue';
import SettingsIcon from './icons/SettingsIcon.vue';
import ArrowDownIcon from './icons/ArrowDownIcon.vue';
import ZoomIcon from './icons/ZoomIcon.vue';
import MoreHorizontalIcon from './icons/MoreHorizontalIcon.vue';

const icons = {
  user: UserIcon,
  rim: RimIcon,
  settings: SettingsIcon,
  arrowDown: ArrowDownIcon,
  zoom: ZoomIcon,
  moreHorizontal: MoreHorizontalIcon
};

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  options: {
    type: Array
  }
});

const iconComponent = computed(() => icons[props.name as keyof typeof icons]);
</script>

<template>
  <component :is="iconComponent" class="base-icon" />
</template>

<style scoped>
.base-icon {
  width: 24px;
  height: 24px;
}
</style>
