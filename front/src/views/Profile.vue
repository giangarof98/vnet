<template>
    <h1>Profile</h1>
    
    <p>Name: {{user.name}}</p>
    <p>Username: {{user.username}}</p>
    <p>Email: {{user.email}}</p>

    <router-link 
        class="bg-blue-500 rounded-full p-2"
        :to="`/profile/updateform/${user.id}`" >Update information</router-link>
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
                img:''
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
                
            } catch (error) {
                if(error.response.data.message){
                    this.message = error.response.data.message
                }
            }
        },
    }
}

</script>