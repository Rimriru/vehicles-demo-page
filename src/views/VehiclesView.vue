<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import AddButton from '@/components/AddButton.vue';
import InfoBox from '@/components/InfoBox.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import VehicleCard from '@/components/VehicleCard.vue';
import AppLoader from '@/components/AppLoader.vue';
import AppPagination from '@/components/AppPagination.vue';
import { VEHICLES_API_ENDPOINT } from '@/utils/constants';

//const allVehicles = ref<Array<any>>([]);
const vehiclesList = ref<Array<any> | null | undefined>(null);
const searchValue = ref('');
const page = ref(1);
const requestError = ref('');
const vehiclesPerPage = ref(9);
const isLoading = ref(false);
const vehiclesTotal = ref(0);

const finalPage = computed(() => {
  return vehiclesList.value ? Math.ceil(vehiclesTotal.value / vehiclesPerPage.value) : 1;
});

const getVehicles = async (searchQuery: string, vehiclesPerPage: number, page: number) => {
  vehiclesList.value = null;
  isLoading.value = true;
  const vehiclesPerPageQuery = vehiclesPerPage
    ? searchQuery
      ? `&per_page=${vehiclesPerPage}`
      : `per_page=${vehiclesPerPage}`
    : '';
  const pageQuery = page
    ? searchQuery || vehiclesPerPageQuery
      ? `&page=${page}`
      : `page=${page}`
    : '';
  try {
    const response = await fetch(
      `${VEHICLES_API_ENDPOINT}?${searchQuery ? `search=${searchQuery}` : ''}${vehiclesPerPageQuery}${pageQuery}`
    );
    const list = await response.json();
    return list;
  } catch (error: any) {
    requestError.value = error.toString();
  } finally {
    isLoading.value = false;
  }
};

const onNextBtnClick = () => (page.value = page.value + 1);

const onPrevBtnClick = () => (page.value = page.value - 1);

watch([page], async () => {
  const { data, meta } = await getVehicles(searchValue.value, vehiclesPerPage.value, page.value);
  vehiclesList.value = data;
  vehiclesTotal.value = meta.total;
});

const onVehiclesPerPageChange = async (evt: any) => {
  const value = evt.target.value;
  vehiclesPerPage.value = Number(value);
  page.value = 1;
  const { data } = await getVehicles(searchValue.value, vehiclesPerPage.value, page.value);
  vehiclesList.value = data;
};

const onSearchFormSubmit = async () => {
  if (page.value > 1) {
    page.value = 1;
    return;
  }
  const { data, meta } = await getVehicles(searchValue.value, vehiclesPerPage.value, page.value);
  vehiclesList.value = data;
  vehiclesTotal.value = meta.total;
};

onMounted(async () => {
  const getVehiclesList = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(VEHICLES_API_ENDPOINT);
      const list = await response.json();
      return list;
    } catch (error: any) {
      requestError.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  };
  const { data, meta } = await getVehiclesList();
  if (data && meta) {
    vehiclesTotal.value = meta.total;
    vehiclesList.value = data.slice(0, vehiclesPerPage.value);
  }
});
</script>

<template>
  <main class="vehicles">
    <section class="flex-centered vehicles__header">
      <div class="flex-centered vehicles__heading-wrapper">
        <h1>Vehicles</h1>
        <InfoBox v-if="vehiclesTotal">{{ vehiclesTotal }}</InfoBox>
      </div>
      <div class="flex-centered vehicles__user-wrapper">
        <AddButton :size="'sm'" is-transparent class="vehicles__add-btn_place_header" />
        <div class="flex-centered interactive vehicles__user">
          <img src="@/assets/images/avatar.png" alt="User avatar" />
          <p class="text-medium">John Doe</p>
        </div>
        <button type="button" class="flex-centered">
          <div class="vehicles__lang-flag" />
          <span class="text-medium vehicles__lang-label">En</span>
          <BaseIcon :name="'arrowDown'" />
        </button>
      </div>
    </section>
    <section class="vehicles__management">
      <form @submit.prevent="onSearchFormSubmit">
        <label class="rounded-border vehicles__search-label">
          <input v-model.trim="searchValue" type="text" placeholder="Search VIN" />
          <button type="submit" class="vehicles__submit-btn">
            <BaseIcon :name="'zoom'" />
          </button>
        </label>
        <label class="vehicles__select-label">Select vehicles per page: </label>
        <div class="rounded-border vehicles__select">
          <select ref="selectMenu" @change="onVehiclesPerPageChange">
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9" selected>9</option>
          </select>
          <BaseIcon :name="'arrowDown'" />
        </div>
      </form>
      <AddButton :size="'lg'" :is-transparent="false">Add Vehicle</AddButton>
    </section>
    <section class="vehicles__search-result">
      <AppLoader v-if="isLoading" />
      <span v-if="requestError" class="error vehicles__error">{{ requestError }}</span>
      <ul v-if="vehiclesList && vehiclesList.length" class="vehicles__list">
        <li v-for="{ id, vehicle_name, vin, placeholder } of vehiclesList" :key="id">
          <VehicleCard :name="vehicle_name" :vin="vin" :image-src="placeholder" />
        </li>
      </ul>
    </section>
    <section class="vehicles__footer">
      <p>Showing {{ vehiclesList?.length }} out of {{ vehiclesTotal }}</p>
      <AppPagination
        :current-page="page"
        :final-page="finalPage"
        @next-btn-click="onNextBtnClick"
        @previous-btn-click="onPrevBtnClick"
      />
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

.rounded-border {
  border: var(--color-line-gray) 1px solid;
  border-radius: 8px;
}

.vehicles {
  flex-grow: 1;
}

.vehicles__header {
  width: 100%;
  justify-content: space-between;
  padding: 30px 30px 26px;
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

.vehicles__management {
  padding: 36px 32px 32px 30px;
  display: flex;
  justify-content: space-between;
}

.vehicles__management form {
  display: flex;
  align-items: center;
  font: 400 16px/1.375 'DM Sans';
}

.vehicles__search-label {
  width: 354px;
  position: relative;
  padding: 9px 50px 9px 16px;
  font: inherit;
  margin-right: 32px;
}

.vehicles__search-label input {
  font: inherit;
  width: 100%;
}

.vehicles__submit-btn {
  position: absolute;
  top: 8px;
  right: 14px;
}

.vehicles__select-label {
  margin-right: 16px;
}

.vehicles__select {
  position: relative;
  width: 85px;
  padding: 9px 16px;
  z-index: 1;
}

/** Кнопка со стрелкой вниз **/
.vehicles__select > div {
  position: absolute;
  top: 9px;
  right: 14px;
  z-index: 2;
}

.vehicles__select select {
  position: relative;
  appearance: none;
  width: 100%;
  cursor: pointer;
  background-color: var(--color-text-white);
  border: none;
  padding: 0;
  font: inherit;
  z-index: 3;
  background-color: transparent;
}

.vehicles__search-result {
  display: grid;
  justify-content: center;
}

/** Лоадер **/
.vehicles__search-result > div {
  margin-top: 100px;
  margin-inline: auto;
}

.vehicles__error {
  margin-top: 100px;
  text-align: center;
}

.vehicles__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.vehicles__footer {
  display: flex;
  justify-content: space-between;
  padding: 32px 30px 45px;
}

.vehicles__footer p {
  color: var(--color-text-black-dimmed);
}
</style>
