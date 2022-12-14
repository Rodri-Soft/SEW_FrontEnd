import Navbar from '@/components/Navbar.vue'
import UserInformation from '@/components/ProfileInformation.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios';
import './axios'
import { mapGetters } from 'vuex';
import { ref } from 'vue';
import Cookies from "js-cookie";
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
  MDBSpinner,
  MDBTable
} from "mdb-vue-ui-kit";

export default {
  name: "CVCertificationsView",
  components: {
    Navbar,
    UserInformation,
    Footer,
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
    MDBSpinner,
    MDBTable
  },
  computed: {
    ...mapGetters(["user"]),    
  },
  data() {
    return {
      data: '',
      modalEditTile: 'Certificaciones',
      modalEditMessage: '',
      buttonEditText: '',
      isEditCertification: false,
    }
  },
  setup() {
    const certification = ref('');
    const modalCertificationEdit = ref(false);
    const modalCertificationDelete = ref(false);

    return {
      certification,
      modalCertificationEdit,
      modalCertificationDelete,
    };
  },
  methods: {
    verifyNumberOfCertifications() {
      const certifications = this.user.employee.cv.certifications.length;

      if (certifications > 1) {
        this.modalCertificationDelete = true;
      }
    },
    showDataToOperate(data, operation) {
      this.data = data;

      if (operation === 'delete') {        
        this.modalCertificationDelete = true;

        this.verifyNumberOfCertifications();
      } else if (operation === 'edit') { 
        this.modalCertificationEdit = true; 
        this.certification = data.certification;
        this.modalEditMessage = 'Recuerda mantener tus Certificaciones actualizadas';
        this.buttonEditText = 'Guardar';
        this.isEditCertification = true;
      } else {
        this.certification  = '';
        this.modalCertificationEdit = true; 
        this.modalEditMessage = 'Agrega todas tus certificaciones para que los reclutadores' 
         + ' puedan conocer m??s sobre ti';
        this.buttonEditText = 'Agregar';
        this.isEditCertification = false;
      }
    },
    checkInput() {
      let isValid = true;
      const inputElement = document.getElementById('input-certification');
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
        this.isEditCertification ? 
          await this.editCertification() : await this.addCertification();
      }
    },
    async addCertification() {
      const certificationContainer = document.getElementById('certification-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = 'cv-certifications';
      const payload = {
        cvId: this.user.employee.cv.id,
        certification: this.certification,
      };
      this.modalEditMessage = 'Agregando certificaci??n';
      
      spinner.classList.remove('d-none');
      certificationContainer.classList.add('d-none');

      await axios.post(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const certification = response.data;

        if (codeStatus === 201) {
          this.setCVState('add', certification);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Certificaci??n agregada correctamente ????';
          }, 1000);

          setTimeout(() => {
            this.modalCertificationEdit = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado ????',
          400: "Verifique el campo nuevamente ????",
          500: 'Algo sali?? mal, intenta m??s tarde ????'
        }
        this.modalEditMessage = messages[codeStatus];

        certificationContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async editCertification() {
      const certificationContainer = document.getElementById('certification-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `cv-certifications/${this.data.id}`;
      const payload = {
        certification: this.certification,
      };
      this.modalEditMessage = 'Actualizando Certificaci??n';
      
      spinner.classList.remove('d-none');
      certificationContainer.classList.add('d-none');

      // console.log({url, payload, data: this.data});

      await axios.patch(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const certification = response.data;

        if (codeStatus === 200) {
          this.setCVState('edit', certification);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Certificaci??n actualizada correctamente ????';
          }, 1000);

          setTimeout(() => {
            this.modalCertificationEdit = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado ????',
          400: "Verifique el campo nuevamente ????",
          500: 'Algo sali?? mal, intenta m??s tarde ????'
        }
        this.modalEditMessage = messages[codeStatus];

        certificationContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async deleteCertification() {
      const messageDelete = document.getElementById('message-certifications-delete');
      const spinner = document.getElementById('spinner-certification-delete');
      const certificationContainer = document.getElementById('certification-info-container');
      const certificationId = this.data.id;   
      const token = Cookies.get('access_token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      const url = `cv-certifications/${certificationId}`;

      messageDelete.innerHTML = 'Eliminando Certificaci??n';
      spinner.classList.remove('d-none');
      certificationContainer.classList.add('d-none');

      await axios.delete(url, config).then((response) => {
        const codeStatus = response.status;
        const certification = response.data;

        if (codeStatus === 204) {
          this.setCVState('delete', this.data);

          setTimeout(() => {
            spinner.classList.add('d-none');
            messageDelete.innerHTML = 'Certificaci??n eliminada correctamente ????';            
          }, 1000);

          setTimeout(() => {
            this.modalCertificationDelete = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado ????',
          404: 'No se encontr?? esa certificaci??n. Vuelve a iniciar sesi??n ????',
          500: 'Algo sali?? mal, intenta m??s tarde ????'
        }
        messageDelete.innerHTML = messages[codeStatus];

        certificationContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    setCVState(operation, certification) {
      const certifications = this.user.employee.cv.certifications;

      if (operation === 'add') {
        certifications.push(certification);
        
        this.user.employee.cv.certifications = certifications;

        this.$store.commit('setUser', this.user);
      } else if (operation === 'edit') {
        const index = certifications.findIndex((item) => item.id === certification.id);

        certifications[index] = certification;
        this.user.employee.cv.certifications = certifications;

        this.$store.commit('setUser', this.user);
      } else {
        certifications.forEach((element, index) => {
          if (certification === element) {
            certifications.splice(index, 1);
          }
        });
  
        this.user.employee.cv.certifications = certifications;

        this.$store.commit('setUser', this.user);
      }
    }
  },
};
