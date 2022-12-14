<template>

    <MDBCard text="center backgroundFont mb-3">
        <MDBCardHeader>            
            <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-start mt-3">
                    <img v-bind:src="userPhoto"
                        class="img-fluid rounded-circle profileImageFeed" alt="Foto de perfil de reclutador" />
                    <div class="ms-2">
                        <MDBCardText class="recruiter-fullname mb-1">{{recruiter}}</MDBCardText>
                        <MDBCardText class="text-muted d-flex justify-content-start">
                            Reclutador
                        </MDBCardText>
                    </div>
                </div>                 
            </div>

            <div>                                
                <h3>{{employeeJobApplication.title}}</h3>               
            </div>
        </MDBCardHeader>

        <MDBCardBody>           
            <MDBRow class="row mt-1">
            
                <MDBCol class="mb-4" col="12" lg="6">
                    <h5 class="text-start">Descripción</h5>
                    <MDBCardText class="text-start">
                        {{employeeJobApplication.description}}
                    </MDBCardText>
                </MDBCol>

                <MDBCol class="mb-4" col="12" lg="6">
                    <h5 class="text-start">Categoría</h5>
                    <MDBCardText class="text-start">
                        {{employeeJobApplication.category}}
                    </MDBCardText>
                </MDBCol>

                <MDBCol class="mb-4" col="12" lg="6">
                    <h5 class="text-start">Experiencia</h5>
                    <MDBCardText class="text-start">
                        {{employeeJobApplication.experience}}
                    </MDBCardText>
                </MDBCol>

                <MDBCol class="mb-4" col="12" lg="6">
                    <h5 class="text-start">Jornada Laboral</h5>
                    <MDBCardText class="text-start">
                        {{employeeJobApplication.workday}}
                    </MDBCardText>
                </MDBCol>          
                
                <MDBCol :class="statusBackground" class="mt-3 mb-2 statusBackground-border" col="12">
                    <div :class="statusColor" class="mt-2 mb-2">
                        <h5 class="text-center">Estado</h5>
                        <MDBCardText class="text-center">
                            {{employeeJobApplication.JobApplication.status}}
                        </MDBCardText>
                    </div>                    
                </MDBCol>                        
            </MDBRow>
        </MDBCardBody>

        <MDBCardFooter>
            <div class="d-flex justify-content-start">                                
                <MDBBtn class="shadow-0" tag="a" color="warning" floating size="sm">
                    <i class="fas fa-star me-2"></i>
                </MDBBtn>
                <p class="fs-5 ms-1 fs-6">{{score}} Calificación</p>
            </div>                              
        </MDBCardFooter>
    </MDBCard>

</template>

<style scoped src="@/wwwroot/css/offerItem.css"></style>
<style scoped src="@/wwwroot/css/jobApplicationItem.css"></style>
<style scoped src="@/wwwroot/css/mainFeed.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/jobApplicationItem.js"></script>