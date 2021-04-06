import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/Dashboard.vue'
import adminDashboard from '../views/adminDashboard.vue'
import store from '@/store'
import ProductsDisplay from '../views/ProductsDisplay.vue'
import Administration from '../views/Administration/Administration.vue'
import ProductsAdministration from '../views/Administration/ProductsAdministration.vue'
import ProductAdministration from '../views/Administration/ProductAdministration.vue'
import CategoriesAdministration from '../views/Administration/CategoriesAdministration.vue'
import RegionsAdministration from '../views/Administration/RegionsAdministration.vue'
import EntityAdministration from '../views/Administration/EntityAdministration.vue'
import UsersAdministration from '../views/Administration/UsersAdministration.vue'
import UserAdministration from '../views/Administration/UserAdministration.vue'

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
    }
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
         }
           else if (store.getters['auth/authenticated'].admin === 1) {
             return next({
               name: 'adminDashboard'
               })
           }
      }
    }
  },
  {
    path: '/region/:regionId',
    name: 'ProductsDisplay',
    component: ProductsDisplay
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
