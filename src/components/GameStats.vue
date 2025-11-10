<template>
  <div class="flex flex-col justify-center items-center mt-[140px]!">
    <img src="../assets/images/logo.svg" alt="" class="mb-[41px]!" />
    <div class="timer-back w-[586px] h-[170px] flex justify-center items-center text-center">
      <span class="text-white font-bold text-[100px] pb-8!" :class="{ urgent: timeLeft <= 10 }">{{
        formattedTime
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  timeLeft: number
}>()

const formattedTime = computed(() => {
  const minutes = Math.floor(props.timeLeft / 60)
  const seconds = props.timeLeft % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})
</script>

<style scoped>
.timer-back {
  background-image: url('../assets/images/timer-back.png');
}
span.urgent {
  color: #ef4444;
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
