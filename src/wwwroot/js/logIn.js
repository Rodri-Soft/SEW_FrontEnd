// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

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
  }
}
