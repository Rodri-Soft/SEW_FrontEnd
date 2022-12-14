<template>    

    <div>
        <div class="d-flex justify-content-lg-start justify-content-center">
            <MDBCard class="profileCard backgroundFont">
                <MDBCardImg top v-bind:src="userBackground" alt="Imagen de fondo" />
                <MDBCardBody class="text-center mb-3">
                    <img v-bind:src="userPhoto"
                        class="img-fluid rounded-circle profileImage" alt="Imagen de perfil" />
                    <MDBCardTitle v-if="user.role == 'Employee'">{{user.employee.fullName}}</MDBCardTitle>
                    <MDBCardTitle v-else>{{user.recruiter.fullName}}</MDBCardTitle>                    
                    <MDBCardText class="text-muted"                        
                        v-if="user.role == 'Employee'">
                        Trabajador
                    </MDBCardText>
                    <MDBCardText class="text-muted"                        
                        v-else>
                        Reclutador
                    </MDBCardText>
                </MDBCardBody>
                <MDBListGroup horizontal v-show="user.role == 'Recruiter'">
                    <MDBListGroupItem class="backgroundFont borderColorProfile text-center">
                        <p class="mt-3 mb-1">{{ followers }}</p>
                        <p class="mb-2">Siguiendo</p>
                    </MDBListGroupItem>
                    <MDBListGroupItem class="backgroundFont borderColorProfile text-center">
                        <p class="mt-3 mb-1">{{ amountOffers }}</p>
                        <p class="mb-2">Ofertas</p>
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBCard>
        </div>    

        <MDBRow>
            <MDBCol id="profileButton" col="12">      
                <router-link to="/profile">
                    <MDBBtn class="mt-3 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
                        <i class="fas fa-user-alt me-2 fa-lg"></i>
                        Mi Perfil
                    </MDBBtn>    
                </router-link>                                  
            </MDBCol>
            <MDBCol id="jobApplicationsButton" col="12">
                <MDBBtn @click="consultEmployeeJobApplications" v-show="user.role == 'Employee'" class="mt-2 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
                    <i class="fas fa-envelope me-2 fa-lg"></i>
                    Mis Solicitudes
                </MDBBtn>   
            </MDBCol>
            <MDBCol id="offersButton" col="12">
                <MDBBtn @click="consultRecruiterOffers" v-show="user.role == 'Recruiter'" class="mt-2 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
                    <i class="fas fa-briefcase me-2 fa-lg"></i>
                    Mis Ofertas
                </MDBBtn>   
            </MDBCol>
            <MDBCol id="groupsButton" col="12">
                <MDBBtn v-show="user.role == 'Recruiter'" class="mt-2 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
                    <i class="fas fa-users me-2 fa-lg"></i>
                    Mis Grupos
                </MDBBtn>   
            </MDBCol>
        </MDBRow>
    </div>

</template>

<style scoped src="@/wwwroot/css/profileMainMenu.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/profileMainMenu.js"></script>