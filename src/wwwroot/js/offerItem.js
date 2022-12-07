// @ is an alias to /src
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
    MDBRow
   
  },  
  setup() {    
    const offerDropdownOptions = ref(false);   
    return {      
      offerDropdownOptions,
    }
  },
  props: ["personalOffers"],  
  data() {
    return {                                        
    };
  },
  mounted(){ 
    
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
    }
  }
}

