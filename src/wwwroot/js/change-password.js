import { ref } from "vue";
import axios from 'axios';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-vue-ui-kit";

export default {
  name: "ChangePasswordView",
  components: {
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBSpinner,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
  },
  setup() {
    const newPassword = ref('');
    const passwordConfirm = ref('');

    return {
      newPassword,
      passwordConfirm,
    };
  },
  methods: {
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
    checkInput(patterns, pattern, input, inputId) {
      let isValid = false;
      const inputElement = document.getElementById(inputId);

      if (!patterns[pattern].test(input)) {
        inputElement.classList.add('is-invalid');
      } else {
        inputElement.classList.remove('is-invalid');

        isValid = true;
      }

      return isValid;
    },
    validateFormChangePassword() {
      const patterns = {
        'password': new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\da-zA-ZÀ-ÿ\\u00f1\\u00d1$@$!%*?&#-.$($)$-$_]{8,16}$')
      };    
      let numberOfErrors = 2;
      const checkInputs = [
        this.checkInput(patterns, 'password', this.newPassword, 'input-new-password'),
        this.checkInput(patterns, 'password', this.passwordConfirm, 'input-password-confirm'),
      ];

      checkInputs.forEach((checkInput) => {
        if (checkInput) {
          numberOfErrors--;
        }
      });
    
      return numberOfErrors;
    },
    async changePassword() {
      const message = document.getElementById('message-change-password');
      const inputPasswordConfirm = document.getElementById('input-password-confirm');
      const spinner = document.getElementById('spinner');
      const numberOfErrors = this.validateFormChangePassword();
      const areEqualPasswords = this.newPassword === this.passwordConfirm;
      const form = document.getElementById('form-change-password');
      
      if (!areEqualPasswords) {
        inputPasswordConfirm.classList.add('is-invalid');
      } else {
        inputPasswordConfirm.classList.remove('is-invalid');
      }

      if (numberOfErrors === 0 && areEqualPasswords) {
        const token = window.location.pathname.split('/')[2];

        form.classList.add('d-none');
        spinner.classList.remove('d-none');
        message.innerHTML = 'Cambiando contraseña';

        const url = 'auth/change-password';
        const payload = {
          token: token,
          newPassword: this.newPassword,
        };

        axios.post(url, payload).then((response) => {
          const codeStatus = response.status;
          if (codeStatus === 200) {
            setTimeout(() => {
              spinner.classList.add('d-none');
              message.innerHTML = 'Contraseña cambiada correctamente 👍';
            }, 1500);

            setTimeout(() => {
              this.$router.push('/login');
            }, 3000);
          }
        }).catch((error) => {
          const codeStatus = error.response.status;
          const messages = {
            401: 'El enlace ha caducado. Por favor, solicita un nuevo enlace 🤔',
            500: 'Algo salió mal, intenta más tarde 😔' 
          };

          spinner.classList.add('d-none');
          form.classList.remove('d-none');

          message.innerHTML = messages[codeStatus];
        });
      }
    }
  },
};
