import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import Category from '@/components/Category.vue'
import OfferItem from '@/components/OfferItem.vue'
import $ from 'jquery';
import { ref } from 'vue';
import axios from 'axios';
import './axios'

import {   

  MDBRow,
  MDBCol,
  MDBBtn,  
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImg,
  MDBCardGroup,
  MDBCardGroupItem,
  MDBListGroupItem,
  MDBListGroup,  
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRadio,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBTextarea,
  

} from "mdb-vue-ui-kit";

export default {

  name: 'OfferView',
  components: {      
    Navbar,
    ProfileMainMenu,      
    Category,
    OfferItem,
    
    MDBRow,
    MDBCol,
    MDBBtn,  
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImg,
    MDBCardGroup,
    MDBCardGroupItem,
    MDBListGroupItem,
    MDBListGroup,    
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRadio,
    MDBIcon,
    MDBInput,
    MDBCheckbox,  
    MDBTextarea,   
   
  },
  setup() {    

    const title = ref('');
    const description = ref('');
    const experience = ref('');
    const workday = ref('');   
    const modalAddOffer = ref(false);          

    return {      

      title,
      description,
      experience,
      workday,
      modalAddOffer, 
      
    };
  },
  data() {
    return {

      userObject: {
        photo: "https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg",
        full_name: "José Daniel Camarillo Villa",
        tag_name: "@CamarilloVilla",
        followers: 300,
        amount_offers: 21,
        role: "recruiters",
      },      
      offerInformation: [],
        // {
        //   title: "Lorem ipsum 1",                              
        //   description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //     Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
        //     excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
        //     cum voluptatum ratione? Ut! 1`,
        //   score: 3.5,
        //   jobAplicationsNumber: 24,          
        // },
        // {
        //   title: "Lorem ipsum 2",                              
        //   description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //     Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
        //     excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
        //     cum voluptatum ratione? Ut! 2`,
        //   score: 5,
        //   jobAplicationsNumber: 10,
        // },
        // {
        //   title: "Lorem ipsum 3",          
        //   description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //     Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
        //     excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
        //     cum voluptatum ratione? Ut! 3`,
        //   score: 2.1,
        //   jobAplicationsNumber: 400,
        // }

      // ]                               
    };
  },
  mounted(){ 
    this.fillOffers();
    this.adaptOfferButton();    
  },
  methods:{
    adaptOfferButton() {

      const windowSize = 992;  

      manageTextCenter(windowSize, "newOfferButton");        

      $(window).resize(function(){
                
        manageTextCenter(windowSize, "newOfferButton");          
        
      });     
    },    
    async publishOffer(event) {

      event.target.classList.add('was-validated');    

      const numberOfErrors = this.validateFormOffer();
      const messagePublish = document.getElementById('message-publish');

      if (event.target.checkValidity() && numberOfErrors === 0) {     
        
        messagePublish.innerHTML = 'Oferta publicada correctamente 😊';
        messagePublish.classList.add('text-success');
        const publishButton = document.getElementById('publish-offer-button');
        publishButton.setAttribute("disabled", "");
        let categoryCombobox = document.getElementById("combobox-offer-category");

        this.offerInformation.push(
          {
            title: this.title,                              
            description: this.description,
            category: categoryCombobox.value,
            experience: this.experience,
            workday: this.workday,
            score: 0,
            jobAplicationsNumber: 0,          
          }
        );

        setTimeout(() => {
          this.modalAddOffer = false;
          messagePublish.innerHTML = '';
          this.title = '';
          this.description = '';
          this.experience = '';
          this.workday = '';                       
          messagePublish.classList.remove('text-success');
        }, 2000);

        // let payload = {
        //   fullName: this.fullName,
        //   phone: this.phoneNumber,
        //   user: {
        //     rfc: this.rfc,
        //     role: this.role,
        //     email: this.emailRegister,
        //     password: this.passwordRegister,
        //     provider: 'Local',
        //   }
        // };

        // const messagePublish = document.getElementById('message-publish');
        // const url = this.role === 'Recruiter' ? 'recruiters' : 'employees';

        // await axios.post(url, payload).then((data) => {
        //   const codeStatus = data.status;

        //   if (codeStatus === 201) {
        //     messagePublish.innerHTML = 'Oferta publicada correctamente 😊';
        //     messagePublish.classList.add('text-success');

        //     setTimeout(() => {
        //       this.modalRegisterUser = false;
        //       messagePublish.innerHTML = '';
        //       this.fullName = '';
        //       this.rfc = '';
        //       this.phoneNumber = '';
        //       this.emailRegister = '';
        //       this.passwordRegister = '';
        //       this.role = '';              
        //       messagePublish.classList.remove('text-success');
        //     }, 2000);
        //   }
        // }).catch((error) => {
        //   const codeStatus = error.response.status;
        //   const messages = {
        //     '409': 'Pareces ya estar registrado, verifica los campos 👍',
        //     '400': 'Verifique los campos nuevamente 🤔',
        //     '500': 'Algo salió mal, intenta más tarde 😔'
        //   }
        //   messagePublish.innerHTML = messages[codeStatus];
        // });

      } else {
        this.removeFormText();
        messagePublish.innerHTML = 'Verifique los campos nuevamente 🤔';        
      }      
    },  
    validateFormOffer() {

      const patterns = {
        'input': new RegExp("^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$"),                                
      };    
      let numberOfErrors = 5;
      const checkInputs = [
        this.checkInput(patterns, 'input', this.title, 'input-offer-title'),
        this.checkInput(patterns, 'input', this.workday, 'input-offer-workday'),
        this.checkInput(patterns, 'input', this.description, 'textarea-offer-description'),
        this.checkInput(patterns, 'input', this.experience, 'textarea-offer-experience'),        
      ];

      checkInputs.forEach((checkInput) => {
        if (checkInput) {
          numberOfErrors--;
        }
      });      

      let categoryCombobox = document.getElementById("combobox-offer-category");
      if (categoryCombobox.value !== 'null' ) {        
        numberOfErrors--;
        categoryCombobox.classList.remove('invalid-select');
        categoryCombobox.classList.add('valid-select');
      } else {
        categoryCombobox.classList.remove('valid-select');
        categoryCombobox.classList.add('invalid-select');
      }
    
      return numberOfErrors;
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
    fillOffers() {
      this.offerInformation.push(
        {
          title: "Lorem ipsum 1",                              
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
            excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
            cum voluptatum ratione? Ut! 1`,
          category: "Tecnología",
          experience: "2-4 años",
          workday: "8 horas diarias",
          score: 3.5,
          jobAplicationsNumber: 24,          
        }
      );
    }

  }
}

function manageTextCenter(windowSize, element) {
  
  let width = $(window).width();

  if (width >= windowSize) {
    $(`#${element}`).removeClass("text-center");
  } else {
    $(`#${element}`).addClass("text-center");
  }

}
