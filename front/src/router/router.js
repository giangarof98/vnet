import {createRouter, createWebHistory} from 'vue-router'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import UpdateForm from '../views/UpdateForm.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/signin', component: Signin, name:'Signin'},
        { path: '/signup', component: Signup, name:'Signup'},
        { path: '/profile/:id', component: Profile, name:'Profile'},
        { path: '/profile/updateform/:id', component: UpdateForm, name:'UpdateForm'}
    ]
});

export default router;