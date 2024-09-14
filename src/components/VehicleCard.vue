<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';
import InfoBox from './InfoBox.vue';

defineProps<{
  name: string | null | undefined;
  vin: string | null | undefined;
  imageSrc: string;
}>();

const randomDigit = Math.ceil(Math.random() * 30);
</script>

<template>
  <article class="vehicle">
    <button class="vehicle__more-btn">
      <BaseIcon :name="'moreHorizontal'" />
    </button>
    <img :src="imageSrc" :alt="String(name)" />
    <div class="vehicle__info">
      <h2>{{ String(name) }}</h2>
      <p>{{ String(vin) }}</p>
    </div>
    <div class="vehicle__bottom">
      <InfoBox :is-checked="randomDigit === 30" class="vehicle__info-box"
        >{{ randomDigit }}/30</InfoBox
      >
      <p>3 days left</p>
    </div>
  </article>
</template>

<style scoped>
.vehicle {
  width: 354px;
  height: 335px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 24px 16px;
  background-color: var(--color-background-gray);
  border-radius: 10px;
}

.vehicle img {
  width: 260px;
  height: 135px;
  object-fit: cover;
  object-position: center;
  margin: 0 auto 24px;
}

.vehicle__more-btn {
  position: absolute;
  top: 20px;
  right: 24px;
}

.vehicle__info {
  padding-bottom: 18px;
  border-bottom: var(--color-line-gray) 1px solid;
  margin-bottom: 18px;
}

.vehicle__info h2 {
  font: 700 20px/1.1 'DM Sans';
  margin-bottom: 12px;
}

.vehicle__info p {
  font: 500 15px/1.33 'DM Sans';
  color: var(--color-text-black-dimmed-strong);
}

.vehicle__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vehicle__bottom p {
  font: 500 15px/1.06 'DM Sans';
  color: var(--color-text-black-dimmed-strong);
}

.vehicle__info-box {
  background-color: #ededed;
}
</style>
