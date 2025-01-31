import { boot } from 'quasar'
import { createPinia } from 'pinia'

export default boot(({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
})
