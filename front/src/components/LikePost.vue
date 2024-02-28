<template>
    <div>
        <button @click="likePost">
            <div v-if="post.likesPost.includes(userId)">
                <font-awesome-icon icon="fa-solid fa-heart" class="like"/>
            </div>
             <div v-else>
                <font-awesome-icon icon="fa-solid fa-heart" />
            </div>
        </button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Like',
    props:['id', 'likes'],
    data(){
        return{
            userId:'',
            post:{
                likesPost: ''
            },
        }
    },
    mounted(){
        this.userIdFromLocal()
    },
    methods:{
        userIdFromLocal(){
            this.userId = localStorage.getItem('userId')
        },
        async likePost() {
            const res = await axios.post(`/api/post/like/${this.id}`)
            this.$router.go(0)
            // console.log(res.data)
        }
    }
}
</script>

