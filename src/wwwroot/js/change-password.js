import { mapGetters } from "vuex";
import { ref } from "vue";
import axios from 'axios';
import {
  MDBNavbar,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBSpinner
} from "mdb-vue-ui-kit";
import Cookies from "js-cookie";

export default {
  name: "ChangePasswordView",
  components: {
    MDBNavbar,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBSpinner
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      
    };
  },
  setup() {
    

    return {
      
    };
  },
  methods: {
    
  },
};
