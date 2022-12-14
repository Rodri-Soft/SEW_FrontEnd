import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import Category from '@/components/Category.vue'
import OfferItem from '@/components/OfferItem.vue'
import Footer from '@/components/Footer.vue'
import $ from 'jquery';
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import axios from 'axios';
import './axios'
import { ref } from "vue";

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
    Footer,
    
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
      offerInformation: [],
      update: false,
      updatedOfferIndex: 0,
      emptyOffers: true,                               
    };
  },
  computed: {
    ...mapGetters(["user"]),
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
    async fillOffers() {
      
      const url = "offers/";
      const payload = {         
        recruiterId: this.user.recruiter.id,
      };
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      await axios.post(url, payload, config).then((response) => {
        const offers = response.data;                
        this.offerInformation = offers;           
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'Esta oferta ya no se encuentra disponible 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });    

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
    async removeOfferItem(i) {      
      
      // const url = "offers/deleteOffer";           
      const url = `offers/deleteOffer/${this.offerInformation[i].id}`;           
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };                
      // await axios.delete(url, {
      //   data: {         
      //     id: this.offerInformation[i].id,
      //   }
      // }).then((response) => {    
                
      //   const codeStatus = response.status;          
      //   if (codeStatus === 204) {
      //     const offersRemove = this.offerInformation.filter((element, index) => index !== i);      
      //     this.offerInformation = offersRemove;
      //   }                    
      // }).catch((error) => {   
                                
      //   const codeStatus = error.response.status;
      //   const messages = {          
      //     401: 'No autorizado 😡',
      //     404: 'Esta oferta ya no se encuentra disponible 😔',      
      //     400: 'Algo salió mal, intenta más tarde 😔',      
      //     500: 'Algo salió mal, intenta más tarde 😔'
      //   }
      //   alert(messages[codeStatus]);
      // });  

      await axios.delete(url, config).then((response) => {    
                
        const codeStatus = response.status;          
        if (codeStatus === 204) {
          const offersRemove = this.offerInformation.filter((element, index) => index !== i);      
          this.offerInformation = offersRemove;
        }                    
      }).catch((error) => {   
                                
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'Esta oferta ya no se encuentra disponible 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });  


      this.emptyOffers = this.offerInformation.length > 0 ? false : true;

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
    async publishOffer(messagePublish) {
      
      const url = "offers/createOffer";      
      const newOffer = {       
        title: this.title,
        workday: this.workday,
        description: this.description,
        experience: this.experience,
        category: this.category,
        status: "Pendiente",
        score: 0,
        reportsNumber: 0,
        recruiterId: this.user.recruiter.id
      } 
      const payload = {        
        offerData: newOffer
      }
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
          
      await axios.post(url, payload, config).then((response) => {
        const codeStatus = response.status;        
        if (codeStatus === 201) {

          const newOffer = response.data;
          this.offerInformation.push(newOffer);

          messagePublish.innerHTML = 'Oferta publicada correctamente 😊';
          messagePublish.classList.add('text-success');
          const publishButton = document.getElementById('publish-offer-button');
          publishButton.setAttribute("disabled", "");                    

        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          400: 'Verifique los campos nuevamente 🤔',
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        messagePublish.innerHTML = messages[codeStatus];
      });      

      this.emptyOffers = this.offerInformation.length > 0 ? false : true;
    },
    async updateOffer(messageUpdate) {

      const url = "offers/";      
      const updatedOffer = {
        title: this.title,
        category: this.category,
        workday: this.workday,
        description: this.description,
        experience: this.experience
      } 
      const payload = {
        id:  this.offerInformation[this.updatedOfferIndex].id,
        changes: updatedOffer
      }
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
          
      await axios.patch(url, payload, config).then((data) => {
        const codeStatus = data.status;        
        if (codeStatus === 200) {

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

        }
      }).catch((error) => {
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          400: 'Verifique los campos nuevamente 🤔',
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        messageUpdate.innerHTML = messages[codeStatus];
      });      
    },    
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
