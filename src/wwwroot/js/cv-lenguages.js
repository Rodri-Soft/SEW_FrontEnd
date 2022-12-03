import Navbar from '@/components/Navbar.vue'
import UserInformation from '@/components/UserInformation.vue'
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
    MDBSpinner,
    MDBTable
  },
  computed: {
    ...mapGetters(["user"]),    
  },
  data() {
    return {
      data: '',
      modalEditTile: 'Expereiencia Laboral',
      modalEditMessage: '',
      buttonEditText: '',
      isEditWork: false,
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
  methods: {
    verifyNumberOfWorks() {
      const works = this.user.employee.cv.workExperiences.length;

      if (works > 1) {
        this.modalWorkDelete = true;
      }
    },
    showDataToOperate(data, operation) {
      this.data = data;

      if (operation === 'delete') {        
        this.modalWorkDelete = true;

        this.verifyNumberOfWorks();
      } else if (operation === 'edit') { 
        this.modalWorkEdit = true; 
        this.work = data.workExperience;
        this.modalEditMessage = 'Recuerda mantener tus Experiencias Laborales actualizadas';
        this.buttonEditText = 'Guardar';
        this.isEditWork = true;
      } else {
        this.work  = '';
        this.modalWorkEdit = true; 
        this.modalEditMessage = 'Agrega tus experiencias laborales para que los reclutadores' 
         + 'puedan conocer más sobre ti';
        this.buttonEditText = 'Agregar';
        this.isEditWork = false;
      }
    },
    checkInput() {
      let isValid = true;
      const inputElement = document.getElementById('input-work');
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
        this.isEditWork ? 
          await this.editWork() : await this.addWork();
      }
    },
    async addWork() {
      const workContainer = document.getElementById('work-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = 'cv-work-experiences';
      const payload = {
        cvId: this.user.employee.cv.id,
        workExperience: this.work,
      };
      this.modalEditMessage = 'Agregando Experiencia Laboral';
      
      spinner.classList.remove('d-none');
      workContainer.classList.add('d-none');

      await axios.post(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const work = response.data;

        if (codeStatus === 201) {
          this.setCVState('add', work);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Experiencia Laboral agregada correctamente 👍';
          }, 1000);

          setTimeout(() => {
            this.modalWorkEdit = false;
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

        workContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async editWork() {
      const workContainer = document.getElementById('work-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `cv-work-experiences/${this.data.id}`;
      const payload = {
        workExperience: this.work,
      };
      this.modalEditMessage = 'Actualizando Experiencia Laboral';
      
      spinner.classList.remove('d-none');
      workContainer.classList.add('d-none');

      console.log({url, payload, data: this.data});

      await axios.patch(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const work = response.data;

        if (codeStatus === 200) {
          this.setCVState('edit', work);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Experiencia Laboral actualizada correctamente 👍';
          }, 1000);

          setTimeout(() => {
            this.modalWorkEdit = false;
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

        workContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async deleteWork() {
      const messageDelete = document.getElementById('message-works-delete');
      const spinner = document.getElementById('spinner-work-delete');
      const workContainer = document.getElementById('work-info-container');
      const workId = this.data.id;   
      const token = Cookies.get('access_token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      const url = `cv-work-experiences/${workId}`;

      messageDelete.innerHTML = 'Eliminando Experiencia Laboral';
      spinner.classList.remove('d-none');
      workContainer.classList.add('d-none');

      await axios.delete(url, config).then((response) => {
        const codeStatus = response.status;
        const work = response.data;

        if (codeStatus === 204) {
          this.setCVState('delete', this.data);

          setTimeout(() => {
            spinner.classList.add('d-none');
            messageDelete.innerHTML = 'Experiencia Laboral eliminada correctamente 👍';            
          }, 1000);

          setTimeout(() => {
            this.modalWorkDelete = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          404: 'No se encontró esa experiencia laboral. Vuelve a iniciar sesión 😢',
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        messageDelete.innerHTML = messages[codeStatus];

        workContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    setCVState(operation, work) {
      const workExperiences = this.user.employee.cv.workExperiences;

      if (operation === 'add') {
        workExperiences.push(work);
        
        this.user.employee.cv.workExperiences = workExperiences;

        this.$store.commit('setUser', this.user);
      } else if (operation === 'edit') {
        const index = workExperiences.findIndex((item) => item.id === work.id);

        workExperiences[index] = work;
        this.user.employee.cv.workExperiences = workExperiences;

        this.$store.commit('setUser', this.user);
      } else {
        workExperiences.forEach((element, index) => {
          if (work === element) {
            workExperiences.splice(index, 1);
          }
        });
  
        this.user.employee.cv.workExperiences = workExperiences;

        this.$store.commit('setUser', this.user);
      }
    }
  },
};