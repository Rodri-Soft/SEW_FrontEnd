// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Category from '@/components/Category.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import $ from 'jquery';

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
      userPhoto: this.offers.photo,      
    }
  }
}

