<template>
    <RouterView />
</template>

<script>
import {ref,onMounted} from 'vue'
import {getAuth,onAuthStateChanged,signOut} from "firebase/auth"
const isloggedIn=ref(false)
export default{
  setup(){
    let auth=getAuth()
    onMounted(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          isloggedIn.value=true
        }else{
          isloggedIn.value=false
        }
      })

    })
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
}

nav a.router-link-exact-active {
    color: white;
    background: crimson;
}
body {
  background-image: url('./assets/1847.jpg');
  background-color: rgba(1, 1, 1, 0.5);
  background-attachment: fixed;
  background-size: cover;
}
</style>
