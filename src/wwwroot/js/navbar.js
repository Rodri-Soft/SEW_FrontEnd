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
    const dropdownBellNotifications = ref(false);
    const dropdown21 = ref(false);
    const dropdown13 = ref(false);      

    return {
      collapse1,
      dropdown1,
      dropdownBellNotifications,
      dropdown21,
      dropdown13,      
    }   
  },
  mounted(){   
    
    this.adaptDropDown("bellNotificationsButton", "dropDownBell", "1rem", "-9rem");
    this.adaptDropDown("filterButton", "dropDownFilter", "-9rem", "0");    

  },
  methods:{
            
    adaptDropDown(button, item, value, oldValue) {

      const windowSize = 992;      

      $( `#${button}` ).click(function() {
        
        if ($("#navbarSupportedContent").hasClass("show")) {          
          $(`#${item}`).css("margin-left", `${value}`);         
        }
                        
        let width = $(window).width();                     
        
        if (width >= windowSize) {                    
          $(`#${item}`).css("margin-left", `${oldValue}`);
        }       
          
      });
    }       
  }
}