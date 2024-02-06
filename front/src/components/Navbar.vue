<template>
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="relative flex p-2 gap-6">
                <div v-if="userId" class="flex flex-row justify-around w-full">
                    <div class="relative flex flex-row p-2 gap-6 text-white">
                        <button @click="navigateToHome"><font-awesome-icon icon="fa-solid fa-house" /></button>
                        <button @click="navigateToCreate"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                    </div>
                    <div class="flex gap-4">
                        <button @click="logout" class="text-white">
                            <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                        </button>
                        <router-link :to="`/profile/${userId}`">
                            <Image class="w-14 h-14 rounded-full"/>
                        </router-link>
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
            travelId:''
        }
    },
    mounted() {
        this.ifUser();
    },
    methods:{
        navigateToHome() {
            this.$router.push('/home');
        },
        navigateToCreate() {
            this.$router.push('/add');
        },
        // async fetchData(){
        //     const id = this.$route.params.id
        //     // const res = await axios.get(`/api/user/${id}`)
        //     // this.image = res.data.image[0].url
        // },
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