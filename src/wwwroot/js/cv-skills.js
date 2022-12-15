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
  name: "CVSkillsView",
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
      modalEditTile: 'Habilidades',
      modalEditMessage: '',
      buttonEditText: '',
      isEditSkill: false,
    }
  },
  setup() {
    const skill = ref('');
    const modalSkillEdit = ref(false);
    const modalSkillDelete = ref(false);

    return {
      skill,
      modalSkillEdit,
      modalSkillDelete,
    };
  },
  methods: {
    verifyNumberOfSkills() {
      const skills = this.user.employee.cv.skills.length;

      if (skills > 1) {
        this.modalSkillDelete = true;
      }
    },
    showDataToOperate(data, operation) {
      this.data = data;

      if (operation === 'delete') {        
        this.modalSkillDelete = true;

        this.verifyNumberOfSkills();
      } else if (operation === 'edit') { 
        this.modalSkillEdit = true; 
        this.skill = data.skill;
        this.modalEditMessage = 'Recuerda mantener tus Habilidades actualizadas';
        this.buttonEditText = 'Guardar';
        this.isEditSkill = true;
      } else {
        this.skill  = '';
        this.modalSkillEdit = true; 
        this.modalEditMessage = 'Agrega todas tus habilidades para que los reclutadores' 
         + ' puedan conocer más sobre ti';
        this.buttonEditText = 'Agregar';
        this.isEditSkill = false;
      }
    },
    checkInput() {
      let isValid = true;
      const inputElement = document.getElementById('input-skill');
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
        this.isEditSkill ? 
          await this.editSkill() : await this.addSkill();
      }
    },
    async addSkill() {
      const skillContainer = document.getElementById('skill-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = 'cv-skills';
      const payload = {
        cvId: this.user.employee.cv.id,
        skill: this.skill,
      };
      this.modalEditMessage = 'Agregando habilidad';
      
      spinner.classList.remove('d-none');
      skillContainer.classList.add('d-none');

      await axios.post(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const skill = response.data;

        if (codeStatus === 201) {
          this.setCVState('add', skill);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Habilidad agregada correctamente 👍';
          }, 1000);

          setTimeout(() => {
            this.modalSkillEdit = false;
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

        skillContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async editSkill() {
      const skillContainer = document.getElementById('skill-form-container');
      const spinner = document.getElementById('spinner-edit');
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `cv-skills/${this.data.id}`;
      const payload = {
        skill: this.skill,
      };
      this.modalEditMessage = 'Actualizando Habilidad';
      
      spinner.classList.remove('d-none');
      skillContainer.classList.add('d-none');

      // console.log({url, payload, data: this.data});

      await axios.patch(url, payload, config).then((response) => {
        const codeStatus = response.status;
        const skill = response.data;

        if (codeStatus === 200) {
          this.setCVState('edit', skill);

          setTimeout(() => {
            spinner.classList.add('d-none');
            
            this.modalEditMessage = 'Habilidad actualizada correctamente 👍';
          }, 1000);

          setTimeout(() => {
            this.modalSkillEdit = false;
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

        skillContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    async deleteSkill() {
      const messageDelete = document.getElementById('message-skills-delete');
      const spinner = document.getElementById('spinner-skill-delete');
      const skillContainer = document.getElementById('skill-info-container');
      const skillId = this.data.id;   
      const token = Cookies.get('access_token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      const url = `cv-skills/${skillId}`;

      messageDelete.innerHTML = 'Eliminando Habilidad';
      spinner.classList.remove('d-none');
      skillContainer.classList.add('d-none');

      await axios.delete(url, config).then((response) => {
        const codeStatus = response.status;
        const skill = response.data;

        if (codeStatus === 204) {
          this.setCVState('delete', this.data);

          setTimeout(() => {
            spinner.classList.add('d-none');
            messageDelete.innerHTML = 'Habilidad eliminada correctamente 👍';            
          }, 1000);

          setTimeout(() => {
            this.modalSkillDelete = false;
          }, 2000);
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          401: 'No autorizado 😡',
          404: 'No se encontró esa habilidad. Vuelve a iniciar sesión 😢',
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        messageDelete.innerHTML = messages[codeStatus];

        skillContainer.classList.remove('d-none');
        spinner.classList.add('d-none');
      });
    },
    setCVState(operation, skill) {
      const skills = this.user.employee.cv.skills;

      if (operation === 'add') {
        skills.push(skill);
        
        this.user.employee.cv.skills = skills;

        this.$store.commit('setUser', this.user);
      } else if (operation === 'edit') {
        const index = skills.findIndex((item) => item.id === skill.id);

        skills[index] = skill;
        this.user.employee.cv.skills = skills;

        this.$store.commit('setUser', this.user);
      } else {
        skills.forEach((element, index) => {
          if (skill === element) {
            skills.splice(index, 1);
          }
        });
  
        this.user.employee.cv.skills = skills;

        this.$store.commit('setUser', this.user);
      }
    }
  },
};
