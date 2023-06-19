<template>
    <RouterView />
    <div class="Tumekran">
        <div class="MudurPanel">
            <h1 id="nickname">NASSİMXENON</h1>
            <h1 id="isim">NASSİM BACİ</h1>
            <h1 id="pozisyon">{{ pozisyon }}</h1>
            <button id=  "Mudurbuton" @click="$router.push('/mudurpanel/mesajlar')">Mesajlar</button>
            <button id=  "Mudurbuton" @click="$router.push('/mudurpanel/personelgoruntule')">Personel Görüntüle</button>
            <button id=  "Mudurbuton" @click="toggle()">Ekipman Yönet ▼</button>
            <div v-if="active">
                <button id="Mudurbutonkucuk" @click="$router.push('/mudurpanel/ekipmanyonet/ekipmangoruntule')" style="font-size:12.5px;">Ekipman Görüntüle</button>
                <button id="Mudurbutonkucuk" @click="$router.push('/mudurpanel/ekipmanyonet/ekipmaneklesil')">Ekipman Ekle</button>
                <button id="Mudurbutonkucuk" @click="$router.push('/mudurpanel/ekipmanyonet/ekipmansil')">Ekipman Sil</button>
                <button id="Mudurbutonkucuk" @click="$router.push('/mudurpanel/ekipmanyonet/ekipmanbakim')">Ekipman Bakım</button>
            </div>
            <button id=  "Mudurbuton" @click="$router.push('/mudurpanel/ayarlar')">Ayarlar</button>
            <button id=  "Mudurbuton" @click="$router.push('/'); logout()">Çıkış</button>
        </div>
        <div class="Screen" style="overflow-y:auto; overflow-x:auto; ">
            <button id="bildirimbuton" v-if="butongoster()" @mouseover="bildirimblockfunc()" @mouseleave="bildirimblockfunc()">🔔: {{ count }}</button>
            <div class="notifs" v-if="bildirimblock" v-for="bildirimler in bildirimlers">
                <h8>➤ {{ bildirimler.title }}</h8>
            </div>
            <div id="personeller" v-if="createdPersonel()">
                <div id="idler" style="display:flex;flex-direction:column;float:left; width:23%">
                    <button id="siralamabuton" style="width:100%">Personel ID ▼</button>
                    <!-- <RouterLink :to="{name:'Personelinbilgisi', params:{id:user._id}}"> -->
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white" v-for="user in allUsers" :key="user._id"  @click="$router.push(`/personel/${user._id}`)" >{{ user._id }} <hr></h1>
                </div>
                <div id="isimsoyadlar" style="display:flex;flex-direction:column;float:left;width:31%;">
                    <button id="siralamabuton" style="width:100%">Personel Ad-Soyad ▼</button>
                    <h1 style="white-space:nowrap;overflow:hidden;font-size: 25px;color:white;" v-for="user in allUsers" :key="user._id">{{ user.ad }} {{ user.soyad }}<hr></h1>

                </div>
                <div id="randomsmth" style="display:flex;flex-direction:column;float:left;width:23%">
                    <button id="siralamabuton" style="width:100%">E-Mail ▼</button>
                    <h1 style="word-wrap:break-word; white-space:nowrap;overflow:hidden;font-size: 25px;color:white" v-for="user in allUsers" :key="user._id">{{ user.email }}<hr></h1>
                </div>
                <div id="mayberndmsmth" style="display:flex;flex-direction:column; float:left; width:23%">
                    <button id="siralamabuton" style="width:100%">Number ▼</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white;" v-for="user in allUsers" :key="user._id">{{ user.number }}<hr></h1>
                </div>
            </div>
            <div id="ekipmanlar" v-if="createdEkipmaneklesil()">
                <div id="ekleform" style="display:flex; margin:center; width:50%">
                    <form @submit.prevent="createEqu" id="ekle" style="margin:auto; width:100%">
                        <!-- <label style="color:white;">Ekipman ID: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman ID:" style="margin-left:0%; width:85%;" required v-model="id"> -->
                        <label style="color:white;">Ekipman İsim: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman İsim:" style="margin-left:0%; width:85%;" required v-model="equ.ekipmanAdi">
                        <label style="color:white;">Ekipman Marka: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman Marka:" style="margin-left:0%; width:85%;" required v-model="equ.ekipmanMarka">
                        <label style="color:white;">Ekipman Model: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman Model:" style="margin-left:0%; width:85%;" required v-model="equ.ekipmanModel">
                        <label style="color:white;">Ekipman Barkod: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman Barkod:" style="margin-left:0%; width:85%;" required v-model="equ.stok">
                        <label style="color:white;">Kaç adet: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman Barkod:" style="margin-left:0%; width:85%;" required v-model="equ.ekipmanBarkod">
                        <button type="submit" @click="$router.go(-1)" id="Mudurbuton" >Ekipman Ekle</button>
                    </form>
                </div>
            </div>
            <div id="ekipmanlar" v-if="createdEkipmanSil()">
                <div id="ekleform" style="float:left; display:flex; margin-top:10%; width:50%">
                    <form id="ekle"   @submit="silindi" style="float:left;width:100%">
                        <!-- <label style="color:white;">Ekipman ID: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman ID:" style="margin-left:0%; width:85%;" required v-model="id">
                        <label style="color:white;">Ekipman İsim: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman İsim:" style="margin-left:0%; width:85%;" required v-model="name">
                        <label style="color:white;">Ekipman Marka: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman Marka:" style="margin-left:0%; width:85%;" required v-model="marka">
                        <label style="color:white;">Ekipman Model: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman Model:" style="margin-left:0%; width:85%;" required v-model="model"> -->
                        <label style="color:white;">Ekipman Barkod: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman Barkod:" name="barkodaa" style="margin-left:0%; width:85%;" required v-model="ekipmanBarkod.value">
                        <label style="color:white;">Kaç adet: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Kaç Adet:" style="margin-left:0%; width:85%;" required v-model="stok">
                        <button id="Mudurbuton" @click="silindi" type="submit">Ekipman Sil</button>
                    </form>
                </div>
            </div>
            <div id="ekipmanlar" v-if="createdEkipmanbakim()">
                <div id="bakımform" style="margin-top:-5%;width:75%; margin:auto;">
                    <form id="ekle" @submit="createbakım" style="width:100%;height:80%">
                        <label style="color:white;">Ekipman ID: <span id="yildiz">*</span></label>
                        <input type="text" id="textxbakim" placeholder="Ekipman ID:" style="margin-left:0%; width:85%;" required v-model="equBakım.equid">
                        <label style="color:white;">Ekipman İsim: <span id="yildiz">*</span></label>
                        <input type="text" id="textxbakim" placeholder="Ekipman İsim:" style="margin-left:0%; width:85%;" required v-model="equBakım.equisim">
                        <label style="color:white;">Ekipman Marka: <span id="yildiz">*</span></label>
                        <input type="text" id="textxbakim" placeholder="Ekipman Marka:" style="margin-left:0%; width:85%;" required v-model="equBakım.equmarka">
                        <label style="color:white;">Ekipman Model: <span id="yildiz">*</span></label>
                        <input type="text" id="textxbakim" placeholder="Ekipman Model:" style="margin-left:0%; width:85%;" required v-model="equBakım.equmodel">
                        <label style="color:white;">Ekipman Barkod: <span id="yildiz">*</span></label>
                        <input type="text" id="textx" placeholder="Ekipman Barkod:" style="margin-left:0%; width:85%;" required v-model="equBakım.equbarkod">
                        
                        <button id="Mudurbuton" type="submit">Ekipman Bakım</button>
                    </form>
                </div>
            </div>
            <div id="ekipmanlar" v-if="createdEkipmangoruntule()"> 
                <div id="idler" style="display:flex;flex-direction:column;float:left; width:23%">
                    <button id="siralamabuton" style="width:100%">Ekipman ID ▼</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white" v-for="equ in allEqu" :key="equ._id">{{ equ._id }}<hr></h1>
                </div>
                <div id="isimsoyadlar" style="display:flex;flex-direction:column;float:left;width:31%;">
                    <button id="siralamabuton" style="width:100%">İsim ▼</button>
                    <h1 style="white-space:nowrap;overflow:hidden;font-size: 25px;color:white;" v-for="equ in allEqu" :key="equ._id">{{ equ.ekipmanAdi }}<hr></h1>
                </div>
                <div id="randomsmth" style="display:flex;flex-direction:column;float:left;width:23%">
                    <button id="siralamabuton" style="width:100%">Marka ▼</button>
                    <h1 style="word-wrap:break-word; white-space:nowrap;overflow:hidden;font-size: 25px;color:white" v-for="equ in allEqu" :key="equ._id">{{ equ.ekipmanMarka}}<hr></h1>
                </div>
                <div id="mayberndmsmth" style="display:flex;flex-direction:column; float:left; width:23%">
                    <button id="siralamabuton" style="width:100%">Stok ▼</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white;" v-for="equ in allEqu" :key="equ._id">{{ equ.stok }}<hr></h1>
                </div>
            </div>
            <div id="ayarlar" v-if="createdAyarlar()">
                <div id="bakımform" style="margin-top:-5%;width:75%; margin:auto;">
                    <form id="ekle" style="width:100%;height:80%">
                        <h1 style="color:white; ">Şifre Değiştir</h1>
                        <label style="color:white;">Mevcut Şifre: <span id="yildiz">*</span></label>
                        <input type="password" id="textxbakim" placeholder="Eski Şifre:" style="margin-left:0%; width:85%;" required v-model="eskisifre">
                        <label style="color:white;">Yeni Şifre: <span id="yildiz">*</span></label>
                        <input type="password" id="textxbakim" placeholder="Yeni Şifre:" style="margin-left:0%; width:85%;" required v-model="yenisifre">
                        <label style="color:white;">Yeni Şifre Confirm: <span id="yildiz">*</span></label>
                        <input type="password" id="textxbakim" placeholder="Yeni Şifre Confirm:" style="margin-left:0%; width:85%;" required v-model="yenisifreconfirm">
                        <label v-if="alertherseydogru" style="color:white">Şifre Değiştirme İşlemi Başarılı</label>
                        <label v-if="alerteskiyanlis" style="color:crimson">Mevcut Sifrenizi Yanlis Girdiniz!</label>
                        <label v-if="alertyeniyanlis" style="color:crimson">Yeni Sifre ile Dogrulama Birbirini Tutmuyor!</label>
                        <label v-if="alerteskiyeniayni" style="color:crimson">Yeni Şifreniz İle Eskisi Aynı Olamaz!</label>
                        <button id="Mudurbuton" @click="sifreDegis">Şifreyi Değiştir</button>
                    </form>
                </div>
            </div>
            <!-- <div id="personellerkisisel" v-if="personelbilgi">
                <hr>
                <div id="idler" style="display:flex;flex-direction:column;float:left; width:23%">
                    <button id="siralamabuton" style="width:100%">Personel ID </button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white">{{ kimigoster }}</h1>
                </div>
                <div id="isimsoyadlar" style="display:flex;flex-direction:column;float:left;width:31%;">
                    <button id="siralamabuton" style="width:100%">İsim</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white">{{ us.ad }}</h1>
                </div>
                <div id="randomsmth" style="display:flex;flex-direction:column;float:left;width:23%">
                    <button id="siralamabuton" style="width:100%">smth</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white">{{ us.number }}</h1>
                </div>
                <div id="mayberndmsmth" style="display:flex;flex-direction:column; float:left; width:23%">
                    <button id="siralamabuton" style="width:100%">Barkod</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 25px;color:white"> </h1>
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
            </div> -->
            <div id="mesajlar" v-if="createdMesajlar()">
                <div id="idler" style="display:flex;flex-direction:column;float:left; width:25%">
                    <button id="siralamabuton" style="width:100%">Personel ID ▼</button>
                    <h1 style="word-wrap:break-word;white-space:nowrap;overflow:hidden;font-size: 18px;color:white" v-for="mesaj in mesajlar">{{ mesaj.id }} <hr></h1>
                </div>
                <div id="isimsoyadlar" style="display:flex;flex-direction:column;float:left;width:30%;">
                    <button id="siralamabuton" style="width:100%">İsim</button>
                    <h1 style="white-space:nowrap;overflow:hidden;font-size: 18px;color:white;" v-for="mesaj in mesajlar">{{ mesaj.name }}<hr></h1>
                </div>
                <div id="mesajicerik" style="display:flex;flex-direction:column;float:left;width:45%">
                    <button id="siralamabuton" style="width:100%">İçerik</button>
                    <h1 style="word-wrap:break-word; white-space:nowrap;overflow:hidden;font-size: 18px;color:white" v-for="mesaj in mesajlar">{{ mesaj.icerik}}<hr></h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import islogged from '@/views/Login.vue'
