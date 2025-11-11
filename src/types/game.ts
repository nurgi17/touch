export enum ObjectType {
  BOMB = 'BOMB',
  GIRA = 'GIRA',
  EMPTY = 'EMPTY',
  FLOWER = 'FLOWER',
  LEAFLET = 'LEAFLET',
  COIN = 'COIN',
  JACKPOT = 'JACKPOT',
}

export interface GameObject {
  id: string
  type: ObjectType
  x: number
  y: number
  points: number
  duration: number
  caught: boolean
}

export interface GameState {
  isPlaying: boolean
  score: number
  timeLeft: number
  objects: GameObject[]
  gameEnded: boolean
  finalScore: number
  riskCoins: number
}
