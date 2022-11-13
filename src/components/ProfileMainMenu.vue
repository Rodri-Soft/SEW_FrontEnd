<template>    

    <div>
        <div class="d-flex justify-content-lg-start justify-content-center">
            <MDBCard class="profileCard backgroundFont">
                <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/city/062.webp" alt="..." />
                <MDBCardBody class="text-center mb-3">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg"
                        class="img-fluid rounded-circle profileImage" alt="Townhouses and Skyscrapers" />
                    <MDBCardTitle>José Daniel Camarillo Villa</MDBCardTitle>
                    <MDBCardText class="text-muted">
                        @CamarilloVilla
                    </MDBCardText>
                </MDBCardBody>
                <MDBListGroup horizontal>
                    <MDBListGroupItem class="backgroundFont borderColorProfile text-center">
                        <p class="mt-3 mb-1">1991</p>
                        <p class="mb-2">Siguiendo</p>
                    </MDBListGroupItem>
                    <MDBListGroupItem class="backgroundFont borderColorProfile text-center">
                        <p class="mt-3 mb-1">21</p>
                        <p class="mb-2">Ofertas</p>
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBCard>
        </div>

        <div class="d-flex justify-content-lg-start justify-content-center">
            <MDBBtn color="primary mt-3 mb-3 shadow-0 backgroundFont profileCard">Mi Perfil</MDBBtn>
        </div>
    </div>

</template>

<style scoped src="@/wwwroot/css/profileMainMenu.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/profileMainMenu.js"></script>