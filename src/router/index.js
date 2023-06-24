import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/profile/Profile.vue'
import Explore from '../views/restaurants/Explore.vue'
import RestoProfile from '../views/restaurants/RestoProfile.vue'
import ProfileSettings from '../views/profile/ProfileSettings.vue'
import Error404 from '../views/Error404.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profile/settings',
    name: 'ProfileSettings',
    component: ProfileSettings
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/restaurant/:restoId',
    name: 'RestoProfile',
    component: RestoProfile,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'Error404',
    component: Error404
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router


