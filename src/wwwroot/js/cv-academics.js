import Navbar from '@/components/Navbar.vue'
import UserInformation from '@/components/ProfileInformation.vue'
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
  name: "CVAcademicsView",
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
    MDBSpinner,
    MDBTable
  },
  computed: {
    ...mapGetters(["user"]),    
  },
  data() {
    return {
      data: '',
      modalEditTile: 'Educación',
      modalEditMessage: '',
      buttonEditText: '',
      isEditAcademic: false,
    }
  },
  setup() {
    const academic = ref('');
    const modalAcademicEdit = ref(false);
    const modalAcademicDelete = ref(false);

    return {
      academic,
      modalAcademicEdit,
      modalAcademicDelete,
    };
  },
  methods: {
    verifyNumberOfAcademics() {
      const academics = this.user.employee.cv.academicTrainings.length;

      if (academics > 1) {
        this.modalAcademicDelete = true;
      }
    },
    showDataToOperate(data, operation) {
      this.data = data;

      if (operation === 'delete') {        
        this.modalAcademicDelete = true;

        this.verifyNumberOfAcademics();
      } else if (operation === 'edit') { 
        this.modalAcademicEdit = true; 
        this.academic = data.academicTraining;
        this.modalEditMessage = 'Recuerda mantener tu trayectoria académica actualizada';
        this.buttonEditText = 'Guardar';
        this.isEditAcademic = true;
      } else {
        this.academic  = '';
        this.modalAcademicEdit = true; 
        this.modalEditMessage = 'Agrega toda tu trayectoria académica para que los reclutadores' 
         + 'puedan conocer más sobre ti';
        this.buttonEditText = 'Agregar';
        this.isEditAcademic = false;
      }
    },
    checkInput() {
      let isValid = true;
      const inputElement = document.getElementById('input-academic');
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
        this.isEditAcademic ? 
          await this.editAcademic() : await this.addAcademic();
      }
    },
    async addAcademic() {
      const academicContainer = document.getElementById('academic-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = 'cv-academic-trainings';
      const payload = {
        cvId: this.user.employee.cv.id,
        academicTraining: this.academic,
      };
      this.modalEditMessage = 'Agregando trayectoria académica';
      
      spinner.classList.remove('d-none');
      academicContainer.classList.add('d-none');

      await axios.post(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const academic = response.data;

        if (codeStatus === 201) {
          this.setCVState('add', academic);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Trayectoria académica agregada correctamente 👍';
          }, 1000);

          setTimeout(() => {
            this.modalAcademicEdit = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          400: "Verifique el campo nuevamente 🤔",
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        this.modalEditMessage = messages[codeStatus];

        academicContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async editAcademic() {
      const academicContainer = document.getElementById('academic-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `cv-academic-trainings/${this.data.id}`;
      const payload = {
        academicTraining: this.academic,
      };
      this.modalEditMessage = 'Actualizando Trayectoria Académica';
      
      spinner.classList.remove('d-none');
      academicContainer.classList.add('d-none');

      await axios.patch(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const academic = response.data;

        if (codeStatus === 200) {
          this.setCVState('edit', academic);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Trayectoria Académica actualizada correctamente 👍';
          }, 1000);

          setTimeout(() => {
            this.modalAcademicEdit = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          400: "Verifique el campo nuevamente 🤔",
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        this.modalEditMessage = messages[codeStatus];

        academicContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async deleteAcademic() {
      const messageDelete = document.getElementById('message-academics-delete');
      const spinner = document.getElementById('spinner-academic-delete');
      const academicContainer = document.getElementById('academic-info-container');
      const academicId = this.data.id;   
      const token = Cookies.get('access_token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      const url = `cv-academic-trainings/${academicId}`;

      messageDelete.innerHTML = 'Eliminando Trayectoria Académica';
      spinner.classList.remove('d-none');
      academicContainer.classList.add('d-none');

      await axios.delete(url, config).then((response) => {
        const codeStatus = response.status;
        const academic = response.data;

        if (codeStatus === 204) {
          this.setCVState('delete', this.data);

          setTimeout(() => {
            spinner.classList.add('d-none');
            messageDelete.innerHTML = 'Trayectoria Académica eliminada correctamente 👍';            
          }, 1000);

          setTimeout(() => {
            this.modalAcademicDelete = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          404: 'No se encontró esa trayectoria académica. Vuelve a iniciar sesión 😢',
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        messageDelete.innerHTML = messages[codeStatus];

        academicContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    setCVState(operation, academic) {
      const academicTrainings = this.user.employee.cv.academicTrainings;

      if (operation === 'add') {
        academicTrainings.push(academic);
        
        this.user.employee.cv.academicTrainings = academicTrainings;

        this.$store.commit('setUser', this.user);
      } else if (operation === 'edit') {
        const index = academicTrainings.findIndex((item) => item.id === academic.id);

        academicTrainings[index] = academic;
        this.user.employee.cv.academicTrainings = academicTrainings;

        this.$store.commit('setUser', this.user);
      } else {
        academicTrainings.forEach((element, index) => {
          if (academic === element) {
            academicTrainings.splice(index, 1);
          }
        });
  
        this.user.employee.cv.academicTrainings = academicTrainings;

        this.$store.commit('setUser', this.user);
      }
    }
  },
};
