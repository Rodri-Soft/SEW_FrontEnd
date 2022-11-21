<template>

    <MDBCard text="center backgroundFont mb-3">
        <MDBCardHeader class="headerFeed">
            <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-start mt-3">
                    <img v-bind:src="userPhoto"
                        class="img-fluid rounded-circle profileImageFeed" alt="Townhouses and Skyscrapers" />
                    <div class="ms-2">
                        <MDBCardText class="mb-1">{{offers.full_name}}</MDBCardText>
                        <MDBCardText class="text-muted d-flex justify-content-start">
                            {{offers.tag_name}}
                        </MDBCardText>
                    </div>
                </div>

                <MDBDropdown v-model="dropdownOptions">
                    <a id="ellipsisOptionsIcon" @click="dropdownOptions = !dropdownOptions">                        
                        <i class="fas fa-ellipsis-v ellipsisIcon fa-lg"></i>
                    </a>

                    <MDBDropdownMenu id="dropDownEllipsis" aria-labelledby="dropdownMenuButtonEllipsis"
                        class="dropdownMenuButton-ellipsis">
                        <MDBDropdownItem href="#">Action</MDBDropdownItem>
                        <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
                        <MDBDropdownItem href="#">Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>                
            </div>

            <div>                
                <h3>{{offers.title}}</h3>
            </div>

        </MDBCardHeader>

        <MDBCardBody>
            <MDBCardText class="text-start">
                {{offers.description}}
            </MDBCardText>
        </MDBCardBody>

        <MDBCardFooter>

            <div class="d-flex justify-content-start">
                <MDBBtn class="shadow-0" tag="a" color="primary" floating size="sm">
                    <i class="fas fa-bookmark me-2"></i>
                </MDBBtn>
                <MDBBtn class="shadow-0" tag="a" color="danger actionIcon" floating size="sm">
                    <i class="fas fa-heart me-2"></i>
                </MDBBtn>
                <MDBBtn class="shadow-0" tag="a" color="warning actionIcon" floating size="sm">
                    <i class="fas fa-star me-2"></i>
                </MDBBtn>
                <p class="fs-5 ms-1">{{offers.score}}</p>
            </div>            

            <MDBRow class="row mt-3 mb-2">
                <MDBCol col="12" sm="6" md="3" lg="6" xl="3">
                    <div class="d-flex justify-content-sm-center justify-content-md-between
                                justify-content-lg-center justify-content-xl-between mt-3 mb-2">
                        <MDBBtn color="light" class="shadow-0 reactionButton" rounded tag="a" href="#!">
                            <i class="fas fa-heart me-2"></i>Solicitar
                        </MDBBtn>                       
                    </div>
                </MDBCol>
                <MDBCol col="12" sm="6" md="3" lg="6" xl="3">
                    <div class="d-flex justify-content-sm-center justify-content-md-between
                                justify-content-lg-center justify-content-xl-between mt-3 mb-2">
                        <MDBBtn color="light" class="shadow-0 reactionButton" rounded tag="a" href="#!">
                            <i class="fas fa-bookmark me-2"></i>Guardar
                        </MDBBtn>                  
                    </div>
                </MDBCol>                
                <MDBCol col="12" sm="6" md="3" lg="6" xl="3">
                    <div class="d-flex justify-content-sm-center justify-content-md-between
                                justify-content-lg-center justify-content-xl-between mt-3 mb-2">
                        <MDBBtn color="light" class="shadow-0 reactionButton" rounded tag="a" href="#!">
                            <i class="fas fa-star me-2"></i>Calificar
                        </MDBBtn>                  
                    </div>
                </MDBCol>                
                <MDBCol col="12" sm="6" md="3" lg="6" xl="3">
                    <div class="d-flex justify-content-sm-center justify-content-md-between
                                justify-content-lg-center justify-content-xl-between mt-3 mb-2">
                        <MDBBtn color="light" class="shadow-0 reactionButton" rounded tag="a" href="#!">
                            <i class="fas fa-flag me-2"></i>Reportar
                        </MDBBtn>                 
                    </div>
                </MDBCol>                
            </MDBRow>           
        </MDBCardFooter>
    </MDBCard>

</template>

<style scoped src="@/wwwroot/css/mainFeed.css">

</style>
<style scoped src="@/wwwroot/css/sharedStyles.css">

</style>
<script src="@/wwwroot/js/mainFeed.js"></script>