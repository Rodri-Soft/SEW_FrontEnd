// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import MainFeed from '@/components/MainFeed.vue'
import Category from '@/components/Category.vue'


export default {

  name: 'HomeView',
  components: {
    HelloWorld,
    Navbar,
    ProfileMainMenu,
    MainFeed,
    Category  
  }
}

