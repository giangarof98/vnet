<template>
    <form class="mt-8" @submit.prevent="updateForm">
        <div class="flex flex-col items-center gap-4">
            <h1>Update Form</h1>

            <div class="flex flex-row justify-around w-3/4">
                <div class="flex flex-col items-center gap-2">
                    <label for="image">Image Profile</label> <br>
                    <input type="file"
                        @change="handleImageChange"
                        class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none"
                    >
                    <div class="flex gap-2">
                        <div>
                            <h3>Actual Image</h3>
                            <Image class="w-80"/>
                        </div>
                        <div v-if="previewImage">
                            <h3>New Image</h3>
                            <img :src="previewImage" alt="preview" class="w-80">
                        </div>
                    </div>
                </div>
                <div class="w-1/3">
                    <!-- NAME -->
                    <div>
                        <label for="name">Name</label> <br>
                        <input
                            v-model="user.name"
                            name="name"
                            type="text"
                            class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none w-full"
                            >
                    </div>
                    <!-- Username -->
                    <div>
                        <label for="username">Username</label> <br>
                        <input
                            v-model="user.username"
                            name="username" 
                            type="text"
                            class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none w-full"
                            >
                    </div>
                    <!-- Email -->
                    <div>
                        <label for="email">Email</label> <br>
                        <input
                            v-model="user.email" 
                            name="email"
                            type="text"
                            class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none w-full"
                            >
                    </div>
                    <!-- Password -->
                    <div>
                        <label for="password">Password</label> <br>
                        <input
                            v-model="user.password"
                            
                            name="password" 
                            type="password"
                            class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none w-full"
                            >
                    </div>
                    <!-- About -->
                    <div>
                        <label for="bio">About</label> <br>
                        <textarea
                            v-model="user.bio"
                            name="bio" 
                            class="border border-gray-500 rounded p-2 text-gray-500 focus:outline-none w-full"
                            />
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
                </div>
            </div>
            <button class="rounded-full bg-emerald-300 p-3">Submit Changes</button>
            <button class="rounded-full bg-cyan-600 p-3">
                <router-link :to="`/profile/${this.$route.params.id}`">Go Back</router-link>
            </button>

            <div v-if="message" class="text-red-500">{{ message }}</div>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import Image from '../components/Image.vue'

export default {
    name:'UpdateForm',
    components:{Image},
    data(){
        return{
            user:{
                id:'',
                name:'',
                username:'',
                email:'',
                bio:'',
                password:'',
                confirmPassword:'',
                image:'',
            },
            message:'',
            previewImage:''
        }
    },
    mounted() {
        this.fetchData()
        this.updateForm()
    },
    
    methods:{
        handleImageChange(e){
            this.user.image = e.target.files[0];
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.previewImage = event.target.result;

                // this is the new url
                // console.log(this.user.image)
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        },
        async fetchData(){
            const id = this.$route.params.id
            const res = await axios.get(`/api/user/${id}`)
            this.user.name = res.data.name
            this.user.username = res.data.username
            this.user.email = res.data.email
            this.user.bio = res.data.bio
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
                formData.append("bio", this.user.bio);
                formData.append("image", this.user.image);
                formData.append("password", this.user.password);
                formData.append("confirmPassword", this.user.confirmPassword);
                const res = await axios.put(`/api/user/update/${id}`, formData)
                // console.log(res)
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