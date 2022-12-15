// @ is an alias to /src
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import axios from 'axios';
import './axios'

import {
  
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,    
  MDBBadge, 
  MDBCol,
  MDBRow,
  MDBAccordion,
  MDBAccordionItem,
  MDBTable,

} from "mdb-vue-ui-kit";
import { ref } from 'vue';

export default {

  name: 'OfferItem',
  components: {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBBtn,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,    
    MDBBadge,        
    MDBCol,
    MDBRow,
    MDBAccordion,
    MDBAccordionItem,
    MDBTable,
   
  },  
  setup() {    
    const offerDropdownOptions = ref(false);   
    const activeItemApplication = ref('');    
    return {      
      offerDropdownOptions,
      activeItemApplication,      
    }
  },
  props: ["personalOffers"],  
  data() {
    return {  
      score: null,    
      jobApplicationsNumber: null,
      jobApplications: [],    
      acceptedJobApplications: [],                      
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted(){ 
    this.setOfferScore();  
    this.getPendingJobApplications();
    this.getAcceptedJobApplications();
    this.setAccordionColor();        
  },
  methods:{
    alter() {
      this.$emit("alterOfferItem");
    },
    remove() {
      this.$emit("removeOfferItem");
    },        
    async setOfferScore(){

      const url = "offers/oneOffer";     
      const payload = {   
        id: this.personalOffers.id,             
      };
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      await axios.post(url, payload, config).then((response) => {    

        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          const offerScore = response.data;
          let sumScore = offerScore.score;      
          if (sumScore > 0) {
            let averageScore = sumScore / offerScore.reportsNumber;
            this.score = averageScore.toFixed(2);
          } else {
            this.score = sumScore;
          }    
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
    },
    async getPendingJobApplications(){

      const url = "jobApplications/offerStatusJobApplications";     
      const payload = {   
        offerId: this.personalOffers.id,
        status: "Pendiente",             
      };
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      await axios.post(url, payload, config).then((response) => {    

        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          const applications = response.data;                                    
          this.jobApplicationsNumber = applications.length;            
          this.setJobApplications(applications);          
        }
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'No se pudo acceder a los recursos 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });   
    },
    async setJobApplications(applications){ 
      this.jobApplications = [];                          
      for (let index = 0; index < applications.length; index++) {
        await this.setRFC(applications, index)
      }     
    },
    async setRFC(applications, index){
      const url = "employees/oneEmployeeUser";
      const payload = {   
        id: applications[index].employeeId,             
      };      
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      await axios.post(url, payload, config).then((response) => {    
        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          const userFound = response.data;          
          applications[index].rfc = userFound.user.rfc;  
          this.jobApplications = applications;                   
        }
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'No se pudo acceder a los recursos 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });           

    },
    setAccordionColor() {
      var accordiosButtons = document.getElementsByClassName("accordion-button");            
      for (let index = 0; index < accordiosButtons.length; index++) {
        const element = accordiosButtons[index];
        element.style.backgroundColor = "#dfe7ed";   
        element.style.color = "#4F4F4F";
        element.style.fontSize = "medium";
        element.style.height = "30px"              
      }    
    },
    async acceptJobApplication(index, jobApplications) {            
          
      const url = "jobApplications/";
      const payload = {   
        id: jobApplications[index].id,
        changes: {
          status: "Aceptada"
        }     
      };    
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };  
      await axios.patch(url, payload, config).then((response) => {    
        const codeStatus = response.status;              
        if (codeStatus === 200) {       
          this.jobApplications = [];          
        }
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'No se pudo acceder a los recursos 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });            

      await this.getPendingJobApplications();
      await this.getAcceptedJobApplications();

    },
    async getAcceptedJobApplications(){

      const url = "jobApplications/offerStatusJobApplications";     
      const payload = {   
        offerId: this.personalOffers.id,
        status: "Aceptada",             
      };
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      await axios.post(url, payload, config).then((response) => {    

        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          const applications = response.data;                                                        
          this.setAcceptedJobApplications(applications);          
        }
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'No se pudo acceder a los recursos 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });  
    },
    async setAcceptedJobApplications(applications){ 
      this.acceptedJobApplications = [];                          
      for (let index = 0; index < applications.length; index++) {
        await this.setAceptedRFC(applications, index)
      }     
    },
    async setAceptedRFC(applications, index){
      const url = "employees/oneEmployeeUser";
      const payload = {   
        id: applications[index].employeeId,             
      };      
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      await axios.post(url, payload, config).then((response) => {    
        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          const userFound = response.data;          
          applications[index].rfc = userFound.user.rfc;  
          this.acceptedJobApplications = applications;                   
        }
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'No se pudo acceder a los recursos 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });           

    },
    async refuseJobApplication(index, jobApplications){
      const url = "jobApplications/";
      const payload = {   
        id: jobApplications[index].id,
        changes: {
          status: "Rechazada"
        }     
      };      
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      await axios.patch(url, payload, config).then((response) => {    
        const codeStatus = response.status;              
        if (codeStatus === 200) {       
          this.jobApplications = [];          
        }
      }).catch((error) => {        
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'No se pudo acceder a los recursos 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });           

      await this.getPendingJobApplications();
    }

  }
}

