import $ from 'jquery';
import Cookies from "js-cookie";
import { ref } from "vue";
import { mapGetters } from "vuex";
import {
  MDBInput,
  MDBCol,
  MDBRow,
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

export default {
  name: 'Navbar',
  components: {
    MDBInput,
    MDBCol,
    MDBRow,
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
  computed: {
    ...mapGetters(["user"]),
  },
  props: ["homeNavbar"],  
  data() {
    return {
      profileImage: '',      
    }
  },
  setup() {
    const collapse = ref(false);
    const dropdownFilter = ref(false); 
    const dropdownBellNotifications = ref(false);
    const dropdownProfile = ref(false);      

    return {
      collapse,
      dropdownFilter,
      dropdownBellNotifications,
      dropdownProfile,      
    }   
  },
  mounted(){   
    this.showInputSearchShadow();  
    this.setUserImages();
    this.adaptDropDown("bellNotificationsButton", "dropDownBell", "1rem", "-9rem");
    this.adaptDropDown("filterButton", "dropDownFilter", "-9rem", "0");  
  },
  methods:{ 
    adaptDropDown(button, item, value, oldValue) {
      const windowSize = 992;      

      $(`#${ button }`).click(function() {
        
        if ($("#navbarSupportedContent").hasClass("show")) {          
          $(`#${item}`).css("margin-left", `${value}`);         
        }
                        
        let width = $(window).width();                     
        
        if (width >= windowSize) {                    
          $(`#${item}`).css("margin-left", `${oldValue}`);
        }                 
      });
    },
    showInputSearchShadow() {
      const inputSearch = document.getElementById("input-search");

      inputSearch.addEventListener("focus", function() {
        inputSearch.classList.add("shadow");        
        inputSearch.style.backgroundColor = "#fff";
      });

      inputSearch.addEventListener("blur", function() {
        inputSearch.classList.remove("shadow");
        inputSearch.style.backgroundColor = "#f5f5f5";      
      })
    },
    setUserImages() {
      setInterval(() => {
        this.profileImage = Cookies.get('profile_image_url');
        // this.backgroundImage = Cookies.get('background_image_url');            
      }, 100);
    },
    goHome() {
      this.$emit("goHome");
    },      
    searchOffer() {            
      this.$emit("searchOffer", document.getElementById("input-search").value);
    }
  }
}