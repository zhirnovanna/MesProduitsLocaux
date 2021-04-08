import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/Dashboard.vue'
import adminDashboard from '../views/adminDashboard.vue'
import ModifyMyInfo from '../views/ModifyMyInfo.vue'
import PaiementPage from '../views/PaiementPage.vue'
import Confirmation from '../views/Confirmation.vue'
import store from '@/store'
import ProductsDisplay from '../views/ProductsDisplay.vue'
import Cart from '../views/Cart.vue'
import Administration from '../views/Administration/Administration.vue'
import ProductsAdministration from '../views/Administration/ProductsAdministration.vue'
import ProductAdministration from '../views/Administration/ProductAdministration.vue'
import CategoriesAdministration from '../views/Administration/CategoriesAdministration.vue'
import RegionsAdministration from '../views/Administration/RegionsAdministration.vue'
import EntityAdministration from '../views/Administration/EntityAdministration.vue'
import UsersAdministration from '../views/Administration/UsersAdministration.vue'
import UserAdministration from '../views/Administration/UserAdministration.vue'
import NotFound from '../views/NotFound.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/PaiementPage',
    name: PaiementPage,
    component: PaiementPage
  },
  {
    path: '/Confirmation',
    name: Confirmation,
    component: Confirmation
  },
  // ADMIN ROUTES
  {
    path: '/admin',
    name: 'adminDashboard',
    component: adminDashboard,
    beforeEnter: (to, from, next) => {
      console.log(store.getters); 
      console.log(store.getters[0]); 

      if (store.getters['auth/user'] === null ) {
        return next({
          name: 'Dashboard'
        })
      } 
      if (store.getters['auth/authenticated'].admin === 1) {
        console.log(store.getters['auth/authenticated']); 

        return next()
      } else {
        console.log("Not Admin")
        return next({
          name: 'Dashboard'
          })
      }
    },
    children: [
      {
        path: '/admin/modifymyinfo/:id',
        name: 'ModifyMyInfoAdmin',
        component: ModifyMyInfo,
      },
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'SignIn'
        })
      } else { 
        if (store.getters['auth/authenticated'].admin === 0) {
          next()
        } else if (store.getters['auth/authenticated'].admin === 1) {
          return next({
               name: 'adminDashboard'
               })
        }
      }
    },
    children: [
      {
        path: '/dashboard/modifymyinfo/:id',
        name: 'ModifyMyInfo',
        component: ModifyMyInfo,
      },
    ]
  },

  {
    path: '/region/:regionId',
    name: 'ProductsDisplay',
    component: ProductsDisplay
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/administration',
    name: 'Administration',
    component: Administration,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/user'] !== null && store.getters['auth/authenticated'].admin === 1) {
        return next()
      } else {
        return next({
          name: 'Home'
          })
      }
    }
  },
  {
    path: '/administration/products',
    name: 'ProductsAdministration',
    component: ProductsAdministration,
    children: [
      {
        path: '/administration/products/edit/:id',
        name: 'ProductUpdate',
        component: ProductAdministration
      },
      {
        path: '/administration/products/add',
        name: 'ProductCreation',
        component: ProductAdministration
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/user'] !== null && store.getters['auth/authenticated'].admin === 1) {
        return next()
      } else {
        return next({
          name: 'Home'
          })
      }
    }
  },
  {
    path: '/administration/categories',
    name: 'CategoriesAdministration',
    component: CategoriesAdministration,
    children: [
      {
        path: '/administration/categories/edit/:id',
        name: 'CategoryUpdate',
        component: EntityAdministration
      },
      {
        path: '/administration/categories/add',
        name: 'CategoryCreation',
        component: EntityAdministration
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/user'] !== null && store.getters['auth/authenticated'].admin === 1) {
        return next()
      } else {
        return next({
          name: 'Home'
          })
      }
    }
  },
  {
    path: '/administration/regions',
    name: 'RegionsAdministration',
    component: RegionsAdministration,
    children: [
      {
        path: '/administration/regions/edit/:id',
        name: 'RegionUpdate',
        component: EntityAdministration
      },
      {
        path: '/administration/regions/add',
        name: 'RegionCreation',
        component: EntityAdministration
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/user'] !== null && store.getters['auth/authenticated'].admin === 1) {
        return next()
      } else {
        return next({
          name: 'Home'
          })
      }
    }
  },
  {
    path: '/administration/users',
    name: 'UsersAdministration',
    component: UsersAdministration,
    children: [
      {
        path: '/administration/users/edit/:id',
        name: 'UserUpdate',
        component: UserAdministration
      },
    ],
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/user'] !== null && store.getters['auth/authenticated'].admin === 1) {
        return next()
      } else {
        return next({
          name: 'Home'
          })
      }
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
