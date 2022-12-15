// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'

import {   

  MDBRow,
  MDBCol,
  MDBBtn,  
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImg,
  MDBCardGroup,  
  MDBListGroupItem,
  MDBListGroup,  
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRadio,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBTextarea,

} from "mdb-vue-ui-kit";

export default {

  name: 'OfferApplicationsView',
  components: {
    HelloWorld,
    Navbar,
    ProfileMainMenu,     

    MDBRow,
    MDBCol,
    MDBBtn,  
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImg,
    MDBCardGroup,    
    MDBListGroupItem,
    MDBListGroup,    
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRadio,
    MDBIcon,
    MDBInput,
    MDBCheckbox,  
    MDBTextarea,
  },  
  data() {
    return {      
      userObject: {
        photo: "https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg",
        full_name: "José Daniel Camarillo Villa",        
        followers: 300,
        amount_offers: 21,
        role: "recruiters",
      },
      offer: this.$store.getters.offer,
      
    };
  },  
  mounted(){
    this.showInformation();       
  },
  methods:{
    showInformation() {
      console.log(this.offer);
    }
  }
}

