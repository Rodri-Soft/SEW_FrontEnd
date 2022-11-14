import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery';
import {
  MDBBtn,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,    
  MDBBadge,


} from 'mdb-vue-ui-kit';
import { ref } from 'vue';

export default {
  name: 'Navbar',
  components: {
    HelloWorld,

    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,
    MDBBadge,
  },
  setup() {
    const collapse1 = ref(false);
    const dropdown1 = ref(false); 
    const dropdown2 = ref(false);
    const dropdown21 = ref(false);
    const dropdown13 = ref(false);


    return {
      collapse1,
      dropdown1,
      dropdown2,
      dropdown21,
      dropdown13
    }   
  },
  mounted(){   
    
    this.adaptDropDown("bellNotifications", "dropDownBell", "1rem");
    this.adaptDropDown("filterButton", "dropDownFilter", "-9rem");
    

  },
  methods:{
            
    adaptDropDown(button, item, value) {

      $( `#${button}` ).click(function() {
        
        if ($("#navbarSupportedContent").hasClass("show")) {          
          $(`#${item}`).css("margin-left", `${value}`);         
        }                
      });
    }
       
  }
}