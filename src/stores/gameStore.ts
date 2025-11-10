import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { GameObject, GameState } from '../types/game'
import { ObjectType } from '../types/game'

export const useGameStore = defineStore('game', () => {
  // State
  const isPlaying = ref(false)
  const score = ref(0)
  const timeLeft = ref(60)
  const objects = ref<GameObject[]>([])
  const gameEnded = ref(false)
  const finalScore = ref(0)
  const riskCoins = ref(0)

  let gameTimer: number | null = null
  let objectSpawner: number | null = null
  let objectIdCounter = 0

  // Computed
  const gameState = computed<GameState>(() => ({
    isPlaying: isPlaying.value,
    score: score.value,
    timeLeft: timeLeft.value,
    objects: objects.value,
    gameEnded: gameEnded.value,
    finalScore: finalScore.value,
    riskCoins: riskCoins.value
  }))

  // Object configurations
  const objectConfigs = {
    [ObjectType.BOMB]: {
      points: -15,
      probability: 0.2,
      emoji: '💣',
      color: 'bg-red-500'
    },
    [ObjectType.EMPTY]: {
      points: 0,
      probability: 0.3,
      emoji: '❌',
      color: 'bg-gray-400'
    },
    [ObjectType.COIN]: {
      points: 5,
      probability: 0.4,
      emoji: '🪙',
      color: 'bg-yellow-400'
    },
    [ObjectType.JACKPOT]: {
      points: 25,
      probability: 0.1,
      emoji: '💎',
      color: 'bg-purple-500'
    }
  }

  // Methods
  function startGame() {
    isPlaying.value = true
    gameEnded.value = false
    score.value = 0
    timeLeft.value = 60
    finalScore.value = 0
    riskCoins.value = 0
    objects.value = []
    objectIdCounter = 0

    // Start game timer
    gameTimer = window.setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        endGame()
      }
    }, 1000)

    // Start object spawner
    objectSpawner = window.setInterval(() => {
      spawnObject()
    }, 800) // Spawn object every 800ms
  }

  function spawnObject() {
    if (!isPlaying.value) return

    const type = getRandomObjectType()
    const config = objectConfigs[type]

    const newObject: GameObject = {
      id: `obj-${objectIdCounter++}`,
      type,
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: -100,
      points: config.points,
      duration: Math.random() * 2 + 3, // 3-5 seconds to fall
      caught: false
    }

    objects.value.push(newObject)

    // Remove object after it falls
    setTimeout(() => {
      removeObject(newObject.id)
    }, newObject.duration * 1000 + 100)
  }

  function getRandomObjectType(): ObjectType {
    const random = Math.random()
    let cumulative = 0

    for (const [type, config] of Object.entries(objectConfigs)) {
      cumulative += config.probability
      if (random <= cumulative) {
        return type as ObjectType
      }
    }

    return ObjectType.COIN
  }

  function catchObject(objectId: string) {
    const object = objects.value.find(obj => obj.id === objectId)

    if (object && !object.caught) {
      object.caught = true
      score.value = Math.max(0, score.value + object.points)

      // Remove the object after a short delay to show animation
      setTimeout(() => {
        removeObject(objectId)
      }, 100)
    }
  }

  function removeObject(objectId: string) {
    const index = objects.value.findIndex(obj => obj.id === objectId)
    if (index !== -1) {
      objects.value.splice(index, 1)
    }
  }

  function endGame() {
    isPlaying.value = false
    finalScore.value = score.value

    // Clear timers
    if (gameTimer) {
      clearInterval(gameTimer)
      gameTimer = null
    }
    if (objectSpawner) {
      clearInterval(objectSpawner)
      objectSpawner = null
    }

    // Clear remaining objects
    objects.value = []

    // Calculate risk coins
    riskCoins.value = calculateRiskCoins(finalScore.value)

    // Show result after a short delay for flash effect
    setTimeout(() => {
      gameEnded.value = true
    }, 500)
  }

  function calculateRiskCoins(points: number): number {
    if (points < 50) return 0
    if (points >= 50 && points < 100) return 5
    if (points >= 100 && points < 150) return 10
    return 15
  }

  function resetGame() {
    gameEnded.value = false
    score.value = 0
    timeLeft.value = 60
    finalScore.value = 0
    riskCoins.value = 0
    objects.value = []
  }

  function getObjectConfig(type: ObjectType) {
    return objectConfigs[type]
  }

  return {
    // State
    gameState,
    isPlaying,
    score,
    timeLeft,
    objects,
    gameEnded,
    finalScore,
    riskCoins,

    // Methods
    startGame,
    catchObject,
    endGame,
    resetGame,
    getObjectConfig
  }
})
