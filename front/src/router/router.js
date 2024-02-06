import {createRouter, createWebHistory} from 'vue-router'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import UpdateForm from '../views/UpdateForm.vue'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/signin', component: Signin, name:'Signin'},
        { path: '/signup', component: Signup, name:'Signup'},
        { path: '/profile/:id', component: Profile, name:'Profile'},
        { path: '/profile/updateform/:id', component: UpdateForm, name:'UpdateForm'},
        { path: '/home', component: Home, name:'Home'},
        { path: '/add', component: Create, name:'Create'}
    ]
});

export default router;