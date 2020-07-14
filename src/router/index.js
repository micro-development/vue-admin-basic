import {
    router,
    store
} from 'common/src/output'
import curRoutes from './routes'

// console.log('basic router', router)
// console.log('basic curRoutes', curRoutes)

router.addRoutes(curRoutes)

const newRoutes = store.getters.getRoutes.concat(curRoutes)
store.commit('setRoutes', newRoutes)
// console.log('basic router/index.js store.getters.getRoutes', store.getters.getRoutes)
