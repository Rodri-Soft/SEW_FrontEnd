<template>    
    
    <Navbar class="mb-4"/>

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3">
                <ProfileMainMenu/>
            </div>

            <div class="col-lg-6 p-0">

                <MDBCard text="center backgroundFont">
                    <MDBCardHeader class="headerFeed">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex justify-content-start mt-3">
                                <img src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg"
                                        class="img-fluid rounded-circle profileImageFeed" alt="Townhouses and Skyscrapers" />                                                                                                        
                                <div class="ms-2">                                                                
                                    <MDBCardText class="mb-1">José Daniel Camarillo Villa</MDBCardText>
                                    <MDBCardText class="text-muted d-flex justify-content-start">
                                        @CamarilloVilla
                                    </MDBCardText>
                                </div>                            
                            </div> 

                            <MDBDropdown v-model="dropdown2">
                                <a id="bellNotifications" href="#" @click="dropdown2 = !dropdown2">
                                    <MDBIcon icon="ellipsis-v" size="lg" class="filter-button"></MDBIcon>                                    
                                </a>

                                <MDBDropdownMenu id="dropDownBell" aria-labelledby="dropdownMenuButton" class="dropdownMenuButton-notifications">
                                    <MDBDropdownItem href="#">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>        
                        </div>
                                  
                    </MDBCardHeader>
                    <MDBCardBody>
                    <MDBCardTitle>Special title treatment</MDBCardTitle>
                    <MDBCardText>
                        With supporting text below as a natural lead-in to additional content.
                    </MDBCardText>
                    <MDBBtn tag="a" href="#!" color="primary">Go somewhere</MDBBtn>
                    </MDBCardBody>
                    <MDBCardFooter class="text-muted">2 days ago</MDBCardFooter>
                </MDBCard>

            </div>

            <div class="col-lg-3">
                <Category/>
            </div>
        </div>
    </div>    

    
</template>

<style scoped src="@/wwwroot/css/mainFeed.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/mainFeed.js"></script>