import { ref,onMounted,reactive } from 'vue'
import { useRouter } from 'vue-router'

export default{

    setup(){
        const ekipmanBarkod=reactive({
            value:''
        })
        
        const us=ref([])
        const router = useRouter()
        const allUsers = ref([])
        const allEqu = ref([])
        const equBakım=reactive({
            equid:'',
            equisim:'',
            equmarka:'',
            equmodel:'',
            equbarkod:'',
            
            
        })
        const equ= reactive({
            ekipmanAdi:'',
            ekipmanMarka:'',
            ekipmanModel:'',
            ekipmanBarkod:'',
            stok:'',

        })
        const changePass= reactive({
            eskisifre:'',
            yenisifre:'',
            yenisifreconfirm:''
        })
        const API_URL = 'http://localhost:5000/'
        const API_URL4 = 'http://localhost:5000/mudurpanel/ayarlar'
        const API_URL5 = 'http://localhost:5000/mudurpanel/ekipmanyonet/ekipmansil'
        const API_URL6="/mudurpanel/ekipmanyonet/ekipmansil/:id"
        const apıbakım="/mudurpanel/ekipmanyonet/ekipmanbakim"
        const API_URL2 = 'http://localhost:5000/mudurpanel/ekipmanyonet/ekipmangoruntule'
        const API_URL3 = 'http://localhost:5000/mudurpanel/ekipmanyonet/ekipmaneklesil'
        onMounted(()=>{
            getallUsers(),
            getEqu()
            apı6()
        })

        const silindi=async()=>{
            console.log("silindi")
            
            const response =await fetch(API_URL5,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({barkod:ekipmanBarkod.value})
            })
            const json=await response.json()
        }
        const createbakım=async()=>{
            console.log("bakım")
            const response =await fetch(apıbakım,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    equid:equBakım.equid,
                    ekipmanAdi:equBakım.equisim,
                    ekipmanMarka:equBakım.equmarka,
                    ekipmanModel:equBakım.equmodel,
                    ekipmanBarkod:equBakım.equbarkod,
                })
            })
            const json=await response.json()
        }
        
        const createEqu= async () => {
            const response = await fetch(API_URL3,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    ekipmanAdi:equ.ekipmanAdi,
                    ekipmanMarka:equ.ekipmanMarka,
                    ekipmanModel:equ.ekipmanModel,
                    ekipmanBarkod:equ.ekipmanBarkod,
                    stok:equ.stok
                })
            })
            const json=await response.json()
            // router.push()
            
        }
        const apı6=async ()=>{
            const response =await fetct(API_URL6)
            us.value=await response.json()
        }
        const getEqu= async () => {
            const response = await fetch(API_URL2)
            allEqu.value = await response.json()
        }
        const getallUsers = async () => {
            const response = await fetch(API_URL)
            
            allUsers.value = await response.json()
            
        }
        return {allUsers,allEqu,createEqu,silindi,equ,ekipmanBarkod,createbakım,equBakım}
    },
    data(){
        return{
            sifre:'315231',
            eskisifre:'',
            yenisifre:'',
            yenisifreconfirm:'',
            isim:'Murat Kağan',
            soyisim:'Kayabaşı',
            pozisyon: 'Müdür',
            nickname: 'CptKagan',
            count:0,
            active: false,
            id:'',
            name:'',
            marka:'',
            barkod:'',
            model:'',
            stok:'',
            kimigoster:'',
            personelbilgi:false,
            alerteskiyanlis:false,
            alertyeniyanlis:false,
            alertherseydogru:false,
            alerteskiyeniayni:false,
            bildirimblock:false,
            bildirimlers:[
                {title: '1. bildirim'}, 
                {title: '2. bildirim'}
            ],
            showPersonel:false,
            calisanlar:[
                {id: '1', name:'Murat Kağan Kayabaşı', randomsmth:'askjdgjasd', mayberndmsth:'kjdskjkjads'},
                {id: '2', name:'Ömer Faruk Ün', randomsmth:'fxgncncvb', mayberndmsth:'kjhjkhfdjads'},
                {id: '3', name:'Bünyamin Taşkın', randomsmth:'aaaaa', mayberndmsth:'khjkhjk'},
                {id: '4', name:'Berke Kaçar', randomsmth:'b', mayberndmsth:'dxfghfxghfgh'},
                {id: '4', name:'Berke Kaçar', randomsmth:'b', mayberndmsth:'dxfghfxghfgh'},
                {id: '4', name:'Berke Kaçar', randomsmth:'b', mayberndmsth:'dxfghfxghfgh'},

            ],
            ekipmanlar:[
                {id:'1', name:'Laptop',marka:'Mac', stok:'5', barkod:'', model:''},
                {id:'2', name:'Laptop',marka:'HP', stok:'12', barkod:'', model:''},
                {id:'3', name:'Laptop',marka:'Lenovo', stok:'30', barkod:'', model:''},
                {id:'4', name:'Laptop',marka:'Asus', stok:'40', barkod:'', model:''},
                {id:'5', name:'Mouse',marka:'Apple', stok:'50', barkod:'', model:''},
                {id:'6', name:'Klavye',marka:'Logitech', stok:'60', barkod:'', model:''},
                {id:'7', name:'Kürek',marka:'ESOGÜ', stok:'70', barkod:'', model:''},
                {id:'8', name:'Cartcurt',marka:'ESOGÜ', stok:'80', barkod:'', model:''},
                {id:'9', name:'Falanfilan',marka:'askjd', stok:'90', barkod:'', model:''},
                {id:'10', name:'Telefon',marka:'esogü', stok:'100', barkod:'', model:''},
                {id:'11', name:'ŞuBu',marka:'cartcurt', stok:'110', barkod:'', model:''},
            ],
            mesajlar:[
              
            ]
        }
    },
    methods:{
        personelyonet(id){
            this.$router.push(`/mudurpanel/personelgoruntule?id=${id}`)
            this.personelbilgi=true
            this.kimigoster=id
        },
        bildirimblockfunc(){
            this.bildirimblock = !this.bildirimblock
        },
        butongoster(){
            if (this.$route.path === '/mudurpanel/ekipmanyonet/ekipmanbakim' || this.$route.path === '/mudurpanel/ekipmanyonet/ekipmaneklesil'){
                return false
            }
            else{
                return true
            }
        },
        toggle() {
            this.active = !this.active
        },
        logout(){
            this.islogged = false
            if(this.islogged===false){
                console.log('islogged false now')
            }
        },
        createdPersonel(){
            if (this.$route.path === '/mudurpanel/personelgoruntule'){
                return true
            }
            else{
                return false
            }
        },
        createdEkipmaneklesil(){
            if(this.$route.path === '/mudurpanel/ekipmanyonet/ekipmaneklesil'){
                this.personelbilgi=false
                return true
            }
            else{
                return false
            }
        },
        createdEkipmanbakim(){
            if(this.$route.path === '/mudurpanel/ekipmanyonet/ekipmanbakim'){
                this.personelbilgi=false
                return true
            }
            else{
                false
            }
        },
        createdEkipmanSil(){
            if(this.$route.path === '/mudurpanel/ekipmanyonet/ekipmansil'){
                this.personelbilgi=false
                return true
            }
            else{
                return false
            }
        },
        createdEkipmangoruntule(){
            if(this.$route.path === '/mudurpanel/ekipmanyonet/ekipmangoruntule'){
                this.personelbilgi=false
                return true
            }
            else{
                return false
            }
        },
        createdAyarlar(){
            if(this.$route.path === '/mudurpanel/ayarlar'){
                this.personelbilgi=false
                return true
            }
            else{
                return false
            }
        },
        createdMesajlar(){
            if(this.$route.path === '/mudurpanel/mesajlar'){
                this.personelbilgi=false
                return true
            }
            else{
                return false
            }
        },
        addEkipman(){
            console.log('ID:', this.id)
            console.log('İsim:', this.name)
            console.log('Marka:', this.marka)
            console.log('Model:', this.model)
            console.log('Barkod:', this.barkod)
            console.log('Stok:', this.stok)
            this.ekipmanlar.push({id:this.id, name:this.name, marka:this.marka, model:this.model,barkod:this.barkod,stok:this.stok})

        },
        silEkipman() {
            console.log('ID:', this.id)
            console.log('İsim:', this.name)
            console.log('Marka:', this.marka)
            console.log('Model:', this.model)
            console.log('Barkod:', this.barkod)
            console.log('Stok:', this.stok)
        },
        bakimEkipman() {
            console.log('ID:', this.id)
            console.log('İsim:', this.name)
            console.log('Marka:', this.marka)
            console.log('Model:', this.model)
            console.log('Barkod:', this.barkod)
            console.log('Stok:', this.stok)
        },
        sifreDegis(){
            if (this.eskisifre === this.sifre && this.yenisifre === this.yenisifreconfirm && this.yenisifre !== this.eskisifre){
                console.log('Yeni sifre:', this.yenisifre)
                this.sifre=this.yenisifre
                this.alertherseydogru = true
                this.alerteskiyanlis = false
                this.alertyeniyanlis = false
            }
            else if (this.eskisifre !== this.sifre){
                console.log('Eski Sifreniz Yanlis!')
                this.alerteskiyanlis = true
                this.alertherseydogru = false
                this.alertyeniyanlis = false
            }
            else if (this.yenisifre === this.yenisifreconfirm && this.eskisifre === this.sifre && this.yenisifre === this.eskisifre) {
                console.log('Eski Sifreniz ile yeni sifreniz ayni olamaz!')
                this.alerteskiyanlis = false
                this.alertherseydogru = false
                this.alertyeniyanlis = false
                this.alerteskiyeniayni = true
            }
            else if (this.yenisifre !== this.yenisifreconfirm){
                console.log('Yeni Sifre ile Dogrulama Birbirini Tutmuyor!')
                this.alerteskiyanlis = false
                this.alertherseydogru = false
                this.alertyeniyanlis = true
            }
        }
    },

}
</script>

