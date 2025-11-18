<template>
  <div
    class="game-board w-[2560px] h-[1440px] max-w-[2560px] max-h-[1440px]"
    :class="{
      'start-back': !gameStore.isPlaying && !gameStore.gameEnded,
      'main-back': gameStore.isPlaying || gameStore.gameEnded,
    }"
  >
    <!-- Start Screen -->
    <div
      v-if="!gameStore.isPlaying && !gameStore.gameEnded"
      class="flex flex-col justify-center items-center text-center"
    >
      <div class="flex flex-col justify-center items-center mt-[341px]!">
        <img src="../assets/images/logo.svg" alt="logo" class="mb-14!" />
        <h1 class="font-bold text-[150px] text-white leading-40">{{ $t('touch') }}</h1>
        <h1 class="font-bold text-[150px] text-white leading-40 second-font">
          <i>{{ $t('battle') }}</i>
        </h1>
      </div>
      <button
        @click="startGame"
        @touchstart.prevent="startGame"
        class="cursor-pointer touch-manipulation relative z-10 uppercase text-[96px] text-white font-bold pb-5! px-33.5! rounded-[10000px] bg-linear-to-tr from-[#063F06] to-[#28D223] border-10 border-solid border-[#28D223] mt-30!"
      >
        {{ $t('startGame') }}
      </button>
    </div>

    <!-- Game Area -->
    <div v-if="gameStore.isPlaying" class="game-area">
      <div class="mb-[40px]!">
        <GameStats :timeLeft="gameStore.timeLeft" />
      </div>
      <div class="flex flex-col justify-center items-center text-center game-container">
        <div
          class="relative w-[1400px] h-[900px] rounded-[60px] bg-linear-to-b from-[#032611] to-[#28D223] border-10 border-solid border-[#28D223]"
        >
          <FallingObject v-for="object in gameStore.objects" :key="object.id" :object="object" />
        </div>
      </div>

      <div class="flex flex-col justify-center items-center text-center">
        <div
          class="bg-[#032611] rounded-[40px] border-8 border-solid border-[#28D223] mt-[40px]! w-[1400px] h-[100px]! relative"
        >
          <span class="font-bold text-white text-[88px] absolute top-[-39px] left-[47%]">
            {{ gameStore.score }}
          </span>
        </div>
      </div>
    </div>

    <!-- Result Screen -->
    <ResultScreen
      v-if="gameStore.gameEnded"
      :final-score="gameStore.finalScore"
      :risk-coins="gameStore.riskCoins"
      @play-again="playAgain"
      @go-to-start="goToStart"
    />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'
import FallingObject from './FallingObject.vue'
import GameStats from './GameStats.vue'
import ResultScreen from './ResultScreen.vue'

const gameStore = useGameStore()

function startGame() {
  gameStore.startGame()
}

function playAgain() {
  gameStore.resetGame()
  gameStore.startGame()
}
function goToStart() {
  gameStore.resetGame()
}
</script>

<style scoped>
.second-font i {
  font-family: 'Calvino', sans-serif !important;
}

.game-board {
  position: relative;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}

.game-container {
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
}

.start-back {
  background-image: url('../assets/images/start-back.png');
}
.main-back {
  background-image: url('../assets/images/main-back.png');
}

.game-area {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
