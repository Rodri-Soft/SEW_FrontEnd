import FormInformation from '@/components/FormInformation.vue'
import { ref } from 'vue';
import axios from 'axios';
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
  MDBTable,  
  MDBTextarea
} from "mdb-vue-ui-kit";

export default {
  name: 'ProfileView',
  components: {
    FormInformation,
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
    MDBTable,
    MDBTextarea,
  },
  computed: {
    ...mapGetters(['user']),
  },
  data() {
    return {
      lenguages: [],
      works: [],
      academics: [],
      certifications: [],
      skills: [],
      description: null,
    };
  },
  setup() {
    const lenguage = ref('');
    const work = ref('');
    const academic = ref('');
    const certification = ref('');
    const skill = ref('');
    const description = ref('');
    const modalLenguageCV = ref(false);
    const modalWorkCV = ref(false);
    const modalAcademicCV = ref(false);
    const modalCertificationCV = ref(false);
    const modalSkillCV = ref(false);
    const modalDescriptionCV = ref(false);
    const openModalDescriptionCV = () => {
      modalSkillCV.value = false;
      setTimeout(() => {        
        modalDescriptionCV.value = true;
        description.value = '';
      }, 200);
    };
    const openModalSkillCV = () => {
      modalCertificationCV.value = false;
      modalDescriptionCV.value = false;
      setTimeout(() => {
        modalSkillCV.value = true;
        skill.value = '';
      }, 200);
    };
    const openModalCertificationCV = () => {
      modalAcademicCV.value = false;
      modalSkillCV.value = false;
      setTimeout(() => {
        modalCertificationCV.value = true;
        certification.value = '';
      }, 200);
    };
    const openModalAcademicCV = () => {
      modalWorkCV.value = false;
      modalCertificationCV.value = false;
      setTimeout(() => {
        modalAcademicCV.value = true;
        academic.value = '';
      }, 200);
    };
    const openModalWorkCV = () => {
      modalLenguageCV.value = false;
      modalAcademicCV.value = false;
      setTimeout(() => {
        modalWorkCV.value = true;
        work.value = '';
      }, 200);
    };
    const openModalLenguageCV = () => {
      modalWorkCV.value = false;
      setTimeout(() => {
        lenguage.value = '';
        modalLenguageCV.value = true;
      }, 200);
    };

    return {
      lenguage,
      work,
      academic,
      certification,
      skill,
      description,
      modalLenguageCV,
      modalWorkCV,
      modalAcademicCV,
      modalCertificationCV,
      modalSkillCV,
      modalDescriptionCV,
      openModalDescriptionCV,
      openModalSkillCV,
      openModalCertificationCV,
      openModalAcademicCV,
      openModalWorkCV,
      openModalLenguageCV,
    };
  },
  mounted() {
    this.modalLenguageCV = true;
  },
  methods: {
    checkInput(input) {
      const textPattern = new RegExp(
        "^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$"
      );
      let isValid = true;
      const inputElement = document.getElementById(`input-${input}`);
      const inputElementValue = inputElement.value;

      if (!textPattern.test(inputElementValue)) {
        isValid = false;
        inputElement.classList.add('is-invalid');
      } else {
        inputElement.classList.remove('is-invalid');
        inputElement.value = '';        
      }

      return {
        isValid,
        inputElementValue,
      };
    },
    addRow(field, array) {
      const checkInput = this.checkInput(field);
      const isValid = checkInput.isValid;
      const inputElementValue = checkInput.inputElementValue;

      if (isValid) {
        array.push(inputElementValue);
      }
    },
    deleteRow(index, array) {      
      array.splice(index, 1);
    },
    async registerNewEmployeCV() {
      const payload = {
        description: this.description,
        employeeId: this.$store.state.user.employee.id,
        lenguages: this.lenguages.map((x) => ({ lenguage: x })),
        workExperiences: this.works.map((x) => ({ workExperience: x })),
        academicTrainings: this.academics.map((x) => ({ academicTraining: x })),
        certifications: this.certifications.map((x) => ({ certification: x })),
        skills: this.skills.map((x) => ({ skill: x })),
      };
      
      const messageCVRegister = document.getElementById("message-cv-register");

      await axios.post('cvs', payload).then((response) => {
        const codeStatus = response.status;

        if (codeStatus === 201) {
          messageCVRegister.innerHTML = "!CV registrado correctamente! 😊";

          messageCVRegister.classList.add("text-success");
    
          setTimeout(() => {
            this.$router.go()
          }, 1000);  
        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {
          '400': 'Verifique las secciones nuevamente 🤔',
          '500': 'Error interno del servidor 😢'
        }
        messageCVRegister.innerHTML = messages[codeStatus];
      });
    },
  },
};