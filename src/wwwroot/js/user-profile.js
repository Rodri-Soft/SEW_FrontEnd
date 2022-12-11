import Navbar from '@/components/Navbar.vue'
import axios from 'axios';
import './axios'
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';
import { ref } from 'vue';
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBBtn,  
  MDBInput,
  MDBTextarea,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImg,MDBModal,
  MDBModalBody,
  MDBModalTitle,
  MDBSpinner,
  MDBBadge
} from "mdb-vue-ui-kit";

export default {
  name: "UserProfileView",
  components: {
    Navbar,
    MDBIcon,
    MDBInput,
    MDBTextarea,
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
    MDBModalBody,
    MDBModalTitle,
    MDBSpinner,
    MDBBadge
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      isEmployee: false,
      fullName: '',
      email: '',
      phone: '',
      role: '',
      followers: '',
      cv: undefined,
      groups: [],
      recruiterId: '',
      isFollower: false,
      rfc: false,
      charge: ''
    };
  },
  setup() {
    const modalUserInformation = ref(false);

    return {
      modalUserInformation,
    }
  },
  mounted() {
    this.getUserRfc();
  },
  methods: {
    async getUserRfc() {
      let user = undefined;
      const userRfc = this.$route.params.rfc;

      const urlProfile = `profile/user/${userRfc}`;
      const token = Cookies.get('access_token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };

      axios.get(urlProfile, config).then((response) => {
        user = response.data;
        this.showUserProfile(user);

      }).catch((error) => {
        console.log(error);
      });   
    },
    showUserProfile(user) {
      if (user.role === "Employee") {  
        this.isEmployee = true;
        this.fullName = user.employee.fullName;        
        this.phone = user.employee.phone;
        this.cv = user.employee.cv;
      } else {
        this.isEmployee = false;
        this.fullName = user.recruiter.fullName;
        this.phone = user.recruiter.phone;
        this.followers = user.recruiter.followers;
        this.groups = user.recruiter.groups;
        this.recruiterId = user.recruiter.id;
        this.charge = '/ ' + user.recruiter.charge;
        this.searchFollower();
      }

      this.rfc = user.rfc;
      this.email = user.email;
      this.role = user.role === "Employee" ? 
        "Empleado" : "Reclutador";      
    },
    searchFollower() {
      this.isFollower = false;

      this.followers.forEach(follower => {
        if (follower.userId === this.user.id) {
          this.isFollower = true
        } 
      });
    },
    async followUser() {
      const url = 'recruiters/followers'
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const payload = {
        recruiterId: this.recruiterId,
        userId: this.user.id 
      }

      await axios.post(url, payload, config).then((response) => {
        const codeStatus = response.status;

        if (codeStatus === 201) {
          this.$router.go();
        }
      }).catch((error) => {
        alert('Algo ha salido mal, intenta más tarde 😔');
      });
    },
    async unfollowUser() {
      const token = Cookies.get('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const follower = {
        recruiterId: this.recruiterId,
        userId: this.user.id 
      }
    
      let followerId = undefined;

      this.followers.forEach(follower => {
        if (follower.userId === this.user.id 
          && follower.recruiterId === this.recruiterId) {            
          followerId = follower.id;
        }
      });

      const url = `recruiters/followers/${followerId}`;

      await axios.delete(url, config).then((response) => {
        const codeStatus = response.status;

        if (codeStatus === 204) {
          this.$router.go();
        }
      }).catch((error) => {
        alert('Algo ha salido mal, intenta más tarde 😔');
      });
    }
  }
};