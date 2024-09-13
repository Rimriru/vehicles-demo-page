<script setup lang="ts">
import AddButton from '@/components/AddButton.vue';
import InfoBox from '@/components/InfoBox.vue';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue';
</script>

<template>
  <main class="vehicles">
    <section class="flex-centered vehicles__header">
      <div class="flex-centered vehicles__heading-wrapper">
        <h1>Vehicles</h1>
        <InfoBox>256</InfoBox>
      </div>
      <div class="flex-centered vehicles__user-wrapper">
        <AddButton :size="'sm'" :is-transparent="true" class="vehicles__add-btn_place_header" />
        <div class="flex-centered interactive vehicles__user">
          <img src="@/assets/images/avatar.png" alt="User avatar" />
          <p class="text-medium">John Doe</p>
        </div>
        <div class="flex-centered interactive">
          <div class="vehicles__lang-flag" />
          <span class="text-medium vehicles__lang-label">En</span>
          <ArrowDownIcon />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.flex-centered {
  display: flex;
  align-items: center;
}

.interactive {
  cursor: pointer;
}

.text-medium {
  font: 500 15px/1.467 'DM Sans';
}

.vehicles {
  flex-grow: 1;
}

.vehicles__header {
  width: 100%;
  justify-content: space-between;
  padding: 30px;
  color: var(--color-text-black);
  border-bottom: var(--color-line-gray) 1px solid;
}

h1 {
  font: 700 32px/1.2 'DM Sans';
}

.vehicles__heading-wrapper {
  display: flex;
  column-gap: 18px;
}

.vehicles__user-wrapper {
  display: flex;
  align-items: center;
}

.vehicles__add-btn_place_header {
  margin-right: 40px;
}

.vehicles__user {
  margin-right: 32px;
}

.vehicles__user img {
  margin-right: 14px;
}

.vehicles__lang-flag {
  background: url('@/assets/images/flag.png') no-repeat center center;
  width: 24px;
  height: 24px;
  margin-right: 14px;
}
</style>
