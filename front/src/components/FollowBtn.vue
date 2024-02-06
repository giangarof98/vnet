<template>
    <p>followers: {{user.followers.length}}</p>
    <button class="bg-lime-500 w-20 p-1 rounded-xl" @click="followUser">{{isFollowing}}</button>
</template>

<script>
import axios from 'axios'
export default {
    name:'FollowBtn',
    data(){
        return{
            user:{
                followers:'',
            },
            isFollowing:''
        }
    },
    mounted(){
        this.fetchData()
    },
    methods:{
        async fetchData(){
            const logged = localStorage.getItem('userId')
            const userId = this.$route.params.id
            const res = await axios.get(`/api/user/${userId}`)
            this.user.followers = res.data.followers
            
            console.log(res.data.followers)
            if(logged.includes(this.user.followers)){
                return this.isFollowing = 'Follow' 
            } else {
                return this.isFollowing = 'UnFollow'
            }
        },
        async followUser(){
            const id = this.$route.params.id
            const res = await axios.post(`/api/user/follow/${id}`)
            this.isFollowing = !this.isFollowing
            console.log(res)
        }
    },
    computed: {
        buttonText() {
            return this.isFollowing ? 'Unfollow' : 'Follow'
        }
    }
}
</script>