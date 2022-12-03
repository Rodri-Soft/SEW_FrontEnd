import CVItemForm from "@/components/CVItemForm.vue";
import { mapGetters } from "vuex";
import axios from 'axios';
import './axios'
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
  MDBModalTitle,
  MDBBadge,
  MDBSpinner
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
    MDBModalTitle,
    MDBBadge,
    MDBSpinner
  },
  computed: {
    ...mapGetters(["user"]),
  },
  beforeCreate() {
    // const user = this.$store.getters.user;
    // console.log({user});
    // if (!user) {
    //   const urlProfile = "profile";
    //   const token = Cookies.get('access_token');      
    //   console.log({token});
    //   const config = {
    //     headers: { 'Authorization': `Bearer ${token}` }
    //   };
      
    //   axios.get(urlProfile, config).then((response) => {
    //     const user = response.data;
        
    //     this.$store.dispatch("user", user);
    //     this.$router.push('profile');
    //   });
    // }
  },
  mounted() {
    this.fillEditModalFields();
  },
  data() {
    return {
      profileImage: `https://picsum.photos/1920/112?random=${Math.random()}.webp`
    }
  },
  setup() {
    const modalUserInformation = ref(false);
    const modalUserEdit = ref(false);
    const fullName = ref('');
    const email = ref('');
    const phone = ref('');
    const rfc = ref('');
    const charge = ref('');

    return {      
      modalUserInformation, 
      modalUserEdit,
      fullName,
      email,
      phone,
      rfc,
      charge
    };
  },
  methods: {
    fillEditModalFields() {
      this.fullName = this.user.employee ? 
        this.user.employee.fullName : this.user.recruiter.fullName;
      this.email = this.user.email;
      this.phone = this.user.employee ?
        this.user.employee.phone : this.user.recruiter.phone;
      this.rfc = this.user.rfc;
      this.charge = this.user.recruiter ?
        this.user.recruiter.charge : '';
    },
    checkInput(patterns, pattern, inputId) {
      let isValid = false;
      const inputElement = document.getElementById(inputId);
      const value = inputElement.value

      if (!patterns[pattern].test(value)) {
        inputElement.classList.add('is-invalid');
      } else {
        inputElement.classList.remove('is-invalid');

        isValid = true;
      }

      return isValid;
    },
    validateFormEdit() {
      const patterns = {
        'fullName': new RegExp("^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$"),
        'rfc': new RegExp('^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$'),
        'phone': new RegExp('^[0-9]{10}$'),
        'email': new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$')
      };    
      let numberOfErrors = 4;
      const checkInputs = [
        this.checkInput(patterns, 'fullName', 'input-fullName-edit'),
        this.checkInput(patterns, 'rfc', 'input-rfc-edit'),
        this.checkInput(patterns, 'phone', 'input-phone-edit'),
        this.checkInput(patterns, 'email', 'input-email-edit')
      ];

      checkInputs.forEach((checkInput) => {
        if (checkInput) {
          numberOfErrors--;
        }
      });
    
      return numberOfErrors;
    },
    async createEditInformationUser(event) {
      event.target.classList.add('was-validated');

      const numberOfErrors = this.validateFormEdit();

      if (event.target.checkValidity() && numberOfErrors === 0) {
        const payload = Object.fromEntries(new FormData(event.target));
        const messageUserEdit = document.getElementById('message-user-edit');
        const spinner = document.getElementById('spinner-user-edit');
        const role = this.$store.getters.user.employee ? 'employees' : 'recruiters';
        const userId = role === 'employees' ? 
          this.$store.getters.user.employee.id : this.$store.getters.user.recruiter.id;
        const url = `/${role}/${userId}`; 
        const token = Cookies.get('access_token');
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };
      
        messageUserEdit.innerHTML = 'Actulizando información';
        spinner.classList.remove('d-none');          
        
        await axios.patch(url, payload, config).then((response) => {
          const codeStatus = response.status;
          
          if (codeStatus === 200) {
            this.setUserState(payload);

            setTimeout(() => {
              messageUserEdit.innerHTML = 'Información actualizada correctamente👍';
              spinner.classList.add('d-none');            
            }, 1500);
            
            setTimeout(() => {
              this.modalUserEdit = false;
            }, 3000);
          }
        }).catch((error) => {
          const codeStatus = error.response.status;          
          const type = error.response.data.error[0].path;
          const messages = {
            '400': 'Verifique los campos nuevamente 🤔',
            '401': 'No autorizado 😡',
            '409':  `El ${type} ya se encuentra registrado 🥹`, 
            '500': 'Algo salió mal, intenta más tarde 😔'
          }
          messageUserEdit.innerHTML = messages[codeStatus];

          spinner.classList.add('d-none');
        });   
      }
    }, 
    setUserState(payload) {
      const user = this.user;
      const role = user.employee ? 'employee' : 'recruiter';
      
      user[role].fullName = payload.fullName;
      user[role].phone = payload.phone;
      user.email = payload.email;
      user.rfc = payload.rfc;

      if (role === 'recruiter') {
        user.recruiter.charge = payload.charge;
      }

      this.$store.commit('setUser', user);

      this.fillEditModalFields();
    }
  }
};
