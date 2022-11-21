<template>    

    <div>
        <div class="d-flex justify-content-lg-start justify-content-center">
            <MDBCard class="profileCard backgroundFont">
                <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/city/062.webp" alt="..." />
                <MDBCardBody class="text-center mb-3">
                    <img v-bind:src="userPhoto"
                        class="img-fluid rounded-circle profileImage" alt="Townhouses and Skyscrapers" />
                    <MDBCardTitle>{{user.full_name}}</MDBCardTitle>
                    <MDBCardText class="text-muted">
                        {{user.tag_name}}
                    </MDBCardText>
                </MDBCardBody>
                <MDBListGroup horizontal>
                    <MDBListGroupItem class="backgroundFont borderColorProfile text-center">
                        <p class="mt-3 mb-1">{{user.followers}}</p>
                        <p class="mb-2">Siguiendo</p>
                    </MDBListGroupItem>
                    <MDBListGroupItem class="backgroundFont borderColorProfile text-center">
                        <p class="mt-3 mb-1">{{user.amount_offers}}</p>
                        <p class="mb-2">Ofertas</p>
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBCard>
        </div>    

        <MDBRow>
            <MDBCol id="profileButton" col="12">                
                <MDBBtn class="mt-3 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
                    <i class="fas fa-user-alt me-2 fa-lg"></i>
                    Mi Perfil
                </MDBBtn>            
            </MDBCol>
            <MDBCol id="jobApplicationsButton" col="12">
                <MDBBtn v-show="userType == 'worker'" class="mt-2 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
                    <i class="fas fa-envelope me-2 fa-lg"></i>
                    Mis Solicitudes
                </MDBBtn>   
            </MDBCol>
            <MDBCol id="offersButton" col="12">
                <MDBBtn v-show="userType == 'recruiter'" class="mt-2 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
                    <i class="fas fa-briefcase me-2 fa-lg"></i>
                    Mis Ofertas
                </MDBBtn>   
            </MDBCol>
            <MDBCol id="groupsButton" col="12">
                <MDBBtn v-show="userType == 'recruiter'" class="mt-2 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
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