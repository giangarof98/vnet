<template>
    <p>followers: {{user.followers.length}}</p>
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
                followers:[],
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
           
        },
        async followUser(){
            const id = this.$route.params.id
            const res = await axios.post(`/api/user/follow/${id}`)
            this.fetchData()

        }
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