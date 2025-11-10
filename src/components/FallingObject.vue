<template>
  <div
    :class="['falling-object', { caught: object.caught }]"
    :style="objectStyle"
    @click="handleClick"
    @touchstart.prevent="handleTouch"
  >
    <img :src="config.emoji" alt="" />
    <div v-if="showPoints" class="points-popup">
      {{ object.points > 0 ? '+' : '' }}{{ object.points }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGameStore } from '../stores/gameStore'
import type { GameObject } from '../types/game'

const props = defineProps<{
  object: GameObject
}>()

const gameStore = useGameStore()
const showPoints = ref(false)

const config = computed(() => gameStore.getObjectConfig(props.object.type))

const objectStyle = computed(() => ({
  left: `${props.object.x}%`,
  animationDuration: `${props.object.duration}s`,
}))

function handleClick() {
  if (!props.object.caught) {
    catchObject()
  }
}

function handleTouch(event: TouchEvent) {
  // Предотвращаем стандартное поведение и двойной вызов
  event.preventDefault()
  event.stopPropagation()

  if (!props.object.caught) {
    catchObject()
  }
}

function catchObject() {
  gameStore.catchObject(props.object.id)
  showPoints.value = true

  setTimeout(() => {
    showPoints.value = false
  }, 500)
}
</script>

<style scoped>
.falling-object {
  position: absolute;
  top: -100px;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.1s;
  animation: fall linear forwards;
  user-select: none;
  /* Улучшение для touch устройств */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

.falling-object img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none; /* Важно! Не блокируем клики на родителя */
}

.falling-object:active {
  transform: scale(0.9);
}

.falling-object.caught {
  opacity: 0;
  transform: scale(1.3);
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.points-popup {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 50px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: popup 0.5s ease-out;
  pointer-events: none;
}

@keyframes popup {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-30px);
  }
}

@keyframes fall {
  from {
    top: -20px;
  }
  to {
    top: 970px;
  }
}
</style>
