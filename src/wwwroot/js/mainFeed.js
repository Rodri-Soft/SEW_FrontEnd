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

} from "mdb-vue-ui-kit";
import { ref } from 'vue';

export default {

  name: 'HomeView',
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
   
  },
  setup() {    
    const dropdown2 = ref(false);
   
    return {
      dropdown2,
      
    }   
  },
}

