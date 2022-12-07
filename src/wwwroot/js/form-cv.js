import CVItemForm from "@/components/CVItemForm.vue";
import { mapGetters } from "vuex";
import { ref } from "vue";
import axios from 'axios';
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTable,
  MDBTextarea,
  MDBSpinner
} from "mdb-vue-ui-kit";
import Cookies from "js-cookie";
export default {
  name: "FormCV",
  components: {
    CVItemForm,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBTable,
    MDBTextarea,
    MDBSpinner
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      lenguages: [],
      works: [],
      academics: [],
      certificates: [],
      skills: [],
      description: '',
      isStageOneVisible: true,
      isStageTwoVisible: false,
      isStageThreeVisible: false,
      isStageFourVisible: false,
      isStageFiveVisible: false,
      isStageSixVisible: false,
    };
  },
  setup() {
    const cvModal = ref(false);

    return {
      cvModal,
    };
  },
  methods: {
    showStageOne() {
      setTimeout(() => {
        this.isStageTwoVisible = false;
        this.isStageOneVisible = true;
      }, 100);
    },
    showStageTwo(lenguages) {
      this.lenguages = lenguages;

      setTimeout(() => {
        this.isStageOneVisible = false;
        this.isStageThreeVisible = false;
        this.isStageTwoVisible = true;
      }, 100);
    },
    showStageThree(works) {
      this.works = works;

      setTimeout(() => {
        this.isStageTwoVisible = false;
        this.isStageFourVisible = false;
        this.isStageThreeVisible = true;
      }, 100);
    },
    showStageFour(academics) {
      this.academics = academics;

      setTimeout(() => {
        this.isStageThreeVisible = false;
        this.isStageFiveVisible = false;
        this.isStageFourVisible = true;
      }, 100);
    },
    showStageFive(certificates) {
      this.certificates = certificates;

      setTimeout(() => {
        this.isStageFourVisible = false;
        this.isStageSixVisible = false;
        this.isStageFiveVisible = true;
      }, 100);
    },
    showStageSix(skills) {
      this.skills = skills;

      setTimeout(() => {
        this.isStageFiveVisible = false;
        this.isStageSixVisible = true;
      }, 100);
    },
    closeCVStages() {
      this.isStageOneVisible = true;
      this.isStageTwoVisible = false;
      this.isStageThreeVisible = false;
      this.isStageFourVisible = false;
      this.isStageFiveVisible = false;
      this.isStageSixVisible = false;
    },
    async createCV(description) {

      const payload = {
        description: description,
        employeeId: this.$store.state.user.employee.id,
        lenguages: this.lenguages.map((x) => ({ lenguage: x })),
        workExperiences: this.works.map((x) => ({ workExperience: x })),
        academicTrainings: this.academics.map((x) => ({ academicTraining: x })),
        certifications: this.certificates.map((x) => ({ certification: x })),
        skills: this.skills.map((x) => ({ skill: x })),
      };

      const spinner = document.getElementById('spinner-register-cv');
      const messageCVRegister = document.getElementById('message-register');
      messageCVRegister.innerHTML = "Registrando CV";
      
      spinner.classList.remove('d-none');
      spinner.style.display = 'flex';
      
      setTimeout(async () => {
        const cvRegistrarion = await this.registerNewEmployeCV(payload);
      }, 1500);
    },
    async registerNewEmployeCV(payload) {    
      const messageCVRegister = document.getElementById('message-register');
      const spinner = document.getElementById('spinner-register-cv');
      const token = Cookies.get('access_token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      await axios.post("cvs", payload, config).then((response) => {
        const codeStatus = response.status;        
        
        if (codeStatus === 201) {
          messageCVRegister.innerHTML = "!CV registrado correctamente! 😊";
          spinner.classList.add('d-none');
          messageCVRegister.classList.add("text-success");

          const newUserCV = response.data;
          
          setTimeout(() => {
            this.$store.dispatch("cv", newUserCV);
            this.$router.go();
          }, 2000);

        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        spinner.classList.add('d-none');
        const messages = {
          400: "Verifique las secciones nuevamente 🤔",
          409: "El CV ya se encuentra registrado 🤔",
          500: 'Algo salió mal, intenta más tarde 😔'        
        };

        messageCVRegister.innerHTML = messages[codeStatus];
      });
    },
  },
};
