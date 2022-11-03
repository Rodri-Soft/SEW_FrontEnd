<template>

<MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>
    <MDBNavbarToggler
      @click="collapse1 = !collapse1"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem to="#" active>
          Home
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
          Link
        </MDBNavbarItem>
        <MDBNavbarItem>
          <!-- Navbar dropdown -->
          <MDBDropdown class="nav-item" v-model="dropdown1">
            <MDBDropdownToggle
              tag="a"
              class="nav-link"
              @click="dropdown1 = !dropdown1"
              >Dropdown</MDBDropdownToggle
            >
            <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
              <MDBDropdownItem href="#">Action</MDBDropdownItem>
              <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
              <MDBDropdownItem href="#"
                >Something else here</MDBDropdownItem
              >
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
        <MDBNavbarItem to="#" disabled>
          Disabled
        </MDBNavbarItem>
        
        <MDBNavbarItem to="#" disabled>
          <a href="">
            <MDBIcon icon="envelope" size="lg"></MDBIcon>
            <MDBBadge pill notification class="bg-danger">1</MDBBadge>
          </a>
        </MDBNavbarItem>

        <MDBNavbarItem to="#">
          <MDBDropdown v-model="dropdown2">
            <!-- <MDBDropdownToggle > -->
            <a href="#" @click="dropdown2 = !dropdown2">
              <MDBIcon icon="envelope" size="lg"></MDBIcon>
              <MDBBadge pill notification class="bg-danger">1</MDBBadge>
            </a>
            <!-- </MDBDropdownToggle> -->
            <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
              <MDBDropdownItem href="#">Action</MDBDropdownItem>
              <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
              <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
                
      </MDBNavbarNav>
      <!-- Search form -->

      
      <form class="d-flex input-group w-auto">
        
        <input
          type="search"
          class="form-control"
          placeholder="Type query"
          aria-label="Search"
        />
        <MDBBtn outline="primary">
          Search
        </MDBBtn>
      </form>
    </MDBCollapse>
  </MDBNavbar>

  <div class="hello">
    <MDBContainer>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 100vh"
      >
        <div class="text-center">
          <img
            class="mb-4"
            src="https://mdbootstrap.com/img/logo/mdb-transparent-250px.png"
            style="width: 250px; height: 90px"
          />
          <h5 class="mb-3">{{ msg }}</h5>
          <p class="mb-3">MDB Team</p>
          <p class="mt-5 mb-3">
            PS. We'll be releasing "How to build your first project with MDB 5
            Vue" tutorial soon. Make sure to join our newsletter not to miss it!
          </p>
          <a
            class="btn btn-primary btn-lg"
            href="https://mdbootstrap.com/newsletter/"
            target="_blank"
            role="button"
            >Join now</a
          >
        </div>
      </div>
    </MDBContainer>
  </div>
</template>

<script>
// import { MDBContainer } from "mdb-vue-ui-kit";
import { ref } from 'vue';
import {
  MDBContainer,
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
  MDBBadge,
  MDBIcon
} from 'mdb-vue-ui-kit';

export default {
  name: "HelloWorld",
  components: {
    MDBContainer,
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
    MDBBadge,
    MDBIcon
  },
  props: {
    msg: String
  },
  setup() {
    const collapse1 = ref(false);
    const dropdown1 = ref(false);
    const dropdown2 = ref(false);
    return {
      collapse1,
      dropdown1,
      dropdown2
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