<style>
#Mudurbuton{
    background-color: rgb(99, 2, 129);
    margin:left;
    text-align: center;
    width: 200px;
}
#Mudurbuton:hover{
    background-color: rgb(124, 5, 160);
}
#Mudurbutonkucuk{
    background-color: rgb(99, 2, 129);
    margin: left;
    text-align: center;
    width: 150px;
}
#Mudurbutonkucuk:hover{
    background-color: rgb(124, 5, 160);
}
.MudurPanel{
    background-color: rgb(67,3,87);
    width: 250px;
    height: 820px;
    margin:left;
    border-radius: 25px;
    display:flex;
    flex-direction: column;
}
.notifs{
    background-color: rgb(97, 3, 126);
    width:250px;
    border-radius:15px;
    color: white;
    border:1px solid;
    top:300px;
    left:450px;
    width: 35%;
    padding:5px;
    display:block;
}
#Mudurbuton:focus{
    background-color: rgb(124,5,160);
}
#siralamabuton{
    background-color:rgb(97, 3, 126) ;
    width:25%;
    border:1px solid black;
    float:left;
}
#siralamabuton:hover{
    background-color:rgb(124, 5, 160);
}
#bildirimbuton{
    margin-right:20px;
    margin-top:5px;
    width:75px;
    text-align: center;
    background-color: rgb(99,2,129);
}
#bildirimbuton:hover{
    background-color:rgb(124, 5, 160);
}

