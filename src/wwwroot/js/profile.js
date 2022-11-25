import Navbar from '@/components/Navbar.vue'
import ModalCV from '@/components/ModalCV.vue'
import $ from 'jquery';
import axios from 'axios';
import './axios'
import { ref } from 'vue';
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
  MDBCardImg,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  
} from "mdb-vue-ui-kit";

export default {
  name: "ProfileView",
  components: {
    Navbar,
    ModalCV,
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
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      isModalCVVisible: true,
    }
  },
  setup() {
    const modalUserInformation = ref(false);

    return {
      modalUserInformation, 
    
    };
  },
  mounted() {
    this.getEmployeeProfile();
  },
  methods: {
    async getEmployeeProfile() {
      const token = Cookies.get("access_token");
      const url = "profile/my-cv";
      const createCV = await axios.get(url)
      .then((response) => {
        const employee = response.data;
        this.$store.dispatch("user", employee);
      });
    },
    showModalCV() {
      this.isModalCVVisible = !this.isModalCVVisible;
    }
  },
};