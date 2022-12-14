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
    ...mapGetters(["user", "followers", "amountOffers"]),
  },        
  data() {
    return {      
      userPhoto: Cookies.get('profile_image_url'),
      userBackground: Cookies.get('background_profile_image'),            
    }
  },
  mounted(){       
    this.adaptProfileButtons();         
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
    consultRecruiterOffers(){
      this.$router.push('offers');
    },
    consultEmployeeJobApplications(){
      this.$router.push('jobApplications');
    },

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



