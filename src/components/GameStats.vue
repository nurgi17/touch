<template>
  <div class="game-stats">
    <div class="stat-item score">
      <div class="stat-label">Очки</div>
      <div class="stat-value">{{ score }}</div>
    </div>

    <div class="stat-item timer" :class="{ urgent: timeLeft <= 10 }">
      <div class="stat-label">Время</div>
      <div class="stat-value">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  timeLeft: number
}>()

const formattedTime = computed(() => {
  const minutes = Math.floor(props.timeLeft / 60)
  const seconds = props.timeLeft % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})
</script>

<style scoped>
.game-stats {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  padding: 0 20px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.95);
  padding: 15px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  min-width: 150px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.score .stat-value {
  color: #10b981;
}

.timer .stat-value {
  color: #3b82f6;
}

.timer.urgent .stat-value {
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
