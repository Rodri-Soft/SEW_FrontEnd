import { ref } from 'vue';
import axios from 'axios';
import { mapGetters } from 'vuex';
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBBtn,  
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImg,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTable,  
  MDBTextarea
} from "mdb-vue-ui-kit";

export default {
  name: 'CVItemForm',
  components: {
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImg,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBTable,
    MDBTextarea,
  },
  computed: {
    ...mapGetters(['user']),
  },
  props: {
    supportInformation:  {
      type: String  
    },
    tableTitle: {
      type: String
    },
    inputId: {
      type: String
    },
    elementName: {
      type: String
    },
    elementMax: {
      type: String
    },
    isButtonPreviusVisible: {
      type: Boolean
    },
    isTableVisible: {
      type: Boolean
    },
    isRegister: {
      type: Boolean
    }
  },
  data() {
    return {
      elements: [], 
      labelName: this.elementName,
      inputMax: Number(this.elementMax),
      inputName: this.inputId,
    };
  },
  setup() {
    const input = ref('');
    const description = ref('');

    return {
      input,
      description,
    }
  },
  mounted() {

  },
  methods: {
    checkInput() {
      let isValid = true;
      const inputElement = document.getElementById(this.inputId);
      const inputElementValue = inputElement.value;

      if (inputElementValue.trim().length === 0) {
        isValid = false;
        inputElement.classList.add('is-invalid');
      } else {
        inputElement.classList.remove('is-invalid');
        inputElement.value = '';        
      }

      return {
        isValid,
        inputElementValue,
      };
    },
    addRow() {
      const checkInput = this.checkInput();
      const isValid = checkInput.isValid;
      const inputElementValue = checkInput.inputElementValue;

      if (isValid) {
        this.elements.push(inputElementValue);
      }
    },
    deleteRow(index) {      
      this.elements.splice(index, 1);
    },
    previousStage() {
      this.$emit('previous-stage');
    },
    nextStage() {
      this.$emit('next-stage', this.elements);
    },
    registerCV() {
      const checkInput = this.checkInput();
      const isValid = checkInput.isValid;
      const inputElementValue = checkInput.inputElementValue;

      if (isValid) {
        this.$emit('register-cv', inputElementValue);
      }
    },
    fillTable(newElements) {
      this.elements = newElements;
    },
    fillDescription(newDescription) {
      this.description = newDescription;
    }
  },
}