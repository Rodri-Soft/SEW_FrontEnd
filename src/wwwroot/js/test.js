// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import $ from 'jquery';

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand 

} from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {

  name: 'TestView',
  components: {
    HelloWorld,
    Navbar,

    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand
  }
}