.Screen{
    background-color: rgb(67,3,87);
    margin:top;
    width: 80%;
    height: 820px;
    border-radius: 25px;
    display:flex;
    flex-direction: column;
}

.Tumekran{
    display:flex;
    justify-content: space-between;
}
#isim{
    font-size:16px;
    text-align:left;
    margin-left:10px;
    color: white;
}
#pozisyon{
    font-size:13px;
    color:white;
    text-align:left;
    margin-left:10px;
}
#nickname{
    font-size:18px;
    text-align: left;
    margin-left: 10px;
    color: white;
}
::-webkit-scrollbar{
    width:9px;
}
::-webkit-scrollbar-track{
    box-shadow: inset 0 0 5px rgb(67, 3, 87);
    background: rgb(97, 3, 126);
    border-radius:5px;
}
::-webkit-scrollbar-thumb{
    background:rgb(124, 5, 160);
    border-radius: 5px;
}
input[id="textx"] {
    display: block;
    padding: 10px 6px;
    width: 50%;
    box-sizing: border-box;
    border: none;
    border-radius:10px;
    border-bottom: 1px white;
    color: black;
    background-color: #d3d3d3;
    cursor: auto;
}
input[id="textxbakim"] {
    display: block;
    padding: 10px 6px;
    width: 50%;
    box-sizing: border-box;
    border: none;
    border-radius: 10px;
    border-bottom: 1px white;
    color: black;
    background-color: #d3d3d3;
    cursor: auto;
}
#ekle{
    background-color:rgb(67, 3, 87); ;
}
</style>
