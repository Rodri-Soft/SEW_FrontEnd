<template>
  <MDBRow class="m-0 mb-2 ">
    <MDBCard shadow="0">
      <img src="@/assets/profile-background.png" alt="Imagen de fondo de perfil" 
        class="card-img text-center" id="profile-background" top/>
      <MDBCardBody class="text-center">
        <div class="img-fluid outer-circle shadow-6 text-center">
          <img src="https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg" 
            class="img-fluid rounded-circle"
            alt="Townhouses and Skyscrapers" 
            id="profile-image" />          
        </div>
        <h2 class="text-center form-title">
          {{ user.employee.fullName }}
          <a class="m-1 form-options-text btn btn-link btn-floating" href="#!" role="button">
            <MDBIcon icon="pencil-alt" size="lg" />
          </a>  
        </h2>
        <a class="m-1" @click="modalUserInformation = true" href="#" role="button">
          Información de contacto
        </a>  
        <MDBCardText class="text-muted form-options-text" v-if="user.role == 'Employee'">
          Trabajador
        </MDBCardText>

        <MDBCardText class="text-muted form-options-text" v-else>
          Reclutador
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBRow>

  <MDBModal id="modal-user-information" tabindex="-1" v-model="modalUserInformation" centered>
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalUserInformation = false" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Información de contacto
        <!-- <MDBIcon class="mx-1" size="xs" icon="pencil-alt" /> -->
      </MDBModalTitle>

      <MDBRow>
        <MDBRow class="my-4 mx-2">
          <MDBCol col="1">
            <MDBIcon icon="envelope" size="lg" class="mr-2" />
          </MDBCol>
          <MDBCol col="11">
            <h6 class="fw-normal">Enviar email</h6>
            <a href="mailto:" target="_blank">
              {{ user.email }}
            </a>
          </MDBCol>
        </MDBRow>
        <MDBRow class="mb-4 mx-2">
          <MDBCol col="1">
            <i class="fab fa-whatsapp fa-lg mr-2"></i>
          </MDBCol>
          <MDBCol col="11">
            <h6 class="fw-normal">Enviar Whatsapp</h6>
            <a href="https://wa.me/2281272755" target="_blank">
              {{ user.employee.phone }}
            </a>
          </MDBCol>
        </MDBRow>
        <MDBRow class="mb-4 mx-2">
          <MDBCol col="1">
            <MDBIcon icon="map" size="lg" class="ml-2" />
          </MDBCol>
          <MDBCol col="11">
            <h6 class="fw-normal">Ubicación</h6>
            <p>
              <!-- Fidencio Ocaña #64 
              Francisco Ferrer Guardia
              97000 Xalapa -->
            </p>
          </MDBCol>
        </MDBRow>
      </MDBRow>      
    </MDBModalBody>
  </MDBModal>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<style scoped src="@/wwwroot/css/user-information.css"></style>
<script src="@/wwwroot/js/user-information.js"></script>