<template>
    <div class="Login" >
    <br><br><br><br><br><br><br><br>
    
<form @submit.prevent="login">
    <h1 class="giris" style="color: aliceblue;">Login</h1>
    <div>
        <label style="color:aliceblue">E-mail<span id="yildiz"> * </span></label>
        <input id="text" type="email" required v-model="emailb" placeholder="E-mail / Phone number / UserID">
        <label style="color:aliceblue">Password <span id="yildiz">*</span><span id="uyari"></span></label>
        <input id="text" type="password" required v-model="passwordb" placeholder="Enter your password here">
        <p v-if="errMsg">{{ errMsg }}</p>
    </div>

    <div>
        <!-- <label v-if="alert" style="color:crimson">Kullanıcı adı veya Şifre Yanlış!</label> -->
       <button type="submit">Login</button>
        <button @click="$router.push('/forgotpassword')">Forgot your password?</button>
        <button @click="$router.push('/signup')">Sign Up!</button>
        <!-- <button @click="signInGoogle">Sign In With Google</button> -->
        <button @click="signInGoogle" class="loginBtn loginBtn--google loginBtn--google:before">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png" /> Sign In With Google
    </button>
    </div>


</form>
    </div>
<!-- <p>User ID: {{userid}}</p>
<p>E-mail: {{email}}</p>
<p>Password: {{password}}</p>
<p>Role: {{role}}</p>
<p>Terms accepted: {{terms}}</p> -->
</template>


<script>
import router from '@/router'

import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import { useRouter } from 'vue-router'
    export default {
        setup(){
            const emailb=ref('')
            const passwordb=ref('')
            const errMsg=ref('')
            const router = useRouter()

            const login=async()=>{
                const auth=getAuth()
                signInWithEmailAndPassword(auth, emailb.value, passwordb.value)
                .then((data)=>{
                    router.push("mudurpanel")
                }).catch((error)=>{
                    switch (error.code) {
                        case "auth/invalid-email":
                            errMsg.value="Invalid email address"
                            break;
                        case "auth/user-disabled":
                            errMsg.value="User disabled"
                            break;
                        case "auth/user-not-found":
                            errMsg.value="User not found"
                            break;
                        case "auth/wrong-password":
                            errMsg.value="Wrong password"
                            break;
                        default:
                            errMsg.value="Something went wrong"
                            break;
                    }
                })

            }
            const signInGoogle=()=>{
                const provider = new GoogleAuthProvider();
                signInWithPopup(getAuth(), provider)
                .then((result)=>{
                    console.log(result.user)
                    router.push("/mudurpanel")
                })
            }

            return {emailb, passwordb, login,errMsg,signInGoogle}

        },
        data(){
            return {
                email: '',
                password: '',
                userid:'',
                passwordError:'',
                islogged:false,
                alert:false
            }
        },
        methods: {
            handleSubmit(){
                // Validate password
                if(this.password.length > 5){
                    this.passwordError = ''
                }
                else{
                    this.passwordError = 'Password must be at least 6 chars long'
                }
                if(!this.passwordError){
                    console.log('email: ', this.email)
                    console.log('password: ', this.password)
                }
            },
            logincheck(eposta, sifre){
                if (eposta == 'flowerybeggar@gmail.com' && sifre == '315231'){
                    this.islogged = true;
                    if(this.islogged==true){
                        console.log('user logged in')
                        router.push('/mudurpanel')
                    }
                }
                else{
                    this.alert=true;
                }
            }
        }
    }
</script>


<style>
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #dd4b39;
}
.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png)
    6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #e74b37;
  cursor: pointer;
}

form{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    background-color: rgba(36, 34, 34, 0.5)
}
button{
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top:20px;
    color: white;
    border-radius: 20px;
    cursor:pointer;
}
.submit{
    text-align:center;
}
label{
    color: black;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input[id="text"]{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px white;
    color: black;
    background-color:#d3d3d3;
    cursor: auto;
}
div[class="Login"]{
    margin: auto;
}
#yildiz{
    color: red;
    font-size: 15px;
}
#uyari {
    text-align: left;
    font-style: bold;
    font-size: 20px;
}
input[type="checkbox"]{
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
    cursor: pointer;
}
.pill{
    display:inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}
h1.giris{
    margin: auto;
    text-align: center;
    color: rgb(249, 241, 241);
}
</style>