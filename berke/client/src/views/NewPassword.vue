<template>
    <div class="NewPassword">
        <form @submit.prevent="handleSubmit">
            <h1 class="giris">New Password</h1>
            <div>
                <label>Doğrulama Kodu<span id="yildiz">*</span></label>
                <input id="text" type="checker" required v-model="checker" placeholder="Enter your doğrulama kodu here">
                <label>Password <span id="yildiz">*</span><span id="uyari" v-if="this.passwordError">{{ passwordError }}</span></label>
                <input id="text" type="password" required v-model="password" placeholder="Enter your password here">
                <label>Password Confirmation <span id="yildiz">*</span><span id="uyari" v-if="this.passwordconfirm">Şifreler Eşleşmiyor</span></label>
                <input id="text" type="password" required v-model="confirmpassword" placeholder="Confirm your password">
            </div>
    
            <div>
                <button>Change Password</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                password:'',
                passwordError: '',
                confirmpassword: '',
                passwordconfirm: false,
                checker:''
            }
        },
        methods: {
            handleSubmit(){
                if (this.password.length > 5) {
                    this.passwordError = ''
                }
                else {
                    this.passwordError = 'Password must be at least 6 chars long'
                }
                if (this.password === this.confirmpassword) {
                    this.passwordconfirm = false
                }
                else {
                    this.passwordconfirm = true;
                }
                if ((!this.passwordError) && this.passwordconfirm == false) {
                    console.log('password: ', this.password)
                    console.log('dogrulama kodu: ', this.checker)
                }
            }
        }
    }
</script>