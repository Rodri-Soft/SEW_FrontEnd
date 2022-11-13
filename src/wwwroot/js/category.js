// @ is an alias to /src
import CategoryItem from '@/components/CategoryItem.vue'

import {
    MDBBtn,  
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImg,
    MDBCardGroup,
    MDBCardGroupItem,
    MDBListGroupItem,
    MDBListGroup 

} from "mdb-vue-ui-kit";

export default {

  name: 'Category',
  components: {
    CategoryItem,

    MDBBtn,  
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImg,
    MDBCardGroup,
    MDBCardGroupItem,
    MDBListGroupItem,
    MDBListGroup
  },
  data() {
    return {            
      categoryInformation: [{
          title: "#Tecnología e Informática"
        },
        {
          title: "#Ingeniería y Producción"
        },
        {
          title: "#Compras y Lógistica"
        },
        {
          title: "#Digital"
        }  

      ]     

      // categoryInformation: [] 
    };
  },
  mounted(){   
    
    // this.fillCateogories();
    
  },
  methods:{
            
    fillCateogories() {      
      let categoriesArray = [];
      for (let i = 0; i < 4; i++) {
        
        let categoriesObject = {};
        let text = "Item ";
        categoriesObject.title = text+(i+1);        
        categoriesArray[i] = categoriesObject;
        
      }
      
      this.categoryInformation = categoriesArray;      
    }
       
  }
}

