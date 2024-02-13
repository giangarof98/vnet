<template>
    <div class="flex flex-col items-center gap-4 m-4">
        <div 
            class="w-2/4 bg-slate-200 p-2" 
            >
            <p>-{{post.author}}</p>
            <img :src="post.image" alt="image">
            <div class="flex flex-row justify-between">

                <div class="p-2">
                    <p>-{{post.title}}</p>
                    <p>-{{post.description}}</p>
                </div>
                <div class="p-2 flex gap-4">
                    <LikePost :id="post._id"/>
                    {{post.like.length}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import LikePost from '../components/LikePost.vue'

export default {
    name:'View',
    components:{LikePost},
    props:['id'],
    data(){
        return{
            post:{
                image:'',
                author:'',
                like:''
            }
        }
    },
    mounted(){
        this.fetchData()
    },
    methods:{
        async fetchData(){
            const res = await axios.get(`/api/post/${this.$route.params.id}`)
            console.log(res)
            this.post = res.data
            this.post.image = res.data.image[0].url
            this.post.author = res.data.author.name
            this.post.like = res.data.likes
        },
    },
}
</script>