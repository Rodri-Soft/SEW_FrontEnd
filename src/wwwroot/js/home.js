// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import MainFeed from '@/components/MainFeed.vue'
import Category from '@/components/Category.vue'
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
    Category  
  },
  data() {
    return {      
      userObject: {
        photo: "https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg",
        full_name: "José Daniel Camarillo Villa",        
        followers: 300,
        amount_offers: 21,
        role: "Employee",
      },
      // offerInformation: [
      //   {
      //     title: "Lorem ipsum 1",
      //     photo: "https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg",
      //     full_name: "José Daniel Camarillo Villa",
      //     role: "Recruiter",
      //     description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      //       Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
      //       excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
      //       cum voluptatum ratione? Ut! 1`,
      //     category: "Tecnología y telecomunicaciones",
      //     experience: "2-4 años",
      //     workday: "8 horas diarias",
      //     score: 3.5,          
      //   },
      //   {
      //     title: "Lorem ipsum 2",
      //     photo: "https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg",
      //     full_name: "José Rodrigo Sánchez Méndez",
      //     role: "Recruiter",
      //     description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      //       Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
      //       excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
      //       cum voluptatum ratione? Ut! 2`,
      //     category: "Tecnología y telecomunicaciones",
      //     experience: "2-4 años",
      //     workday: "8 horas diarias",
      //   },
      //   {
      //     title: "Lorem ipsum 3",
      //     photo: "https://mdbootstrap.com/img/Photos/Avatars/img (29).jpg",
      //     full_name: "Son Goku",
      //     role: "Recruiter",
      //     description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      //       Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
      //       excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
      //       cum voluptatum ratione? Ut! 3`,
      //     category: "Tecnología y telecomunicaciones",
      //     experience: "2-4 años",
      //     workday: "8 horas diarias",
      //   }

      // ]                       
      offerInformation: [],
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

      const url = "recruiter-offers";
      await axios.get(url).then((response) => {
        const offers = response.data;                
        this.offerInformation = offers;   
      });            
    }
  }
}

