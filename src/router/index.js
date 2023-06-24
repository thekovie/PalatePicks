import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/profile/Profile.vue'
import Explore from '../views/restaurants/Explore.vue'
import RestoProfile from '../views/restaurants/RestoProfile.vue'
import ProfileSettings from '../views/profile/ProfileSettings.vue'
import Error404 from '../views/Error404.vue'
import UserProfiles from '../json/UserProfiles.json'
import NotFound from '../views/NotFound.vue';
//import NotFound from '@/views/NotFound.vue';

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
    component: Profile,
    props: true,
    beforeEnter: (to, from, next) => {
      const { username } = to.params;

      // Check if the username exists in the JSON data
      const userExists = UserProfiles.some(user => user.username === username);

      if (userExists) {
        next(); // Proceed to the Profile component
      } else {
        next({ name: 'NotFound' }); // Redirect to the NotFound component
      }
    },

  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'Error404',
    component: Error404
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
    path: '/restaurant/:resto',
    name: 'RestoProfile',
    component: RestoProfile,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router


