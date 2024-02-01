<template>
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 gap-6">
                <button><router-link to="/signin" class="text-white">Signin</router-link></button>
                <button><router-link to="/signup" class="text-white">Signup</router-link></button>
                <!-- <button><router-link to="/" class="text-white">Profile</router-link></button> -->
                <!-- <button><router-link to="/" class="text-white">Admin</router-link></button> -->
                <!-- <button><router-link to="/addpost" class="text-white">New Post</router-link></button> -->
                
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name:'Navbar'
}
</script>