<template>
  <Navbar class="mb-4" />

  <MDBRow class="m-0 mb-2">
    <MDBCard border="light" shadow="0" bg="white">
      <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/city/062.webp" alt="..." class="img-fluid" id="profile-background" style="height: 6rem;"/>
      <MDBCardBody class="text-center">
        <img src="https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg" class="img-fluid rounded-circle"
          alt="Townhouses and Skyscrapers" id="profile-image" />
        <h2 class="text-center form-title">
          {{ user.employee.fullName }}
          <MDBIcon class="mx-1" size="xs" icon="edit" />
        </h2>
        <MDBCardLink @click="modalUserInformation = true">Información de contacto</MDBCardLink>
        <MDBCardText class="text-muted form-options-text" 
          v-if="user.role == 'Employee'">
          Trabajador
        </MDBCardText>

        <MDBCardText class="text-muted form-options-text" 
          v-else>
          Reclutador
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBRow>
  
  <MDBRow center class="m-0 px-5" v-if="user.employee.cv">
    <MDBCol col="12" lg="7" md="12" class="mx-3">
      <MDBRow class="mb-4 rounded-5">
        <h3 class="mb-4">
          Acerca de mi
        </h3>
        <p class="form-options-text">{{ user.employee.cv.description }}</p>
      </MDBRow>
      <hr>
      <MDBRow class="mb-3 rounded-5">
        <h3 class="mb-4">
          Experiencia Laboral
        </h3>      
        <p v-for="(workExperience) in user.employee.cv.workExperiences" class="form-options-text mb-4">
          <MDBIcon icon="briefcase" size="lg" class="me-2"/>
          {{ workExperience.workExperience }}
        </p>
      </MDBRow>
      <hr>
      <MDBRow class="mb-3 rounded-5">
        <h3 class="mb-4">
          Educación
        </h3>      
        <p v-for="(academicTraining) in user.employee.cv.academicTrainings" class="form-options-text mb-4">
          <MDBIcon icon="graduation-cap" size="lg" class="me-2"/>
          {{ academicTraining.academicTraining }}
        </p>    
      </MDBRow>
      <hr>
      <MDBRow class="mb-3 rounded-5">
        <h3 class="mb-4">
          Certificaciones
        </h3>      
        <p v-for="(certification) in user.employee.cv.certifications" class="form-options-text mb-4">
          <MDBIcon icon="file" size="lg" class="me-2"/>
          {{ certification.certification }}
        </p>      
      </MDBRow>
    </MDBCol>

    <MDBCol col="12" lg="4" md="12" class="text-center mx-3" id="container-cards">
      <MDBRow>
        <MDBCol col="12" sm="6" md="6" lg="12"  class="mb-4  rounded-5">
          <MDBCard border="light" shadow="5" bg="white">
            <MDBCardBody>
              <h3 class="mb-4">
                Habilidades
              </h3>
              <p v-for="(skill) in user.employee.cv.skills" class="form-options-text">
                <MDBIcon icon="check" size="lg" class="me-2"/>
                {{ skill.skill }}
              </p> 
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol col="12" sm="6" md="6" lg="12" class=" mb-4 rounded-5">
          <MDBCard  border="light" shadow="5" bg="white">
            <MDBCardBody>
              <h3 class="mb-4">
                Idiomas
              </h3>
              <p v-for="(lenguage) in user.employee.cv.lenguages" class="form-options-text">
                <MDBIcon icon="language" size="lg" class="me-2"/>
                {{ lenguage.lenguage }}
              </p>             
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBCol>
  </MDBRow>
  
  <MDBRow center class="m-0 px-5" v-else>
    <MDBRow>
      <MDBCol md="4" class="d-flex align-items-center justify-content-center">
        <img class="img-fluid" src="../assets/cv.svg"/>
      </MDBCol>
      
      <MDBCol md="8" class="d-flex align-items-center justify-content-center">
        <MDBRow>
          <h2 class="form-title text-center my-4">
            ¡Recuerda registrar tu CV!
          </h2>
          
          <p class="text-center form-options-text m-0">
            El Currículum Vitae (CV) es un resumen breve de tus experiencias formativas y laborales y de tus habilidades profesionales. Su objetivo es demostrar la idoneidad de tu candidatura a un puesto de trabajo.
          </p>
          
          <FormCV />             
        </MDBRow>
      </MDBCol>
    </MDBRow>  
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
</template>

<style scoped src="@/wwwroot/css/profile.css"></style>
<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/profile.js"></script>