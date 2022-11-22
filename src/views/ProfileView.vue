<template>
  <Navbar class="mb-4" />

  <MDBRow class="m-0">
    <MDBCard border="light" shadow="0" bg="white">
      <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/city/062.webp" alt="..." class="img-fluid" id="profile-background" style="height: 10rem;"/>
      <MDBCardBody class="text-center">
        <img src="https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg" class="img-fluid rounded-circle"
          alt="Townhouses and Skyscrapers" id="profile-image" />
        <h2 class="text-center form-title">
          {{ user.employee.fullName }}
          <MDBIcon class="mx-1" size="xs" icon="edit" />
        </h2>
        <MDBCardLink @click="modalUserInformation = true">Información de contacto</MDBCardLink>
        <MDBCardText class="text-muted">
          {{ user.role }}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBRow>

  <MDBModal id="modal-user-information" tabindex="-1" v-model="modalUserInformation" staticBackdrop centered>
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalUserInformation = false" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Información de contacto
        <MDBIcon class="mx-1" size="xs" icon="edit" />
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
  
  <MDBRow center class="m-0 p-5" v-if="user.employee.cv">
    <MDBCol col="12" lg="7" md="12" class="mx-3">
      <MDBRow class="mb-5 rounded-5">
        <h3>
          Acerca de mi
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt dolorem minus a eos illum ipsa ea, sed
          itaque
        </p>
      </MDBRow>
      <!-- <hr> -->
      <MDBRow class="mb-5 rounded-5">
        <h3>
          Experiencia Laboral
        </h3>      
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt dolorem minus a eos illum ipsa ea, sed itaque
        </p>
      </MDBRow>
      <!-- <hr> -->
      <MDBRow class="mb-5 rounded-5">
        <h3>
          Educación
        </h3>      
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt dolorem minus a eos illum ipsa ea, sed itaque
        </p>    
      </MDBRow>
      <!-- <hr> -->
      <MDBRow class="mb-5 rounded-5">
        <h3 >
          Certificaciones
        </h3>      
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt dolorem minus a eos illum ipsa ea, sed itaque
        </p>      
      </MDBRow>
    </MDBCol>

    <MDBCol col="12" lg="4" md="12" class="text-center mx-3" id="container-cards">
      <MDBRow>
        <MDBCol col="12" sm="6" md="6" lg="12"  class="mb-4  rounded-5">
          <MDBCard border="light" shadow="5" bg="white">
            <MDBCardBody>
              <h3>
                Habilidades
              </h3>
              <p>Javascript</p>
              <p>Vue</p>
              <p>PHP</p>
              <p>MySQL</p>
              <p>HTML</p>
              <p>CSS</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol col="12" sm="6" md="6" lg="12" class=" mb-4 rounded-5">
          <MDBCard  border="light" shadow="5" bg="white">
            <MDBCardBody>
              <h3>
                Idiomas
              </h3>
              <p>Español</p>
              <p>Inglés</p>            
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBCol>
  </MDBRow>

  <MDBRow center class="m-0 p-5" v-else>
    <!-- <h2 class="text-center  mb-4">
      ¡Recuerda registrar tu CV!
    </h2>
    <MDBBtn tag="a" color="primary" href="#!" floating size="lg">
      <img src="@/assets/cv.svg"/>
    </MDBBtn> -->
    <div
    class="bg-image"
    style="
      /* background-image: url('https://mdbootstrap.com/img/new/standard/city/062.webp'); */
      background-image: url('../assets/cv.svg');
      height: 100vh;
    "
  >
    <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
      <div class="d-flex justify-content-center align-items-center h-100">
        <!-- <h1 class="text-white mb-0">Page title</h1> -->
        <h2 class="text-white mb-0">
          ¡Recuerda registrar tu CV!
        </h2>
      </div>
    </div>
  </div>
  <!-- Background image -->
  </MDBRow>

  <!-- <ModalCV/> -->


</template>

<style scoped src="@/wwwroot/css/profile.css"></style>
<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/profile.js"></script>