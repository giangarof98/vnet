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
                v-show="loggedUser === user.id"
                class="bg-blue-500 rounded-full p-2"
                :to="`/profile/updateform/${user.id}`">
            Update information
            </router-link>

            <FollowBtn />
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import FollowBtn from '../components/FollowBtn.vue'
export default {
    name:'Profile',
    components:{FollowBtn},
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
          
            try {        
                const res = await axios.get(`/api/user/${userId}`)
                this.user.followers = res.data.followers
                
                this.user.name = res.data.name
                this.user.username = res.data.username
                this.user.email = res.data.email
                this.user.id = res.data._id
                this.user.image = res.data.image[0].url
                this.user.bio = res.data.bio
                
                // this.decodeFollowers(this.user.followers)

            } catch (error) {
                if(error.response.data.message){
                    this.message = error.response.data.message
                }
            }
        },
        async decodeFollowers(x){
            for(let id of x){
                const res = await axios.get(`/api/user/${id}`)
                // console.log(res.data.name)
            }
        },
    }
}

</script>