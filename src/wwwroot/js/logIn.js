import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery';
import axios from 'axios';
import './axios'
import { ref } from 'vue';
import { mapMutations } from 'vuex';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRadio
} from 'mdb-vue-ui-kit';
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRadio
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const modalRegisterUser = ref(false);
    const fullName = ref('');
    const rfc = ref('');
    const phoneNumber = ref('');
    const emailRegister = ref('');
    const passwordRegister = ref(''); 
    const role = ref('');

    return {
      email,
      password,
      modalRegisterUser,
      fullName,
      rfc,
      phoneNumber,
      emailRegister,
      passwordRegister,
      role,
    };
  },
  mounted() {
    this.setBackgroud();
    this.loginWithGoogle();
  },
  methods: {
    ...mapMutations(['setToken']),
    setBackgroud() {
      let width = $(window).width();
      const windowSize = 768;
      const windowsForm = 576;

      if (width < windowSize) {
        emptyBackgroundContainers();
      }

      $(window).resize(function () {
        width = $(window).width();

        if (width < windowSize) {
          emptyBackgroundContainers();
        }

        if (width >= windowSize) {
          fillBackgroundContainers('left', '44146cda');
          fillBackgroundContainers('right', '7026e0cc');
        }
      });
    },
    async login(event) {
      event.target.classList.add('was-validated');

      if (event.target.checkValidity()) {
        let payload = {
          email: this.email,
          password: this.password,
        };
        const url = 'auth/login';
        const messageLogin = document.getElementById('message-login');

        await axios.post(url, payload).then((data) => {
          const codeStatus = data.status; 
          const accessToken = data.data.token;
          
          if (codeStatus === 200) {
            // localStorage.setItem('access_token', accessToken);            
            this.setToken(accessToken);
            this.$router.push('about');          
          } 
        }).catch((error) => {
          const inputEmail = document.getElementById('input-email');
          const inputPassword = document.getElementById('input-password');          
          const codeStatus = error.response.status;
          const messages = {
            '400': 'Verifique los campos nuevamente 🤔',
            '401': 'Usuario o contraseña incorrectos 😕',
          }
          messageLogin.innerHTML = messages[codeStatus];

          inputEmail.classList.add('is-invalid');
          inputPassword.classList.add('is-invalid');
        });
      }
    },
    loginWithGoogle() {
      const googleButton = document.getElementById('google-button');
      const url = 'http://localhost:3000/api/v1/auth/google';
      const windowFeatures = 'location=yes, height=570, width=520,' + 
      'scrollbars=yes, status=yes, left=500, top=150';
      const windowTarget = '_blank';

      googleButton.addEventListener('click', () => {
        window.open(url, windowTarget, windowFeatures);
      });
    },
    checkInput(patterns, pattern, input, inputId) {
      let isValid = false;
      const inputElement = document.getElementById(inputId);

      if (!patterns[pattern].test(input)) {
        inputElement.classList.add('is-invalid');
        const formsText = document.querySelectorAll('.form-text');
                
        formsText.forEach((formText) => {
          formText.innerHTML = '';
        });
      } else {
        inputElement.classList.remove('is-invalid');

        isValid = true;
      }

      return isValid;
    },
    removeFormText() {
      const formsText = document.querySelectorAll('.form-text');
        
      formsText.forEach((formText) => {
        formText.innerHTML = '';
      });
    },
    showPassword() {    
      const iconsPassword = document.querySelectorAll('.password-icon');

      iconsPassword.forEach((iconPassword) => {
        iconPassword.addEventListener('click', () => {
          const spanPassowrd = iconPassword.parentElement
          const labelPassword = spanPassowrd.previousElementSibling;
          const inputPassword = labelPassword.previousElementSibling;

          const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';

          inputPassword.setAttribute('type', type);
          iconPassword.classList.toggle('fa-eye-slash');
        });
      });
    },
    validateFormRegister() {
      const patterns = {
        'fullName': new RegExp("^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$"),
        'rfc': new RegExp('^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$'),
        'phone': new RegExp('^[0-9]{10}$'),
        'email': new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$'),
        'password': new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\da-zA-ZÀ-ÿ\\u00f1\\u00d1$@$!%*?&#-.$($)$-$_]{8,16}$')
      };    
      let numberOfErrors = 5;

      this.checkInput(patterns, 'fullName', this.fullName, 'input-full-name') 
        ? numberOfErrors-- : numberOfErrors;
        
      this.checkInput(patterns, 'rfc', this.rfc, 'input-rfc') 
        ? numberOfErrors-- : numberOfErrors;
        
      this.checkInput(patterns, 'phone', this.phoneNumber, 'input-phone-number') 
        ? numberOfErrors-- : numberOfErrors;

      this.checkInput(patterns, 'email', this.emailRegister, 'input-email-register') 
        ? numberOfErrors-- : numberOfErrors;

      this.checkInput(patterns, 'password', this.passwordRegister, 'input-password-register') 
        ? numberOfErrors-- : numberOfErrors;

      return numberOfErrors;
    },
    async registerNewUser(event) {
      event.target.classList.add('was-validated');    

      const numberOfErrors = this.validateFormRegister();
      
      if (event.target.checkValidity() && numberOfErrors === 0) {
        let payload = {
          fullName: this.fullName,
          phone: this.phoneNumber,
          user: {
            rfc: this.rfc,
            role: role,
            email: this.emailRegister,
            password: this.passwordRegister,
            provider: 'Local',
          }
        };

        if (role === 'Recruiter') {
          payload.charge = '';
        }

        const url = role === 'recruiter' ? 'recruiters' : 'employees';

        axios.post(url, payload).then((data) => {
          const codeStatus = data.status;

          if (codeStatus === 201) {
            this.$router.push('about');
          }
        }).catch((error) => {
          const messageLogin = document.getElementById('message-register');
          const codeStatus = error.response.status;
          const messages = {
            '409': 'Pareces ya estar registrado, verifica los campos 👍',
            '400': 'Verifique los campos nuevamente 🤔',
          }
          messageLogin.innerHTML = messages[codeStatus];
        });
      } else {
        this.removeFormText();
      }
    }
  }
};

function emptyBackgroundContainers() {  
  $('#background-left-container').empty();
  $('#background-right-container').empty();      
}

function fillBackgroundContainers(side, id){
  if ($(`#background-${side}-container`).children().length == 0) {
    const background  = document.createElement('img');    
    background.src = `/img/loginBackground-${side}.${id}.svg`;
    background.className = 'img-fluid';
    background.alt = `background-${side}`;
    const backgroundContainer = document.getElementById(`background-${side}-container`);

    backgroundContainer.appendChild(background);
  }
}
