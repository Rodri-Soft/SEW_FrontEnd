import CVItemForm from "@/components/CVItemForm.vue";
import { mapGetters } from "vuex";
import axios from 'axios';
import './axios'
import { ref } from "vue";
import Cookies from "js-cookie";
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImg,
  MDBCardBody,
  MDBCardLink,
  MDBCardText,
  MDBModal,
  MDBModalBody,
  MDBModalTitle,
  MDBBadge
} from "mdb-vue-ui-kit";
export default {
  name: "UserInformation",
  components: {
    CVItemForm,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardImg,
    MDBCardBody,
    MDBCardLink,
    MDBCardText,
    MDBModal,
    MDBModalBody,
    MDBModalTitle,
    MDBBadge
  },
  computed: {
    ...mapGetters(["user"]),
  },
  beforeCreate() {
    // const user = this.$store.getters.user;
    // console.log({user});
    // if (!user) {
    //   const urlProfile = "profile";
    //   const token = Cookies.get('access_token');      
    //   console.log({token});
    //   const config = {
    //     headers: { 'Authorization': `Bearer ${token}` }
    //   };
      
    //   axios.get(urlProfile, config).then((response) => {
    //     const user = response.data;
        
    //     this.$store.dispatch("user", user);
    //     this.$router.push('profile');
    //   });
    // }
  },
  mounted() {

  },
  data() {
    return {
    
    }
  },
  setup() {
    const modalUserInformation = ref(false);
    
    return {      
      modalUserInformation, 
    };
  },
};
