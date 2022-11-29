import Navbar from '@/components/Navbar.vue'
import FormCV from '@/components/FormCV.vue'
import UserInformation from '@/components/UserInformation.vue'
import axios from 'axios';
import './axios'
import Cookies from 'js-cookie';
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
  beforeCreate() {
    const user = this.$store.getters.user;
    if (!user) {
      const token = Cookies.get("access_token");
      const urlProfile = "profile/my-cv";
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
  
      axios.get(urlProfile, config).then((response) => {
        const employee = response.data;
        
        this.$store.dispatch("user", employee);
  
        console.log(employee);
      });
    }
  },
  methods: {},
};