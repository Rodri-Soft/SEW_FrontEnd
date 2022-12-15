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
  name: "CVLenguagesView",
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
      modalEditTile: 'Idiomas',
      modalEditMessage: '',
      buttonEditText: '',
      isEditLenguage: false,
    }
  },
  setup() {
    const lenguage = ref('');
    const modalLenguageEdit = ref(false);
    const modalLenguageDelete = ref(false);

    return {
      lenguage,
      modalLenguageEdit,
      modalLenguageDelete,
    };
  },
  methods: {
    verifyNumberOfLenguages() {
      const lenguages = this.user.employee.cv.lenguages.length;

      if (lenguages > 1) {
        this.modalLenguageDelete = true;
      }
    },
    showDataToOperate(data, operation) {
      this.data = data;

      if (operation === 'delete') {        
        this.modalLenguageDelete = true;

        this.verifyNumberOfLenguages();
      } else if (operation === 'edit') { 
        this.modalLenguageEdit = true; 
        this.lenguage = data.lenguage;
        this.modalEditMessage = 'Recuerda mantener tus Idiomas actualizados';
        this.buttonEditText = 'Guardar';
        this.isEditLenguage = true;
      } else {
        this.lenguage  = '';
        this.modalLenguageEdit = true; 
        this.modalEditMessage = 'Agrega todos los idiomas que domines para que los reclutadores' 
         + ' puedan conocer más sobre ti';
        this.buttonEditText = 'Agregar';
        this.isEditLenguage = false;
      }
    },
    checkInput() {
      let isValid = true;
      const inputElement = document.getElementById('input-lenguage');
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
        this.isEditLenguage ? 
          await this.editLenguage() : await this.addLenguage();
      }
    },
    async addLenguage() {
      const lenguageContainer = document.getElementById('lenguage-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = 'cv-lenguages';
      const payload = {
        cvId: this.user.employee.cv.id,
        lenguage: this.lenguage,
      };
      this.modalEditMessage = 'Agregando idioma';
      
      spinner.classList.remove('d-none');
      lenguageContainer.classList.add('d-none');

      await axios.post(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const lenguage = response.data;

        if (codeStatus === 201) {
          this.setCVState('add', lenguage);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Idioma agregado correctamente 👍';
          }, 1000);

          setTimeout(() => {
            this.modalLenguageEdit = false;
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

        lenguageContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async editLenguage() {
      const lenguageContainer = document.getElementById('lenguage-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `cv-lenguages/${this.data.id}`;
      const payload = {
        lenguage: this.lenguage,
      };
      this.modalEditMessage = 'Actualizando Idioma';
      
      spinner.classList.remove('d-none');
      lenguageContainer.classList.add('d-none');

      await axios.patch(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const lenguage = response.data;

        if (codeStatus === 200) {
          this.setCVState('edit', lenguage);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Idioma actualizado correctamente 👍';
          }, 1000);

          setTimeout(() => {
            this.modalLenguageEdit = false;
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

        lenguageContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async deleteLenguage() {
      const messageDelete = document.getElementById('message-lenguages-delete');
      const spinner = document.getElementById('spinner-lenguage-delete');
      const lenguageContainer = document.getElementById('lenguage-info-container');
      const lenguageId = this.data.id;   
      const token = Cookies.get('access_token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      const url = `cv-lenguages/${lenguageId}`;

      messageDelete.innerHTML = 'Eliminando Idioma';
      spinner.classList.remove('d-none');
      lenguageContainer.classList.add('d-none');

      await axios.delete(url, config).then((response) => {
        const codeStatus = response.status;
        const lenguage = response.data;

        if (codeStatus === 204) {
          this.setCVState('delete', this.data);

          setTimeout(() => {
            spinner.classList.add('d-none');
            messageDelete.innerHTML = 'Idioma eliminado correctamente 👍';            
          }, 1000);

          setTimeout(() => {
            this.modalLenguageDelete = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          404: 'No se encontró ese Idioma. Vuelve a iniciar sesión 😢',
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        messageDelete.innerHTML = messages[codeStatus];

        lenguageContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    setCVState(operation, lenguage) {
      const lenguages = this.user.employee.cv.lenguages;

      if (operation === 'add') {
        lenguages.push(lenguage);
        
        this.user.employee.cv.lenguages = lenguages;

        this.$store.commit('setUser', this.user);
      } else if (operation === 'edit') {
        const index = lenguages.findIndex((item) => item.id === lenguage.id);

        lenguages[index] = lenguage;
        this.user.employee.cv.lenguages = lenguages;

        this.$store.commit('setUser', this.user);
      } else {
        lenguages.forEach((element, index) => {
          if (lenguage === element) {
            lenguages.splice(index, 1);
          }
        });
  
        this.user.employee.cv.lenguages = lenguages;

        this.$store.commit('setUser', this.user);
      }
    }
  },
};
