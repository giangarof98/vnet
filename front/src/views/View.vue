<template>
    <div class="flex flex-col items-center gap-4 m-4">
        <div 
            class="w-2/4 bg-slate-200 p-2" 
        >
            <p 
                @click="goToUser(post.idAuthor)"
                class="cursor-pointer hover:text-blue-700"
            >-{{post.authorName}}</p>
            <img :src="post.image" alt="image" class="w-full">
            <div class="flex flex-row justify-between">

                <div class="p-2">
                    <p>-{{post.title}}</p>
                    <p>-{{post.description}}</p>
                </div>
                <div class="flex items-center gap-5">
                    <!-- <LikePost :id="post._id" :likes="likes" /> -->
                    <button @click="likePost">
                        <div v-if="likes.includes(this.userId)">
                            <font-awesome-icon icon="fa-solid fa-heart" class="like"/>
                        </div>
                        <div v-else>
                            <font-awesome-icon icon="fa-solid fa-heart" />
                        </div>
                    </button>
                        {{likes.length}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import LikePost from '../components/LikePost.vue'

export default {
    name:'View',
    // components:{LikePost},
    // props:['id'],
    data(){
        return{
            post:{
                id:'',
                image:'',
                authorName:'',
                idAuthor:''
            },
            likes:[],
            userId:'',
        }
    },
    mounted(){
        this.fetchData()
        this.userIdFromLocal()
        // console.log(this.userId)
    },
    methods:{
        goToUser(id){
            this.$router.push(`/profile/${id}`);
        },
        userIdFromLocal(){
            this.userId = localStorage.getItem('userId')
        },
        async fetchData(){
            const res = await axios.get(`/api/post/${this.$route.params.id}`)
            this.post = res.data
            this.post.image = res.data.image[0].url
            this.post.id = res.data._id
            this.post.authorName = res.data.author.name
            this.post.idAuthor = res.data.author._id
            this.likes = res.data.likes
            console.log(res.data)
        },
        async likePost() {
            const res = await axios.post(`/api/post/like/${this.post.id}`)
            this.$router.go(0)
            console.log(res.data)
        }
    }
}
</script>

<style scoped>
.like{
    color: red;
}
</style>