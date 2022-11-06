// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery';

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand 

} from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,

    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand
  },
  setup() {
    const form2Email = ref("");
    const form2Password = ref("");
    const form2LoginCheck = ref(true);

    return {
      form2Email,
      form2Password,
      form2LoginCheck,
    };
  },
  mounted(){   
    this.setBackgroud();    
  },
  methods:{
        
    setBackgroud() {

      let width = $(window).width();
      const windowSize = 768;
      
      if (width < windowSize) {
        emptyBackgroundContainers();            
      }

      $(window).resize(function(){
                
        width = $(window).width();        

        if (width < windowSize) {
          emptyBackgroundContainers();   
        }

        if (width >= windowSize) {

          fillBackgroundContainers("left", "44146cda");
          fillBackgroundContainers("right", "7026e0cc");

        }

      });

    },
   
  }
}

function emptyBackgroundContainers() {  
  $("#background-left-container").empty();
  $("#background-right-container").empty();      
}

function fillBackgroundContainers(side, id){
    
  if($(`#background-${side}-container`).children().length == 0) {

    var background  = document.createElement("img");    
    background.src = `/img/loginBackground-${side}.${id}.svg`;
    background.className = "img-fluid";
    background.alt = `background-${side}`;

    var backgroundContainer = document.getElementById(`background-${side}-container`);
    backgroundContainer.appendChild(background);

  }


}



