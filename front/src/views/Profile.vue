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
            <router-link 
                class="bg-blue-500 rounded-full p-2"
                :to="`/profile/updateform/${user.id}`" >Update information</router-link>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
export default {
    name:'Profile',
    data(){
        return{
            user:{
                id:'',
                name:'',
                username:'',
                email:'',
                image:''
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods:{
        async fetchData(){
            const userId = this.$route.params.id
            // console.log(userId)
            try {        
                const res = await axios.get(`/api/user/${userId}`)
                // console.log(res)
                // this.user = res.data
                this.user.name = res.data.name
                this.user.username = res.data.username
                this.user.email = res.data.email
                this.user.id = res.data._id
                this.user.image = res.data.image[0].url
                
            } catch (error) {
                if(error.response.data.message){
                    this.message = error.response.data.message
                }
            }
        },
    }
}

</script>