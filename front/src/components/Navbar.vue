<template>
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="relative flex p-2 gap-6">
                <div v-if="userId" class="flex flex-row justify-around w-full">
                    <div class="relative flex flex-row p-2 gap-6 text-white">
                        <button>Home</button>
                        <button>Create</button>
                    </div>
                    <div class="flex gap-4">
                        <button @click="logout" class="text-white">Logout</button>
                        <Image />
                    </div>
                </div>

                <div v-else class="relative flex h-16 gap-6">
                    <button><router-link to="/signin" class="text-white">Signin</router-link></button>
                    <button><router-link to="/signup" class="text-white">Signup</router-link></button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';
import Image from './Image.vue'
export default {
    name:'Navbar',
    components:{Image},
    data(){
        return{
            userId: '',
            image:'',
        }
    },
    mounted() {
        this.ifUser();
        
    },
    methods:{
        async fetchData(){
            const id = this.$route.params.id
            // const res = await axios.get(`/api/user/${id}`)
            // this.image = res.data.image[0].url
        },
        ifUser(){
            const user = localStorage.getItem('userId')
            this.userId = user
        },
        async logout(){
            const data = await axios.get('/api/user/logout')
            localStorage.removeItem('userId')
            this.userId = ''; // Clear userId immediately
            this.$router.push('/signin')
        }
    }
}
</script>