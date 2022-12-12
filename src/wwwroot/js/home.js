// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import MainFeed from '@/components/MainFeed.vue'
import Category from '@/components/Category.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import axios from 'axios';
import './axios'
import { ref } from "vue";

export default {

  name: 'HomeView',
  components: {
    HelloWorld,
    Navbar,
    ProfileMainMenu,
    MainFeed,
    Category,
    Footer  
  },
  data() {
    return {            
      offerInformation: [],
      emptyOffers: true,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted(){       
    this.fillFeed();    
  },
  methods:{
    
    async fillFeed(){

      const url = "offers";
      await axios.get(url).then((response) => {
        const offers = response.data;                
        this.offerInformation = offers;           
      });            
      this.emptyOffers = this.offerInformation.length > 0 ? false : true;
    },
    async consultOffers(category){

      const url = "offers/offersCategory";
      const payload = {         
        category: category,
      };
      
      await axios.post(url, payload).then((response) => {
        const offers = response.data;                
        this.offerInformation = offers;              

      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          400: "Verifique el campo nuevamente 🤔",
          500: 'Algo salió mal, intenta más tarde 😔'
        }          
      });       

      this.emptyOffers = this.offerInformation.length > 0 ? false : true;   

    },    
  }
}

