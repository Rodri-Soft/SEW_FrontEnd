import CVItemForm from "@/components/CVItemForm.vue";
import { mapGetters } from "vuex";
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
  MDBModalTitle
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
    MDBModalTitle
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
  mounted() {

  },
  setup() {
    const modalUserInformation = ref(false);
    
    return {      
      modalUserInformation, 
    };
  },
  methods: {
    
  }
};
