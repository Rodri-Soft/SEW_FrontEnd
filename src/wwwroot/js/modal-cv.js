import FormInformation from '@/components/FormInformation.vue'
import { ref } from 'vue';
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
  name: "ProfileView",
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
    MDBTextarea
  },
  computed: {
    ...mapGetters(["user"], ["lenguages"], ["works"], ["academics"], ["certifications"], ["skills"], ["description"]),
  },
  data() {
    return {
      lenguages: [],
      works: [],
      academics: [],
      certifications: [],
      skills: [],
      description: null,      
    }
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
      }, 200);
    }

    const openModalSkillCV = () => {
      modalCertificationCV.value = false;  
      modalDescriptionCV.value = false;    
      setTimeout(() => {
        modalSkillCV.value = true;
      }, 200);
    }

    const openModalCertificationCV = () => {
      modalAcademicCV.value = false;
      modalSkillCV.value = false;
      setTimeout(() => {
        modalCertificationCV.value = true;
      }, 200);
    }

    const openModalAcademicCV = () => {
      modalWorkCV.value = false;
      modalCertificationCV.value = false;
      setTimeout(() => {
        modalAcademicCV.value = true;
      }, 200);
    };

    const openModalWorkCV = () => {            
      modalLenguageCV.value = false;
      modalAcademicCV.value = false;      
      setTimeout(() => {
        modalWorkCV.value = true;
      }, 200);    
    };

    const openModalLenguageCV = () => {
      modalWorkCV.value = false;
      setTimeout(() => {
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
      const textPattern = new RegExp("^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$");
      let isValid = true;
      const inputElement = document.getElementById(`input-${input}`);
      const inputElementValue = inputElement.value;
      
      if (!textPattern.test(inputElementValue)) {
        isValid = false;
        inputElement.classList.add("is-invalid");
      } else {
        inputElement.classList.remove("is-invalid");
        inputElement.value = '';    
      }

      return {
        isValid,
        inputElementValue
      };
    },
    addRow(field) {
      const checkInput = this.checkInput(field);
      const isValid = checkInput.isValid;
      const inputElementValue = checkInput.inputElementValue;
      const arrays = {
        lenguage: this.lenguages,
        work: this.works,
        academic: this.academics,
        certification: this.certifications,
        skill: this.skills,        
      };

      if (isValid) {
        this.$store.dispatch(`add_${field}`, inputElementValue);
        arrays[field].push(inputElementValue);
      }
    },
    deleteRow(index, field) {
      const arrays = {
        lenguage: this.lenguages,
        work: this.works,
        academic: this.academics,
        certification: this.certifications,
        skill: this.skills,
      };  

      this.$store.dispatch(`remove_${field}`, index);
      arrays[field].splice(index, 1);
    },
  },
};