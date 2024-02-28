<template>
    <div class="flex flex-col w-full items-center mt-8">
        <h1>Add a post</h1>
        <form 
                @submit.prevent="createPost"
                class="flex flex-col bg-slate-300 p-3 w-6/12">
                    <label for="title">Tilte</label>
                    <input name="title" type="text" v-model="post.title">

                    <label for="description">Description</label>
                    <textarea name="description" cols="30" rows="5" v-model="post.description"></textarea>

                    <label for="image">Image</label>
                    <input name="image" type="file" @change="handleImageChange">

                    <button>Submit</button>
            </form>   
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'CreatePost',
    data(){
        return{
            userId:'',
            post:{
                title:'',
                description:'',
                image:''
            }
        }
    },
    mounted(){
        this.userIdFromLocal()
    },
    methods:{
        userIdFromLocal(){
            this.userId = localStorage.getItem('userId')
        },
        handleImageChange(e){
            this.post.image = e.target.files[0];
            const file = e.target.files[0];
            console.log(file)
            
        },
        async createPost(){
            const formData = new FormData()
            formData.append('image', this.post.image)
            formData.append('title', this.post.title)
            formData.append('description', this.post.description)
            const res = await axios.post('/api/post/add', formData)
            console.log(res)
            this.$router.push(`/profile/${this.userId}`);
        },
    }
}
</script>