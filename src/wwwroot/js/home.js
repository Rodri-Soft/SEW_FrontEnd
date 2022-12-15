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
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      await axios.get(url, config).then((response) => {
        const offers = response.data;                
        this.offerInformation = offers;           
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'No se pudieron cargar las ofertas disponibles 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      }); 
      this.emptyOffers = this.offerInformation.length > 0 ? false : true;
    },
    async consultOffers(category){

      const url = "offers/offersCategory";
      const payload = {         
        category: category,
      };
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      await axios.post(url, payload, config).then((response) => {
        const offers = response.data;                
        this.offerInformation = offers;                     

      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          400: "Verifique el campo nuevamente 🤔",
          500: 'Algo salió mal, intenta más tarde 😔'
        }         
        alert(messages[codeStatus]); 
      });       

      this.emptyOffers = this.offerInformation.length > 0 ? false : true;   

    },    
    async goHome(){      
      const url = "offers";
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      await axios.get(url, config).then((response) => {
        const offers = response.data;                
        this.offerInformation = offers;           
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'No se pudieron cargar las ofertas disponibles 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });             
      this.emptyOffers = this.offerInformation.length > 0 ? false : true;
    },
    async searchOffer(title) {

      const url = "offers/getOffersTitle";
      const payload = {         
        title: title,
      };
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      await axios.post(url, payload, config).then((response) => {
        const offers = response.data;                
        this.offerInformation = offers;   
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          400: "Verifique el campo nuevamente 🤔",
          500: 'Algo salió mal, intenta más tarde 😔'
        }         
        alert(messages[codeStatus]); 
      });       

      this.emptyOffers = this.offerInformation.length > 0 ? false : true; 
    }
  }
}

