import Navbar from '@/components/Navbar.vue'
import UserInformation from '@/components/UserInformation.vue'
import axios from 'axios';
import './axios'
import { mapGetters } from 'vuex';
import { ref } from 'vue';
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
  MDBModalBody,
  MDBModalTitle,
  MDBSpinner
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
    MDBCardImg,
    MDBModal,
    MDBModalBody,
    MDBModalTitle,
    MDBSpinner
  },
  computed: {
    ...mapGetters(["user"]),    
  },
  props: {

  },
  data() {
    return {
      data: '',
    }
  },
  setup() {
    const work = ref('');
    const modalWorkEdit = ref(false);
    const modalWorkDelete = ref(false);

    return {
      work,
      modalWorkEdit,
      modalWorkDelete
    };
  },
  mounted() {

  },
  methods: {
    showDataToOperate(data, operation) {
      if (operation === 'delete') this.data = data;      
      else this.work = data;
    }
  },
};