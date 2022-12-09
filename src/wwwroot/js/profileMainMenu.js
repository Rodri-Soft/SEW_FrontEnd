// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import $ from 'jquery';
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import axios from 'axios';
import './axios'
import { ref } from "vue";

import { 
  MDBBtn,  
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImg,
  MDBCardGroup,
  MDBCardGroupItem,
  MDBListGroupItem,
  MDBListGroup,
  MDBCol,
  MDBRow

} from "mdb-vue-ui-kit";

export default {

  name: 'ProfileMainMenu',
  components: {
    HelloWorld,        
                
    MDBBtn,        
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImg,
    MDBCardGroup,
    MDBCardGroupItem,
    MDBListGroupItem,
    MDBListGroup,
    MDBCol,
    MDBRow
  },    
  computed: {
    ...mapGetters(["user"]),
  },        
  data() {
    return {
      // userPhoto: this.user.photo,      
      // role: this.user.role, 
      userPhoto:  Cookies.get('profile_image_url'),
      userBackground: null,
      followers: null,
      amount_offers: null,
    }
  },
  mounted(){ 
    this.fillFollowers();
    this.adaptProfileButtons();    
    this.fillMenuBackground();    
  },
  methods:{
          
    adaptProfileButtons() {
      
      const windowSize = 975;  

      manageTextCenter(windowSize, "profileButton");
      manageTextCenter(windowSize, "offersButton");
      manageTextCenter(windowSize, "groupsButton");
      manageTextCenter(windowSize, "jobApplicationsButton");

      $(window).resize(function(){
                
        manageTextCenter(windowSize, "profileButton");
        manageTextCenter(windowSize, "offersButton");
        manageTextCenter(windowSize, "groupsButton");
        manageTextCenter(windowSize, "jobApplicationsButton");
        
      });     
    }, 
    async fillFollowers() {

      if (this.user.role == 'Recruiter') {
        
        const url = 'followers';
        const payload = {         
          recruiterId: this.user.recruiter.id,         
        };
  
        await axios.post(url, payload).then((response) => {
          const codeStatus = response.status;          
          
          if (codeStatus === 200) {                    
            this.followers = response.data;
          }
        }).catch((error) => {
          const codeStatus = error.response.status;
          const messages = {
            401: 'No autorizado 😡',
            400: "Verifique el campo nuevamente 🤔",
            500: 'Algo salió mal, intenta más tarde 😔'
          }          
        });      
        this.amount_offers = 16;
        console.log(this.user);  
      }     
    },
    fillMenuBackground(){
      const min = 59;
      const max = 71;
      let indexBackground = Math.floor(Math.random()*(max-min+1)+min);
      let urlBackground = `https://mdbootstrap.com/img/new/standard/city/0${indexBackground}.webp`;
      this.userBackground = urlBackground;
    }
  }
}

function manageTextCenter(windowSize, element) {
  
  let width = $(window).width();

  if (width >= windowSize) {
    $(`#${element}`).removeClass("text-center");
  } else {
    $(`#${element}`).addClass("text-center");
  }

}



