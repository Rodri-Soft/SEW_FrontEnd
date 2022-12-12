import Navbar from '@/components/Navbar.vue'
import FormCV from '@/components/FormCV.vue'
import ProfileInformation from '@/components/ProfileInformation.vue'
import axios from 'axios';
import './axios'
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';
import { ref } from 'vue';
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBBtn,  
  MDBInput,
  MDBTextarea,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImg,MDBModal,
  MDBModalBody,
  MDBModalTitle,
  MDBSpinner,
} from "mdb-vue-ui-kit";

export default {
  name: "ProfileView",
  components: {
    FormCV,
    Navbar,
    ProfileInformation,
    MDBIcon,
    MDBInput,
    MDBTextarea,
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
  beforeCreate() {
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
  setup() {
    const modalCVDescription = ref(false);
    const cvDescription = ref('');
    const description = ref('');

    return {
      modalCVDescription,
      cvDescription,
      description
    }
  },
  mounted() {
    if (this.user.employee) {
      if (this.user.employee.cv) {
        this.description = this.user.employee.cv.description;
      }
    }    
  },
  methods: {
    checkInput() {
      let isValid = true;
      const inputElement = document.getElementById('input-description');
      const inputElementValue = inputElement.value;

      if (inputElementValue.trim().length === 0) {
        isValid = false;
        inputElement.classList.add('is-invalid');
      } else {
        inputElement.classList.remove('is-invalid');
        inputElement.value = '';        
      }

      return isValid; 
    },
    async verifyFormOperation() {
      const isValid = this.checkInput();

      if (isValid) {
        await this.editCVDescription();
      }
    },
    async editCVDescription() {
      const descriptionContainer = document.getElementById('description-form-container');
      const spinner = document.getElementById('spinner-edit');
      const messageEdit = document.getElementById('message-description-edit')
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `cvs/${this.user.employee.cv.id}`;
      const payload = {
        description: this.description
      };
      messageEdit.innerHTML = 'Actualizando tu descripción'

      spinner.classList.remove('d-none');
      descriptionContainer.classList.add('d-none');

      await axios.patch(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const description = response.data.description;

        if (codeStatus === 200) {
          this.setCVState(description);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            messageEdit.innerHTML = 'Tu descripción ha sido actualizada 👍';
          }, 1000);

          setTimeout(() => {
            this.modalCVDescription = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          400: "Verifique el campo nuevamente 🤔",
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        messageEdit.innerHTML = messages[codeStatus];

        descriptionContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    setCVState(description) {
      this.user.employee.cv.description = description;
      this.$store.commit('setUser', this.user);
    }
  }
};