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

  name: 'JobApplicationItem',
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
  props: ["employeeJobApplication"],  
  data() {
    return {  
      score: null,      
      status: this.employeeJobApplication.JobApplication.status,
      userPhoto: "https://images.unsplash.com/photo-1534351829608-2890b57a4ba8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=160&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTY3MDY0MDQ3MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=160",                                  
      recruiter: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    statusBackground() {
      let statusStyle = '';
      if (this.status === "Pendiente") {
        statusStyle = 'statusBackground-pending';
      } else if (this.status === "Aceptada") {
        statusStyle = 'statusBackground-accepted';
      } else {
        statusStyle = 'statusBackground-rejected';
      }

      return [statusStyle];
    },
    statusColor() {
      let statusStyle = '';
      if (this.status === "Pendiente") {
        statusStyle = 'statusColor-pending';
      } else if (this.status === "Aceptada") {
        statusStyle = 'statusColor-accepted';
      } else {
        statusStyle = 'statusColor-rejected';
      }

      return [statusStyle];
    }
  },
  mounted(){ 
    this.setOfferScore();     
    this.setRecruiter();
  },
  methods:{           
    async setOfferScore(){

      const url = "offers/oneOffer";     
      const payload = {   
        id: this.employeeJobApplication.id,             
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
    async setRecruiter() {

      const id = this.employeeJobApplication.recruiterId;
      const url = `recruiters/${id}`;
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.get(url, config).then((response) => {
        const codeStatus = response.status;
        if (codeStatus === 200) {
          this.recruiter = response.data.fullName;
        }
      }).catch((error) => {                
        const codeStatus = error.response.status;
        const messages = {          
          401: 'No autorizado 😡',
          404: 'Reclutador no disponible 😔',            
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      });
    }
  
  }
}

