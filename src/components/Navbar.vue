<template>


    <MDBNavbar expand="lg" light container class="shadow-1 ">
        <MDBNavbarBrand href="#">
            <img src="@/assets/logo.svg" alt="logo" class="logo" />
        </MDBNavbarBrand>
        <MDBNavbarToggler id="toggleNavbar" @click="collapse1 = !collapse1" target="#navbarSupportedContent"></MDBNavbarToggler>
        <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
            <MDBNavbarNav class="mb-2 mb-lg-0">

                <!-- Search form -->
                <MDBNavbarItem>
                    <form class="d-flex input-group w-auto">
                        <div class="d-flex align-items-center search-container">
                            <i class="fas fa-search search-icon"></i>
                            <input type="search" class="form-control search-input rounded-4"
                                placeholder="Explota Ofertas Laborales" aria-label="Search" />                        

                            <MDBDropdown v-model="dropdown1">

                                <a id="filterButton" class="m-2 filter-button" href="#" @click="dropdown1 = !dropdown1">
                                    <MDBIcon icon="filter" size="lg"></MDBIcon>
                                    <p class="filter-text ms-2">Filtros</p>
                                </a>

                                <MDBDropdownMenu id="dropDownFilter" aria-labelledby="dropdownMenuButton">
                                    <MDBDropdownItem href="#">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>



                        </div>

                    </form>
                </MDBNavbarItem>

            </MDBNavbarNav>


        </MDBCollapse>

        <MDBNavbarNav class="me-3 me-lg-0 d-flex flex-row navbar-notifications">

            <MDBNavbarItem to="#" class="me-3 me-lg-3" linkClass="link-secondary">

                <MDBDropdown v-model="dropdown2">

                    <a id="bellNotifications" href="#" @click="dropdown2 = !dropdown2">
                        <MDBIcon icon="bell" size="lg" class="filter-button"></MDBIcon>
                        <MDBBadge pill notification class="bg-danger">1</MDBBadge>
                    </a>

                    <MDBDropdownMenu id="dropDownBell" aria-labelledby="dropdownMenuButton" class="dropdownMenuButton-notifications">
                        <MDBDropdownItem href="#">Action</MDBDropdownItem>
                        <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
                        <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

            </MDBNavbarItem>            

            <MDBDropdown btnGroup v-model="dropdown13" class="shadow-0">
                <MDBDropdownToggle @click="dropdown13 = !dropdown13" class="dropdownMenuButton-user rounded-7 shadow-0">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg" class="rounded-circle me-3" height="30"
                    alt="" loading="lazy" />
                    @LinusTorvalds
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem href="#">Action</MDBDropdownItem>
                    <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
                    <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem href="#">Separated link</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>



        </MDBNavbarNav>
    </MDBNavbar>
</template>

<style scoped src="@/wwwroot/css/navbar.css"></style>
<script src="@/wwwroot/js/navbar.js"></script>