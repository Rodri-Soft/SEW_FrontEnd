import Navbar from '@/components/Navbar.vue'
import UserInformation from '@/components/UserInformation.vue'
import axios from 'axios';
import './axios'
import { mapGetters } from 'vuex';
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBBtn,  
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImg
} from "mdb-vue-ui-kit";

export default {
  name: "CVLenguagesView",
  components: {
    Navbar,
    UserInformation,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImg
  },
  computed: {
    ...mapGetters(["user"]),    
  },
  data() {
    return {
      
    }
  },
  mounted() {

  },
  methods: {
    
  },
};