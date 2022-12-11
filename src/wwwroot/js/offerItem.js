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
  MDBAccordionItem

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
    MDBAccordionItem
   
  },  
  setup() {    
    const offerDropdownOptions = ref(false);   
    const activeItem = ref('collapseOne');
    return {      
      offerDropdownOptions,
      activeItem
    }
  },
  props: ["personalOffers"],  
  data() {
    return {  
      score: null,    
      jobApplicationsNumber: null                                  
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted(){ 
    this.setOfferScore();  
    this.setJobApplicationsNumber();
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
    async setJobApplicationsNumber(){

      const url = "jobApplications/offerJobApplications";     
      const payload = {   
        offerId: this.personalOffers.id,             
      };
      
      await axios.post(url, payload).then((response) => {    

        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          const applications = response.data;            
          this.jobApplicationsNumber = applications.length;  
        }
      }).catch((error) => {        
        alert('Algo salió mal, intenta más tarde 😞')
      });  
    }
  }
}

