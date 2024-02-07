<template>
    <div class="flex flex-row gap-4">
        <p @click="decodeFollowers">Followers: {{user.followers.length}}</p>
        <p>Following: {{user.following.length}}</p>
    </div>
    <button v-show="user.userId !== this.$route.params.id" class="bg-lime-500 w-20 p-1 rounded-xl" @click="followUser">{{displayMsg}}</button>
</template>

<script>
import axios from 'axios'
export default {
    name:'FollowBtn',
    data(){
        return{
            user:{
                userId:'',
                followers:'',
                following:'',
            },
        }
    },
    mounted(){
        this.fetchData()
    },
    methods:{
        async fetchData(){
            const current = localStorage.getItem('userId')
            this.user.userId = current
            
            const userIdProfile = this.$route.params.id
            const res = await axios.get(`/api/user/${userIdProfile}`)
            
            this.user.followers = res.data.followers
            this.user.following = res.data.following
              
        },
        async followUser(){
            const id = this.$route.params.id
            const res = await axios.post(`/api/user/follow/${id}`)
            this.fetchData()

        },
        async decodeFollowers(){
            for(let id of this.user.followers){
                const res = await axios.get(`/api/user/${id}`)
                console.log(`${res.data.name} - ${res.data._id} - ${res.data.image[0].url}`)
            }
        },
    },
    computed: {
        displayMsg() {
            const loggedUser = localStorage.getItem('userId')
            if (this.user.followers.includes(loggedUser)) {
                return 'Unfollow'
            } else {
                return 'Follow'
            }
        }
    },

}
</script>