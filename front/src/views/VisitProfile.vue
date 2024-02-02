<template>
    <h1>Profile</h1>
    <div class="flex flex-row gap-4">

        <div>
            <img :src="user.image" alt="profile" class="w-80">
        </div>
        <div>

            <p>Name: {{user.name}}</p>
            <p>Username: {{user.username}}</p>
            <p>Email: {{user.email}}</p>
            <p>About: {{user.bio}}</p>
            <router-link 
                class="bg-blue-500 rounded-full p-2"
                :to="`/profile/updateform/${user.id}`" >Update information</router-link>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import Image from '../components/Image.vue'
export default {
    name:'VisitProfile',
    data(){
        return{
            user:{
                id:'',
                name:'',
                username:'',
                email:'',
                image:'',
                bio:''
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods:{
        async fetchData(){
            const id = this.$route.params.id
            console.log(id)
            try {        
                const res = await axios.get(`/api/user/${this.$route.params.id}`)
                
                this.user.name = res.data.name
                this.user.username = res.data.username
                this.user.email = res.data.email
                this.user.id = res.data._id
                this.user.image = res.data.image[0].url
                this.user.bio = res.data.bio
                
            } catch (error) {
                if(error.response.data.message){
                    this.message = error.response.data.message
                }
            }
        },
    }
}

</script>