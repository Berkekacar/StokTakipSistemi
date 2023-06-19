<template>
<h1>Seçilen Personelin Bilgisi</h1> <button id="Mudurbuton" @click="getPersonel">Geri</button>
<div class="Screen" >
    <div id="personellerkisisel">

                <div id="idler" style="display:flex;flex-direction:column;float:left; width:23%">
                    <button id="siralamabuton" style="width:100%">Personel ID </button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white" > {{ allUsers.ad}}</h1>
                </div>
                <div id="isimsoyadlar" style="display:flex;flex-direction:column;float:left;width:31%;">
                    <button id="siralamabuton" style="width:100%">İsim</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white" ></h1>
                </div>
                <div id="randomsmth" style="display:flex;flex-direction:column;float:left;width:23%">
                    <button id="siralamabuton" style="width:100%">smth</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white"></h1>
                </div>
                <div id="mayberndmsmth" style="display:flex;flex-direction:column; float:left; width:23%">
                    <button id="siralamabuton" style="width:100%">Barkod</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white"> Buraya atalı ekipmanlar </h1>
                </div>
                <div>
                <form id="ekle" style="width:100%;height:80%">

                    <label style="color:white;">Ekipman İsim: <span id="yildiz">*</span></label>
                    <input type="text" id="textxbakim" placeholder="Ekipman İsim:" style="margin-left:0%; width:85%;" required v-model="name">
                    <label style="color:white;">Ekipman Barkod: <span id="yildiz">*</span></label>
                    <input type="text" id="textx" placeholder="Ekipman Barkod:" style="margin-left:0%; width:85%;" required v-model="barkod">
                    <button id="Mudurbuton" @click="bakimEkipman">Ekipman Ata</button>
                </form>
                </div>
            </div>
</div>
</template>

<script>
import router from '@/router'
import { ref,onMounted,reactive } from 'vue'
import {useRoute} from 'vue-router'
    export default{
        setup(){
            const route=useRoute()
            const urlnow=window.location.search.slice(25)
            //kanka 25 e kadar 
            // const Apı="http://localhost:5000/personel:id"
            const Apı=`http://localhost:5000/#/personel/${urlnow}`

            const allUsers = ref([])
            onMounted(()=>{
                
        })
            

            const getPersonel=async()=>{
                const response=await fetch(Apı)
                
                allUsers.value=await response.json()
                router.go(-1)
                
            }
            return {getPersonel,allUsers}
        },
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style>

</style>