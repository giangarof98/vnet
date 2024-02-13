<template>
    <div>
        <button @click="likePost(id)">
            <font-awesome-icon icon="fa-solid fa-heart"/>
        </button>
        {{post.like}}
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Like',
    props:['id'],
    data(){
        return{
            post:{
                like:''
            }
        }
    },
    methods:{
        async likePost() {
            const res = await axios.post(`/api/post/like/${this.id}`)
            this.post.like = res.data.likes
            console.log(res.data)
        }
    }
}
</script>