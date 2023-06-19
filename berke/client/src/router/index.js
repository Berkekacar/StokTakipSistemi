import { createRouter, createWebHashHistory } from 'vue-router'
import ForgotPassword from '../views/ForgotPassword.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import NewPassword from '../views/NewPassword.vue'
import MudurPanel from '../views/MudurPanel.vue'
import Mesajlar from '../views/MudurRouter/Mesajlar.vue'
import Personelgoruntule from '../views/MudurRouter/Personelgoruntule.vue'
import Ayarlar from '../views/MudurRouter/Ayarlar.vue'
import Ekipmaneklesil from '../views/MudurRouter/Ekipmaneklesil.vue'
import Ekipmanbakim from '../views/MudurRouter/Ekipmanbakim.vue'
import Ekipmangoruntule from '../views/MudurRouter/Ekipmangoruntule.vue'
import Personelinbilgisi from '../views/MudurRouter/Personelinbilgisi.vue'
import Ekipmansil from '../views/MudurRouter/Ekipmansil.vue'


const routes = [
  {
    path:'/personel/:id',
    name:'Personelinbilgisi',
    component:Personelinbilgisi,
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/newpassword',
    name: 'NewPassword',
    component: NewPassword
  },
  {
    path: '/mudurpanel',
    name: 'MudurPanel',
    component: MudurPanel,
    children:[
      {
        path: '/mudurpanel/mesajlar',
        name: 'Mesajlar',
        component: Mesajlar
      },
      {
        path:'/mudurpanel/ekipmanyonet/ekipmansil',
        component: Ekipmansil
      },
      {
        path:'/mudurpanel/ekipmanyonet/ekipmaneklesil',
        component:Ekipmaneklesil
      },
      {
        path:'/mudurpanel/ekipmanyonet/ekipmanbakim',
        component:Ekipmanbakim
      },
      {
        path:'/mudurpanel/personelgoruntule',
        component: Personelgoruntule
      },
      {
        path:'/mudurpanel/ayarlar',
        component: Ayarlar
      },
      {
        path:'/mudurpanel/ekipmanyonet/ekipmangoruntule',
        component:Ekipmangoruntule
      },

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
