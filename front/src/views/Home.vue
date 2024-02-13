<template>
<div>

    <h1>Home</h1>
    <h2>all posts</h2>
    <h3>render all posts only is the user is following</h3>

    <div v-for="p in post" :key="p._id">
        <p>{{p.title}}</p>
        <p>{{p.description}}</p>
        <img :src="`${p.image[0].url}`" alt="image">
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name:'Home',
    data(){
        return{
            post:{
                // _id:'',
                // title:'',

            }
        }
    },
    mounted(){
        this.fetchData();
    },
    methods:{
        async fetchData(){
            const res = await axios.get(`/api/post`)
            // this.post._id = res.data._id
            // this.post.title = res.data.data.title
            console.log(res.data)
            this.post = res.data
        }
    }
}
</script>