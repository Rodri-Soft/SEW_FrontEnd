import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import Category from '@/components/Category.vue'
import OfferItem from '@/components/OfferItem.vue'
import $ from 'jquery';
import { ref } from 'vue';

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
  MDBCardGroupItem,
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

  name: 'OfferView',
  components: {      
    Navbar,
    ProfileMainMenu,      
    Category,
    OfferItem,
    
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
    MDBCardGroupItem,
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
  setup() {    

    const title = ref('');
    const description = ref('');
    const experience = ref('');
    const workday = ref('');   
    const modalAddOffer = ref(false);          

    return {      

      title,
      description,
      experience,
      workday,
      modalAddOffer, 
      
    };
  },
  data() {
    return {

      userObject: {
        photo: "https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg",
        full_name: "José Daniel Camarillo Villa",
        tag_name: "@CamarilloVilla",
        followers: 300,
        amount_offers: 21,
        userType: "recruiter",
      },
      
      offerInformation: [
        {
          title: "Lorem ipsum 1",                              
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
            excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
            cum voluptatum ratione? Ut! 1`,
          score: 3.5,
          jobAplicationsNumber: 24,          
        },
        {
          title: "Lorem ipsum 2",                              
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
            excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
            cum voluptatum ratione? Ut! 2`,
          score: 5,
          jobAplicationsNumber: 10,
        },
        {
          title: "Lorem ipsum 3",          
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
            excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
            cum voluptatum ratione? Ut! 3`,
          score: 2.1,
          jobAplicationsNumber: 400,
        }

      ]                               
    };
  },
  mounted(){ 
    this.adaptOfferButton();    
  },
  methods:{
    adaptOfferButton() {

      const windowSize = 992;  

      manageTextCenter(windowSize, "newOfferButton");        

      $(window).resize(function(){
                
        manageTextCenter(windowSize, "newOfferButton");          
        
      });     
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
