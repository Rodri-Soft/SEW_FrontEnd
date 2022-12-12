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
    const activeItem = ref('');
    return {      
      offerDropdownOptions,
      activeItem
    }
  },
  props: ["personalOffers"],  
  data() {
    return {  
      score: null,    
      jobApplicationsNumber: null,
      jobApplications: [],                                  
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted(){ 
    this.setOfferScore();  
    this.getJobApplications();
    this.setAccordionColor();    
  },
  methods:{
    alter() {
      this.$emit("alterOfferItem");
    },
    remove() {
      this.$emit("removeOfferItem");
    },
    showOffer() {
      this.$emit("showOffer");
    },
    consultOffer() {
      this.$emit("consultOffer");
    },
    async setOfferScore(){

      const url = "offers/oneOffer";     
      const payload = {   
        id: this.personalOffers.id,             
      };
      
      await axios.post(url, payload).then((response) => {    

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
        alert('Algo salió mal, intenta más tarde 😞')
      });  
    },
    async getJobApplications(){

      const url = "jobApplications/offerJobApplications";     
      const payload = {   
        offerId: this.personalOffers.id,             
      };
      
      await axios.post(url, payload).then((response) => {    

        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          const applications = response.data;                                    
          this.jobApplicationsNumber = applications.length;            
          this.setJobApplications(applications);          
        }
      }).catch((error) => {      
        console.log(error);  
        alert('Algo salió mal, intenta más tarde 😞')
      });  
    },
    async setJobApplications(applications){                 
      for (let index = 0; index < applications.length; index++) {
        await this.setRFC(applications, index)
      }     
    },
    async setRFC(applications, index){
      const url = "employees/oneEmployeeUser";
      const payload = {   
        id: applications[index].employeeId,             
      };      
      await axios.post(url, payload).then((response) => {    
        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          const userFound = response.data;          
          applications[index].rfc = userFound.user.rfc;  
          this.jobApplications = applications;                   
        }
      }).catch((error) => {                  
        alert('Algo salió mal, intenta más tarde 😞')
      });          

    },
    setAccordionColor() {
      var accordiosButtons = document.getElementsByClassName("accordion-button");            
      for (let index = 0; index < accordiosButtons.length; index++) {
        const element = accordiosButtons[index];
        element.style.backgroundColor = "#dfe7ed";   
        element.style.color = "#4F4F4F";
        element.style.fontSize = "large";
        element.style.height = "50px"            
      }    
    },
    async acceptJobApplication(index, jobApplications) {
      
    }

  }
}

