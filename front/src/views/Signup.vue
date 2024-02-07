<template>
    <form class="mt-8" @submit.prevent="fetchData">
        <div class="flex flex-col items-center gap-4">
            <h1>SignUp</h1>
            <div>
                <label for="name">Name</label> <br>
                <input
                    v-model="user.name"
                    name="name"
                    type="text"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <div>
                <label for="username">Username</label> <br>
                <input
                    v-model="user.username"
                    name="username" 
                    type="text"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <div>
                <label for="email">Email</label> <br>
                <input
                    v-model="user.email" 
                    name="email"
                    type="text"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>

            <div>
                <label for="password">Password</label> <br>
                <input
                    v-model="user.password"
                    name="password" 
                    type="password"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <div>
                <label for="confirmPassword">Confirm password</label> <br>
                <input
                    v-model="user.confirmPassword"
                    form="confirmPassword" 
                    type="password"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <button class="rounded-full bg-cyan-600 p-3">Click to signup</button>
            <div v-if="message" class="text-red-500">{{ message }}</div>
            <router-link to="/signin" class="text-cyan-600">Already have an account?</router-link>
        </div>
    </form>
</template>


<script>
import axios from 'axios';
export default {
    name:'SignUp',
    data(){
        return{
            user:{
                name:'',
                username:'',
                email:'',
                password:'',
                confirmPassword:'',
            },
            message:''
        }
    },
    methods: {
        
        async fetchData(){
            try {
                const credentials = {
                    name: this.user.name, 
                    username: this.user.username, 
                    email: this.user.email, 
                    password: this.user.password, 
                    confirmPassword: this.user.confirmPassword
                    }
                    
                const res = await axios.post('/api/user/signup', credentials)
                console.log(res.data.message);
                this.$router.push(`/signin`)
                
            } catch (error) {
                console.log(error)
                if(error.response.data.message){
                    this.message = error.response.data.message
                }
                
            }
        }
    }
}
</script>