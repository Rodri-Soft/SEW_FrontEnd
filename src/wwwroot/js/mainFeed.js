// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Category from '@/components/Category.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import $ from 'jquery';
import axios from 'axios';
import './axios'

import {
  
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,    
  MDBBadge, 
  MDBCol,
  MDBRow

} from "mdb-vue-ui-kit";
import { ref } from 'vue';

export default {

  name: 'MainFeed',
  components: {
    Navbar,
    ProfileMainMenu,
    Category,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBBtn,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,    
    MDBBadge,        
    MDBCol,
    MDBRow
   
  },  
  setup() {    
    const dropdownOptions = ref(false);   
    return {      
      dropdownOptions,
    }
  },
  props: ["offers"],
  data() {
    return {
      userPhoto: "https://images.unsplash.com/photo-1534351829608-2890b57a4ba8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=160&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTY3MDY0MDQ3MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=160",      
      score: null,
    }
  },
  mounted(){   
    
    this.showInformation();
    this.setOfferScore();
    // this.setRecruiterPhoto();
    
  },
  methods:{
    
    showInformation(){

      console.log(this.offers);
      
    },
    async setRecruiterPhoto(){

      const profileRecruiterImageUrl = 'https://source.unsplash.com/random/160x160/?person';      
      await axios.get(profileRecruiterImageUrl).then((response) => {
        const profileImage = response.request.responseURL;
        this.userPhoto = profileImage;
      });
    },
    setOfferScore(){
      let sumScore = this.offers.score;
      let averageScore = sumScore / this.offers.reportsNumber;
      this.score = averageScore.toFixed(2);
    }
  }
}

