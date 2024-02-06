<template>
    <h1>Profile</h1>
    <div class="flex flex-row gap-4">

        <div>
            <!-- <Image class="w-80 h-80"/> -->
            <img :src="user.image" alt="profile" class="w-80">
        </div>
        <div>

            <p>Name: {{user.name}}</p>
            <p>Username: {{user.username}}</p>
            <p>Email: {{user.email}}</p>
            <p>About: {{user.bio}}</p>
            <p>followers: {{user.followers}}</p>
            <router-link v-show="loggedUser === user.id"
                class="bg-blue-500 rounded-full p-2"
                :to="`/profile/updateform/${user.id}`" >Update information</router-link>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import Image from '../components/Image.vue'
export default {
    name:'Profile',
    // components:{Image},
    data(){
        return{
            loggedUser:'',
            user:{
                id:'',
                name:'',
                username:'',
                email:'',
                image:'',
                bio:'',
                followers:''
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods:{
        async fetchData(){
            this.loggedUser = localStorage.getItem('userId')
            const userId = this.$route.params.id
            // console.log(userId)
            try {        
                const res = await axios.get(`/api/user/${userId}`)
                // console.log(res)
                
                this.user.name = res.data.name
                this.user.username = res.data.username
                this.user.email = res.data.email
                this.user.id = res.data._id
                this.user.image = res.data.image[0].url
                this.user.bio = res.data.bio
                this.user.followers = res.data.followers
                
            } catch (error) {
                if(error.response.data.message){
                    this.message = error.response.data.message
                }
            }
        },
    }
}

</script>