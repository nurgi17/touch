<template>
  <div class="flex flex-col justify-center items-center text-center">
    <img src="../assets/images/logo.svg" alt="logo" class="mb-[180px]! mt-[140px]!" />
    <div
      class="flex flex-col justify-center items-center text-center w-[900px] h-[1424px] rounded-[60px] border-10 border-solid border-[#28D223] result-back"
    >
      <div class="mt-[200px]! flex flex-col justify-center items-center">
        <div class="flex items-center gap-[50px]">
          <div class="font-medium text-white text-[500px] leading-120">
            {{ riskCoins }}
          </div>
          <div class="mt-30!">
            <img src="../assets/images/coin.svg" alt="" class="w-[199px] h-[216px]" />
          </div>
        </div>
        <div class="font-bold text-white text-[85px] mt-8! uppercase">
          {{ riskCoins > 0 ? $t('congrats') : $t('tryAgain') }}
        </div>
      </div>
      <div class="mt-[100px]!">
        <button
          @click="riskCoins > 0 ? goToStart() : playAgain()"
          @touchstart.prevent="riskCoins > 0 ? goToStart() : playAgain()"
          class="cursor-pointer touch-manipulation relative z-10 uppercase text-[96px] text-white font-bold pb-5! px-24! rounded-[10000px] bg-linear-to-tr from-[#063F06] to-[#28D223] border-10 border-solid border-[#28D223]"
        >
          {{ riskCoins > 0 ? $t('ok') : $t('newGame') }}
        </button>
      </div>
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
  goToStart: []
}>()

function playAgain() {
  emit('playAgain')
}

function goToStart() {
  emit('goToStart')
}
</script>

<style scoped>
.result-back {
  background-image: url('../assets/images/result-back.png');
}
</style>
