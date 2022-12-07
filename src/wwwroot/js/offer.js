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
    const category = ref('null');
    const modalAddOffer = ref(false);          

    return {      

      title,
      description,
      experience,
      workday,
      category,
      modalAddOffer,       

    };
  },
  data() {
    return {

      userObject: {
        photo: "https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg",
        full_name: "José Daniel Camarillo Villa",        
        followers: 300,
        amount_offers: 21,
        role: "recruiters",
      },      
      offerInformation: [],
      update: false,
      updatedOfferIndex: 0,
      emptyOffers: true,                               
    };
  },
  mounted(){ 
    this.fillOffers();
    this.adaptOfferButton();    
  },
  methods:{
    adaptOfferButton() {

      const windowSize = 975;  

      manageTextCenter(windowSize, "newOfferButton");        

      $(window).resize(function(){
                
        manageTextCenter(windowSize, "newOfferButton");          
        
      });     
    },    
    manageOfferForm(event) {

      event.target.classList.add('was-validated');    

      const numberOfErrors = this.validateFormOffer();            
      let messagePublish = document.getElementById('message-publish');
      let messageUpdate = document.getElementById('message-update');

      if (event.target.checkValidity() && numberOfErrors === 0) {     

        if (this.update) {
          this.updateOffer(messageUpdate);
        } else {
          this.publishOffer(messagePublish);
        }
               
        setTimeout(() => {          
          this.closeOfferModal();                               
          if (this.update) {
            messageUpdate.classList.remove('text-success');
          } else {
            messagePublish.classList.remove('text-success');            
          }
        }, 2000);        

      } else {
        this.removeFormText();
        const verifyFieldsMessage = 'Verifique los campos nuevamente 🤔';
        if (this.update) {
          messageUpdate.innerHTML = verifyFieldsMessage;
        } else {
          messagePublish.innerHTML = verifyFieldsMessage;          
        }
                
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
          id: 10,
          title: "Lorem ipsum 1",                              
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
          category: "Tecnología y telecomunicaciones",
          experience: "2-4 años",
          workday: "8 horas diarias",
          score: 3.5,
          jobAplicationsNumber: 24,          
        }
      );

      this.emptyOffers = this.offerInformation.length > 0 ? false : true;
      
    },
    alterOfferItem(i) {           
      
      this.update = true;
      let offer = this.offerInformation[i];          
      this.updatedOfferIndex = i;
      this.modalAddOffer = true;      
      this.title = offer.title;      
      this.description = offer.description;
      this.experience = offer.experience;
      this.workday = offer.workday; 
      this.category = offer.category
                              
    },
    removeOfferItem(i) {

      const offersRemove = this.offerInformation.filter((element, index) => index !== i);      
      this.offerInformation = offersRemove;

      this.emptyOffers = this.offerInformation.length > 0 ? false : true;

    },
    showOffer(i) {
      console.log("Índice de elemento en arreglo "+i);
      console.log("ID de offer "+this.offerInformation[i].id);      
    },
    closeOfferModal(){
      
      this.update = false;
      const messagePublish = document.getElementById('message-publish');
      messagePublish.innerHTML = '';
      this.modalAddOffer = false;      
      this.title = '';
      this.description = '';
      this.experience = '';
      this.workday = '';                             
      this.category = 'null';                             

    },  
    publishOffer(messagePublish) {
      
      messagePublish.innerHTML = 'Oferta publicada correctamente 😊';
      messagePublish.classList.add('text-success');
      const publishButton = document.getElementById('publish-offer-button');
      publishButton.setAttribute("disabled", "");

      const offersLenght = this.offerInformation.length;

      //Verificar que haya por lo menos un elemento
      const lastOffer = this.offerInformation[offersLenght - 1];
      
      this.offerInformation.push(
        {
          id: (lastOffer.id + 1),
          title: this.title,                              
          description: this.description,
          category: this.category,
          experience: this.experience,
          workday: this.workday,
          score: 0,
          jobAplicationsNumber: 0,          
        }
      );

      this.emptyOffers = this.offerInformation.length > 0 ? false : true;
    },
    updateOffer(messageUpdate) {
      
      messageUpdate.innerHTML = 'Oferta actualizada correctamente 😊';
      messageUpdate.classList.add('text-success');
      const updateButton = document.getElementById('update-offer-button');
      updateButton.setAttribute("disabled", "");
      
      let newOffer = this.offerInformation[this.updatedOfferIndex];
      newOffer.title = this.title;
      newOffer.description = this.description,
      newOffer.category = this.category,
      newOffer.experience = this.experience,
      newOffer.workday = this.workday,

      this.offerInformation[this.updatedOfferIndex] = newOffer;
               
    },
    consultOffer(i) {
      console.log(i);     
      // this.$router.push({ name: 'about', params: { title: 'test title' }});
      // this.$store.state.test = "Test title";
      this.$store.state.offer = this.offerInformation[i];
      this.$router.push('offerApplications');
      
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
