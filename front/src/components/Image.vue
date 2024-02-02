<template>
    <img :src="image" alt="profile" class="w-14 h-14 rounded-full">
</template>

<script>
import axios from 'axios'
export default {
    Name: 'Image',
    data(){
        return{
            image:''
        }
    },
    mounted() {
        this.fetchData()
    },
    methods:{
        async fetchData(){
            const userId = localStorage.getItem('userId')
            // console.log(userId)
            try {        
                const res = await axios.get(`/api/user/${userId}`)
                console.log(res.data)
                this.image = res.data.image[0].url
                
            } catch (error) {
                if(error.response.data.message){
                    this.message = error.response.data.message
                }
            }
        },
    }
}
</script>