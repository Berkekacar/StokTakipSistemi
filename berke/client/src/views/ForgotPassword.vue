<template>
    <div class="ForgotPassword">
        <form @submit.prevent="handleSubmit">
            <h1 class="giris">Forgot Password</h1>
            <div>
                <label>E-mail<span id="yildiz"> * </span></label>
                <input id="text" type="email" required="required" v-model="email" placeholder="E-mail / Phone number / UserID">
            </div>
        
            <div>
                <button @click="$router.push('/newpassword')">Receive E-mail</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default{
    data() {
        return {
            email: ''
        }
    },
    methods: {
        handleSubmit(){
        console.log('email: ', this.email)
        }
    }

}
</script>

<style>
</style>