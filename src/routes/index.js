import Table from '../components/Table.vue';
import Login from '../components/Login.vue';
import Hand from '../components/Hand.vue';
export default [
  {
    path: '/game',
    component: Table
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/hand',
    component: Hand
  }
]