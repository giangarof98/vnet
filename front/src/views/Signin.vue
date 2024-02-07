<template>
    <form class="mt-8" @submit.prevent="fetchData">
        <div class="flex flex-col items-center gap-4">
            <h1>SignIn</h1>
            <div>
                <label for="username">Username</label> <br>
                <input
                    v-model="user.username" 
                    type="text"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <div>
                <label for="password">Password</label> <br>
                <input
                    v-model="user.password" 
                    type="password"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <button class="rounded-full bg-cyan-600 p-3">Click to login</button>
            <div v-if="message" class="text-red-500">{{ message }}</div>
            <router-link to="/signup" class="text-cyan-600">Don't have an account yet? Signin</router-link>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    name:'Signin',
    data(){
        return{
            user:{
                id:'',
                username:'',
                password:''
            },
            message:'',
        }
    },
    methods: {
        async fetchData(){
            try {
                const credentials = {
                    username: this.user.username, 
                    password: this.user.password, 
                }
                    
                const res = await axios.post('/api/user/signin', credentials)
                const id = res.data.userProfile._id
                localStorage.setItem("userId", id)
                this.$router.push(`/profile/${id}`)
                // console.log(res.data.userProfile);
                
            } catch (error) {
                if(error.response.data.message){
                    this.message = error.response.data.message
                } 
            }
        },
        
    },
    created() {
    // Fetch the message from route params when the component is created
    this.message = this.$route.params.message || '';
  }
}
</script>