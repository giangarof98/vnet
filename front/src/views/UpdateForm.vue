<template>
    <form class="mt-8" @submit.prevent="updateForm">
        <div class="flex flex-col items-center gap-4">
            <h1>Update Form</h1>
            <div>
                <label for="image">Image Profile</label> <br>
                <input type="file"
                    @change="handleImageChange"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                >
                <img :src="user.image" alt="profile" class="w-52">
            </div>
            <div>
                <label for="name">Name</label> <br>
                <input
                    v-model="user.name"
                    name="name"
                    type="text"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <div>
                <label for="username">Username</label> <br>
                <input
                    v-model="user.username"
                    name="username" 
                    type="text"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <div>
                <label for="email">Email</label> <br>
                <input
                    v-model="user.email" 
                    name="email"
                    type="text"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>

            <div>
                <label for="password">Password</label> <br>
                <input
                    v-model="user.password"
                    
                    name="password" 
                    type="password"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div>
            <!-- <div>
                <label for="confirmPassword">Confirm password</label> <br>
                <input
                    v-model="user.confirmPassword"
                    :placeholder="user.password"
                    name="confirmPassword" 
                    type="password"
                    class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
            </div> -->
            <button class="rounded-full bg-cyan-600 p-3">Submit Changes</button>
            <div v-if="message" class="text-red-500">{{ message }}</div>
        </div>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name:'UpdateForm',
    data(){
        return{
            user:{
                name:'',
                username:'',
                email:'',
                password:'',
                confirmPassword:'',
                image:'',
            },
            message:''
        }
    },
    mounted() {
        this.fetchData()
        this.updateForm()
    },
    methods:{
        handleImageChange(e){
            this.user.image = e.target.files[0];
        },
        async fetchData(){
            const id = this.$route.params.id
            const res = await axios.get(`/api/user/${id}`)
            this.user.name = res.data.name
            this.user.username = res.data.username
            this.user.email = res.data.email
            this.user.image = res.data.image[0].url
            this.user.password = res.data.password
            // console.log(res.data)
        },
        async updateForm(){
            const id = this.$route.params.id
            try {
                const formData = new FormData();
                formData.append("name", this.user.name);
                formData.append("username", this.user.username);
                formData.append("email", this.user.email);
                formData.append("image", this.user.image);
                formData.append("password", this.user.password);
                formData.append("confirmPassword", this.user.confirmPassword);
                const res = await axios.put(`/api/user/update/${id}`, formData)
                console.log(res)
                this.$router.push(`/profile/${id}`)
                
            } catch (error) {
                if(error.response.data.message){
                    this.message = error.response.data.message
                }
            }
        }
    }
    
}
</script>