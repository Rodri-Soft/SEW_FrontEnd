// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Category from '@/components/Category.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import $ from 'jquery';
import axios from 'axios';
import './axios';
import Cookies from 'js-cookie';
import { mapGetters } from "vuex";

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
  MDBRow
 
} from "mdb-vue-ui-kit";
import { ref } from 'vue';
import { setTimeout } from 'core-js';

export default {

  name: 'MainFeed',
  components: {
    Navbar,
    ProfileMainMenu,
    Category,
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
    MDBRow
   
  },  
  setup() {    
    const dropdownOptions = ref(false);   
    const dropdownScore = ref(false);

    return {      
      dropdownOptions,
      dropdownScore,
    }
  },
  props: ["offers"],
  computed: {
    ...mapGetters(["user"]),
    styles() {
      return this.process ? ['disabled'] :  [''];
    },
  },
  data() {
    return {
      userPhoto: "https://images.unsplash.com/photo-1534351829608-2890b57a4ba8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=160&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTY3MDY0MDQ3MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=160",      
      score: null,
      hasScore: false,      
      localScore: null,
      color: "light",      
      process: false
    }
  },
  mounted(){           
    this.setOfferScore();   
    if (this.user.role === 'Employee') {
      this.setOfferApplied();
    }     
  },
  methods:{
        
    async setRecruiterPhoto(){

      const profileRecruiterImageUrl = 'https://source.unsplash.com/random/160x160/?person';      
      await axios.get(profileRecruiterImageUrl).then((response) => {
        const profileImage = response.request.responseURL;
        this.userPhoto = profileImage;
      });
    },
    async setOfferScore(){

      const url = "offers/oneOffer";     
      const payload = {   
        id: this.offers.id,             
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
          404: 'No se pudo acceder a los recursos 😔',      
          400: 'Algo salió mal, intenta más tarde 😔',      
          500: 'Algo salió mal, intenta más tarde 😔'
        }
        alert(messages[codeStatus]);
      }); 
    },      
    async setOfferApplied(){

      const url = "jobApplications/oneJobApplicationEmployee";     
      const payload = {              
        employeeId: this.user.employee.id,
        offerId: this.offers.id   
      };          
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      await axios.post(url, payload, config).then((response) => {    
        if (response.data != null) {
          this.color = "danger";   
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
      }); ;  
    },    
    setScoreReaction(length, color){

      if (!this.hasScore){
        for (let index = 1; index <= length; index++) {
          let id = `label-rate-${index}`;
          let element = document.getElementById(id);
          element.style.color = color;
        }
      }           
    },
    async qualifyOffer(score){      

      if (this.hasScore) {

        for (let index = 1; index <= 5; index++) {
          let id = `label-rate-${index}`;
          let element = document.getElementById(id);
          element.style.color = "#444";
        }

        for (let index = 1; index <= score; index++) {
          let id = `label-rate-${index}`;
          let element = document.getElementById(id);
          element.style.color = "#eeca06";
        }
      }

      const urlOffer = "offers/oneOffer";     
      const payloadOffer = {   
        id: this.offers.id,             
      };
      const token = Cookies.get('access_token');      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      let offerScore;
      
      await axios.post(urlOffer, payloadOffer, config).then((response) => {    

        const codeStatus = response.status;              
        if (codeStatus === 200) {          
          offerScore = response.data;         
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

            
      const url = "offers/";
      let newScore = offerScore.score + score;
      let newReportNumber = offerScore.reportsNumber + 1;
      const payload = {   
        id: this.offers.id,      
        changes: {
          score: newScore,
          reportsNumber: newReportNumber,
        }
      };
      
      await axios.patch(url, payload, config).then((response) => {        
        
        const codeStatus = response.status;              
        if (codeStatus === 200) {
          this.hasScore = true;
          this.setOfferScore();
          this.setScoreReaction(score, "#eeca06");
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
    showScoreDrop() {
      
      this.dropdownScore = !this.dropdownScore;    
      
      let dropdownScoreState = document.getElementById("dropDownScore").getAttribute("aria-expanded");;
      if (!dropdownScoreState) {
        this.hasScore = false;
      }
    },    
    async applyToJobApplication(){
                   
      this.process = true;

      if (this.color === "light") {
        
        const url = "jobApplications/createJobApplication";     
        const payload = {   
          status: "Pendiente",
          employeeId: this.user.employee.id,
          offerId: this.offers.id                
        };
        const token = Cookies.get('access_token');      
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };
  
        await axios.post(url, payload, config).then((response) => {    
  
          const codeStatus = response.status;              
          if (codeStatus === 201) {          
            this.color = "danger";  
            this.process = false;
          }
        }).catch((error) => {       
          this.process = false;           
          const codeStatus = error.response.status;
          const messages = {          
            401: 'No autorizado 😡',
            404: 'Esta oferta ya no se encuentra disponible 😔',
            409: 'Recurso duplicado',
            500: 'Algo salió mal, intenta más tarde 😔'
          }
          alert(messages[codeStatus]);
        });  
      } else {
              
        const url = `jobApplications/deleteJobApplication/${this.user.employee.id}&${this.offers.id}`;    
        const token = Cookies.get('access_token');      
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };                       
        await axios.delete(url, config).then((response) => {    
                 
          const codeStatus = response.status;          
          if (codeStatus === 204) {
            this.process = false;
            this.color = "light";  
          }                    
        }).catch((error) => {   
          this.process = false;                         
          const codeStatus = error.response.status;
          const messages = {          
            401: 'No autorizado 😡',
            404: 'Esta oferta ya no se encuentra disponible 😔',            
            500: 'Algo salió mal, intenta más tarde 😔'
          }
          alert(messages[codeStatus]);
        }); 
      }        
    }  
  }
}

