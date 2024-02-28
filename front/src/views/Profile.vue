<template>
    <div class="flex flex-col items-center mt-8 w-full gap-5">
        <div>
            <img :src="user.image" alt="profile" class="w-80">
        </div>
        <div class="w-1/3 text-center">
            <p>Name: {{user.name}}</p>
            <p>Username: {{user.username}}</p>
            <!-- <p>Email: {{user.email}}</p> -->
            <p>{{user.bio}}</p>
            <router-link 
                v-show="loggedUser === user.id"
                class="bg-blue-500 rounded-full p-2"
                :to="`/profile/updateform/${user.id}`">
            Update information
            </router-link>
            <FollowBtn />
        </div>
    </div>

    <div class="flex justify-center p-1">
        <div class="grid grid-cols-3 gap-1 w-2/3 align-center">
            <div
                class="flex h-60"
                v-for="i in posts" :key="i._id">
                <img :src="i.image[0].url" alt="image" class="cursor-pointer w-full object-cover" @click="goToPost(i._id)">
            </div>
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
            },
            posts:[],
            userId:''
        }
    },
    mounted() {
        this.fetchData()
        this.fetchPosts()
        this.userIdFromLocal()
    },
    methods:{
        async goToPost(id){
            this.$router.push(`/post/${id}`);
        },
        userIdFromLocal(){
            this.userId = localStorage.getItem('userId')
        },
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
        async fetchPosts(){
            const userId = this.$route.params.id
            const res = await axios.get(`/api/post`)
            const filtered = res.data
            // console.log(res.data)
            const filteresPost = filtered.filter(post => post.author._id === userId)
            this.posts = filteresPost
        },
        // async decodeFollowers(x){
        //     for(let id of x){
        //         const res = await axios.get(`/api/user/${id}`)
        //         console.log(`${res.data.name} - ${res.data._id} - ${res.data.image[0].url}`)
        //     }
        // },
    },
    
}

</script>