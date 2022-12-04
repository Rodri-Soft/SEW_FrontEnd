import Navbar from '@/components/Navbar.vue'
import FormCV from '@/components/FormCV.vue'
import UserInformation from '@/components/UserInformation.vue'
import axios from 'axios';
import './axios'
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';
import _ from 'lodash';

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
  name: "ProfileView",
  components: {
    FormCV,
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
    MDBCardImg,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    const user = this.$store.getters.user;

    if (!user) {
      const urlProfile = "profile";
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      axios.get(urlProfile, config).then((response) => {
        const user = response.data;
        
        this.$store.dispatch("user", user);
        this.$router.push('profile');
      });
    }
  },
};