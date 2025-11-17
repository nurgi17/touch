import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    ru: {
      touch: 'TOUCH',
      battle: 'BATTLE',
      startGame: 'начать игру',
      tryAgain: 'попробуй ещё',
      congrats: 'поздравляем!',
      newGame: 'новая игра',
      ok: 'ок',
    },
    en: {
      touch: 'TOUCH',
      battle: 'BATTLE',
      startGame: 'start game',
      tryAgain: 'try again',
      congrats: 'congratulations!',
      newGame: 'new game',
      ok: 'ok',
    },
  },
})

export default i18n
