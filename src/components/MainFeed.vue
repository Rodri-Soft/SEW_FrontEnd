<template>

    <MDBCard text="center backgroundFont mb-3">
        <MDBCardHeader class="headerFeed">
            <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-start mt-3">
                    <img v-bind:src="userPhoto"
                        class="img-fluid rounded-circle profileImageFeed" alt="Foto de perfil de reclutador" />
                    <div class="ms-2">
                        <MDBCardText class="recruiter-fullname mb-1">{{offers.recruiter.fullName}}</MDBCardText>
                        <MDBCardText class="text-muted d-flex justify-content-start">
                            Reclutador
                        </MDBCardText>
                    </div>
                </div>

                <MDBDropdown v-model="dropdownOptions">
                    <a id="ellipsisOptionsIcon" @click="dropdownOptions = !dropdownOptions">                        
                        <i class="fas fa-ellipsis-v ellipsisIcon fa-lg"></i>
                    </a>

                    <MDBDropdownMenu id="dropDownEllipsis" aria-labelledby="dropdownMenuButtonEllipsis"
                        class="dropdownMenuButton-ellipsis">
                        <MDBDropdownItem tag="button">Action</MDBDropdownItem>
                        <MDBDropdownItem tag="button">Another Action</MDBDropdownItem>
                        <MDBDropdownItem tag="button">Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>                
            </div>

            <div>                
                <h3>{{offers.title}}</h3>
            </div>

        </MDBCardHeader>

        <MDBCardBody>
            
            <h5 class="text-start">Descripción</h5>
            <MDBCardText class="text-start">
                {{offers.description}}
            </MDBCardText>

            <h5 class="text-start">Categoría</h5>
            <MDBCardText class="text-start">
                {{offers.category}}
            </MDBCardText>

            <h5 class="text-start">Experiencia</h5>
            <MDBCardText class="text-start">
                {{offers.experience}}
            </MDBCardText>

            <h5 class="text-start">Jornada Laboral</h5>
            <MDBCardText class="text-start">
                {{offers.workday}}
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
                <p class="fs-5 ms-1">{{ score }}</p>
            </div>            

            <MDBRow class="row mt-3 mb-2" v-show="user.role == 'Employee'">
                <MDBCol col="12" sm="6" md="3" lg="6" xl="3">
                    <div class="d-flex justify-content-sm-center justify-content-md-between
                                justify-content-lg-center justify-content-xl-between mt-3 mb-2">
                        <MDBBtn @click="applyToJobApplication" v-bind:color="color" class="shadow-0 reactionButton icon-jobapplication" rounded tag="a" href="#!">
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
                                justify-content-lg-center justify-content-xl-between mt-3 mb-2 button-dropdown">                                                    
                        <MDBDropdown id="dropDownScore" btnGroup v-model="dropdownScore">
                            <MDBDropdownToggle color="light" @click="showScoreDrop" class="reactionButton rounded-7">
                                <i class="fas fa-star me-2"></i>Calificar
                            </MDBDropdownToggle>
                            <MDBDropdownMenu class="score-menu">
                                <MDBDropdownItem>
                                    <div class="star-widget">
                                        <input type="radio" name="rate" id="rate-1">
                                        <label @mouseover="setScoreReaction(1, '#eeca06')" @mouseleave="setScoreReaction(1, '#444')" id="label-rate-1"                                           
                                               @click="qualifyOffer(1)" for="rate-1" class="fas fa-star star-label"></label>                                               

                                        <input type="radio" name="rate" id="rate-2">
                                        <label @mouseover="setScoreReaction(2, '#eeca06')" @mouseleave="setScoreReaction(2, '#444')" id="label-rate-2"
                                               @click="qualifyOffer(2)" for="rate-2" class="fas fa-star star-label"></label>
                                            
                                        <input type="radio" name="rate" id="rate-3">
                                        <label @mouseover="setScoreReaction(3, '#eeca06')" @mouseleave="setScoreReaction(3, '#444')" id="label-rate-3"
                                               @click="qualifyOffer(3)" for="rate-3" class="fas fa-star star-label"></label>
                                                
                                        <input type="radio" name="rate" id="rate-4">
                                        <label @mouseover="setScoreReaction(4, '#eeca06')" @mouseleave="setScoreReaction(4, '#444')" id="label-rate-4"
                                               @click="qualifyOffer(4)" for="rate-4" class="fas fa-star star-label"></label>
                                                
                                        <input type="radio" name="rate" id="rate-5">
                                        <label @mouseover="setScoreReaction(5, '#eeca06')" @mouseleave="setScoreReaction(5, '#444')" id="label-rate-5"
                                               @click="qualifyOffer(5)" for="rate-5" class="fas fa-star star-label"></label>                                            
                                    </div>
                                </MDBDropdownItem>                                
                            </MDBDropdownMenu>
                        </MDBDropdown>
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

<style scoped src="@/wwwroot/css/mainFeed.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/mainFeed.js"></script>