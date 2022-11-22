// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import $ from 'jquery';

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
  props:
    ["user"],             
  data() {
    return {
      userPhoto: this.user.photo,      
      role: this.user.role, 
    }
  },
  mounted(){ 
    this.adaptProfileButtons();
  },
  methods:{
          
    adaptProfileButtons() {
      
      const windowSize = 992;  

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



