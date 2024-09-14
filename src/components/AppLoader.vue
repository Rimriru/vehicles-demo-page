<script setup lang="ts"></script>

<template>
  <div />
</template>

<style scoped>
div {
  width: 100px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-color: #ccc #0000;
  animation: l16 1s infinite linear;
}
div::before,
div::after {
  content: '';
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
}
div::before {
  border-color: var(--color-red) #0000;
  animation: inherit;
  animation-duration: 0.5s;
  animation-direction: reverse;
}
div::after {
  margin: 8px;
}

@keyframes l16 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
