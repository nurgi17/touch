<template>
  <div class="game-board">
    <!-- Start Screen -->
    <div v-if="!gameStore.isPlaying && !gameStore.gameEnded" class="start-screen">
      <div class="start-card">
        <h1 class="game-title">🎯 TAP VA-BANK</h1>
        <p class="game-description">Ловите падающие объекты и зарабатывайте очки!</p>

        <div class="objects-info">
          <div class="object-info">
            <span class="object-emoji">🪙</span>
            <span>Монета: +5 очков</span>
          </div>
          <div class="object-info">
            <span class="object-emoji">💎</span>
            <span>Джекпот: +25 очков</span>
          </div>
          <div class="object-info">
            <span class="object-emoji">💣</span>
            <span>Бомба: -15 очков</span>
          </div>
          <div class="object-info">
            <span class="object-emoji">❌</span>
            <span>Пусто: 0 очков</span>
          </div>
        </div>

        <button @click="startGame" class="start-btn">🚀 Начать игру</button>

        <div class="game-rules">
          <p><strong>⏱️ Время:</strong> 60 секунд</p>
          <p><strong>🎯 Цель:</strong> Набрать максимум очков</p>
        </div>
      </div>
    </div>

    <!-- Game Area -->
    <div v-if="gameStore.isPlaying" class="game-area">
      <GameStats :score="gameStore.score" :timeLeft="gameStore.timeLeft" />

      <FallingObject v-for="object in gameStore.objects" :key="object.id" :object="object" />

      <!-- Flash effect when game ends -->
      <div v-if="showFlash" class="flash-effect"></div>
    </div>

    <!-- Result Screen -->
    <ResultScreen
      v-if="gameStore.gameEnded"
      :final-score="gameStore.finalScore"
      :risk-coins="gameStore.riskCoins"
      @play-again="playAgain"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGameStore } from '../stores/gameStore'
import FallingObject from './FallingObject.vue'
import GameStats from './GameStats.vue'
import ResultScreen from './ResultScreen.vue'

const gameStore = useGameStore()
const showFlash = ref(false)

function startGame() {
  gameStore.startGame()
}

function playAgain() {
  gameStore.resetGame()
  gameStore.startGame()
}

// Watch for game end to show flash
watch(
  () => gameStore.isPlaying,
  (isPlaying, wasPlaying) => {
    if (wasPlaying && !isPlaying) {
      showFlash.value = true
      setTimeout(() => {
        showFlash.value = false
      }, 500)
    }
  },
)
</script>

<style scoped>
.game-board {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Start Screen */
.start-screen {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.start-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.game-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

.game-description {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.objects-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.object-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f3f4f6;
  border-radius: 10px;
  font-size: 0.95rem;
}

.object-emoji {
  font-size: 1.8rem;
}

.start-btn {
  width: 100%;
  padding: 18px;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  margin-bottom: 20px;
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.start-btn:active {
  transform: translateY(0);
}

.game-rules {
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}

.game-rules p {
  margin: 8px 0;
}

/* Game Area */
.game-area {
  width: 100%;
  height: 100%;
  position: relative;
}

.flash-effect {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 999;
  animation: flash 0.5s ease-in-out;
}

@keyframes flash {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
}
</style>
