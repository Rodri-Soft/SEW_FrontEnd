import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import Category from '@/components/Category.vue'
import JobApplicationItem from '@/components/JobApplicationItem.vue'
import Footer from '@/components/Footer.vue'
import $ from 'jquery';
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
    MDBRow

} from "mdb-vue-ui-kit";
import { ref } from 'vue';
import { setTimeout } from 'core-js';

export default {

    name: 'JobApplication',
    components: {
        Navbar,
        ProfileMainMenu,
        Category,
        Footer,
        JobApplicationItem,
        
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
    computed: {
        ...mapGetters(["user"]),      
    },
    data() {
        return {
            jobApplications: [],
            emptyJobApplications: true,        
        }
    },
    mounted() {
        this.fillJobApplications();
    },
    methods:{
        async fillJobApplications() {
            const url = "jobApplications/getOneEmployee";
            const payload = {         
                id: this.user.employee.id,
            };
            const token = Cookies.get('access_token');      
            const config = {
              headers: { 'Authorization': `Bearer ${token}` }
            };
            await axios.post(url, payload, config).then((response) => {                            
                this.jobApplications = response.data.offers;           
            }).catch((error) => {        
                const codeStatus = error.response.status;
                const messages = {          
                401: 'No autorizado 😡',
                404: 'No fue posible encontrar la información 😔',      
                400: 'Algo salió mal, intenta más tarde 😔',      
                500: 'Algo salió mal, intenta más tarde 😔'
                }
                alert(messages[codeStatus]);
            });    
            this.emptyJobApplications = this.jobApplications.length > 0 ? false : true;
        },
    }

}