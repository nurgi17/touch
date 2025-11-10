<template>
  <div class="result-screen">
    <div class="result-card">
      <h1 class="title">🎮 Игра завершена!</h1>

      <div class="score-display">
        <div class="final-score">
          <div class="score-label">Финальный счёт</div>
          <div class="score-value">{{ finalScore }}</div>
        </div>

        <div class="coins-earned">
          <div class="coins-icon">🪙</div>
          <div class="coins-amount">+{{ riskCoins }}</div>
          <div class="coins-label">рикскоинов</div>
        </div>
      </div>

      <div class="rewards-info">
        <h3>Таблица наград:</h3>
        <ul>
          <li :class="{ achieved: finalScore >= 0 && finalScore < 50 }">&lt; 50 очков → 0 🪙</li>
          <li :class="{ achieved: finalScore >= 50 && finalScore < 100 }">50-99 очков → 5 🪙</li>
          <li :class="{ achieved: finalScore >= 100 && finalScore < 150 }">
            100-149 очков → 10 🪙
          </li>
          <li :class="{ achieved: finalScore >= 150 }">150+ очков → 15 🪙 (максимум)</li>
        </ul>
      </div>

      <button @click="playAgain" class="play-again-btn">🔄 Играть снова</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  finalScore: number
  riskCoins: number
}>()

const emit = defineEmits<{
  playAgain: []
}>()

function playAgain() {
  emit('playAgain')
}
</script>

<style scoped>
.result-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.result-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.score-display {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.final-score {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
}

.score-label {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 10px;
}

.score-value {
  font-size: 3.5rem;
  font-weight: bold;
}

.coins-earned {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 15px;
  color: white;
}

.coins-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.coins-amount {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.coins-label {
  font-size: 1rem;
  opacity: 0.9;
}

.rewards-info {
  background: #f3f4f6;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.rewards-info h3 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #333;
}

.rewards-info ul {
  list-style: none;
  padding: 0;
}

.rewards-info li {
  padding: 10px;
  margin-bottom: 8px;
  background: white;
  border-radius: 8px;
  color: #666;
  transition: all 0.3s;
}

.rewards-info li.achieved {
  background: #10b981;
  color: white;
  font-weight: bold;
  transform: scale(1.02);
}

.play-again-btn {
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.play-again-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.play-again-btn:active {
  transform: translateY(0);
}
</style>
