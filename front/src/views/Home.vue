<template>
    <div class="flex flex-col items-center gap-5 m-5 w-full">
        
            <div 
                v-for="p in reversedPosts" 
                :key="p._id"
                class="w-2/4 bg-slate-200 p-2" 
            >
                <img 
                    :src="`${p.image[0].url}`" 
                    alt="image"
                    class="w-full cursor-pointer"
                    @click="goToPost(p._id)"
                    > 
                <div class="flex flex-row justify-between p-2">
                    <div>
                        {{p.author.name}}
                    </div>
                    <div class="flex gap-4">
                        <!-- <LikePost :id="p._id"/> -->
                        {{p.likes.length}}
                    </div>
                </div> 
            </div>
    </div>
</template>

<script>
import axios from 'axios';
import LikePost from '../components/LikePost.vue'

export default {
    name:'Home',
    components:{LikePost},
    data(){
        return{
            post:[]
        }
    },
    mounted(){
        this.fetchData();
    },
    computed:{
        reversedPosts() {
            return this.post.slice().reverse();
        }
    },
    methods:{
        async fetchData(){
            const res = await axios.get(`/api/post`)
            console.log(res.data)
            this.post = res.data
            // this.post.image = res.data
            // this.post.name = res.data.author.name
            // this.post.like = res.data.likes
        },
        async goToPost(id){
            this.$router.push(`/post/${id}`);
        }
    }

}
</script>