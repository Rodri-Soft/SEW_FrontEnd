<template>
  <Navbar class="mb-4" />
  <MDBRow class="m-0 mb-2 ">
    <MDBCol md="10" class="offset-md-1">
      <MDBCard shadow="0">
        <MDBCardImg src="https://source.unsplash.com/random/1920x112" 
          alt="Imagen de fondo de perfil de un usuario" 
          class="text-center m-0 p-0 bg-image" id="profile-background" top style="height: 7rem;"/>
        <MDBCardBody class="text-center">
          <div class="img-fluid outer-circle shadow-6 text-center">
            <img src="https://source.unsplash.com/random/160x160/?person" 
              class="img-fluid rounded-circle" alt="Imagen de perfil de un usuario" 
              id="profile-image" />  
          </div>
          <h2 class="text-center form-title">
            {{ this.fullName }}          
          </h2>
          <a class="m-1" @click="modalUserInformation = true" href="#" role="button">
            Información de contacto
          </a>
          <MDBCardText class="form-options-text">
            {{ this.role }} {{ this.charge }}         
          </MDBCardText>

          <MDBCardText class="form-options-text"
            v-if="!this.isEmployee">
            Seguidores <br>           
            {{ this.followers.length }}
          </MDBCardText>

          <MDBRow class="container-button m-auto d-flex justify-content-center" 
            v-if="(!this.isEmployee && this.user.rfc !== this.rfc)">
            <MDBBtn class="logIn-form-button"
              v-if="this.isFollower" @click="unfollowUser()">
              Dejar de seguir
            </MDBBtn>
            <MDBBtn class="logIn-form-button"
              v-else-if="!this.isFollower" @click="followUser()">
              Seguir
            </MDBBtn>
          </MDBRow>
          <MDBRow class="container-button m-auto d-flex justify-content-center"
            v-else-if="(this.user.rfc === this.rfc)">
            <MDBBadge class="text-wrap py-2 form-options-text logIn-form-button rounded-7" 
              style="width: 7rem;">
              Así se ve tu perfil 👀
            </MDBBadge>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>      
    </MDBCol>
  </MDBRow>

  <MDBModal id="modal-user-information" tabindex="-1" v-model="modalUserInformation" centered>
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          @click="modalUserInformation = false" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Información de contacto
      </MDBModalTitle>

      <MDBRow>
        <MDBRow class="my-4 mx-2">
          <MDBCol col="1">
            <MDBIcon icon="envelope" size="lg" class="mr-2" />
          </MDBCol>
          <MDBCol col="11">
            <h6 class="fw-normal">Enviar email</h6>
            <a :href="('mailto:' + this.email)" target="_blank">
              {{ this.email }}
            </a>
          </MDBCol>
        </MDBRow>
        <MDBRow class="mb-4 mx-2">
          <MDBCol col="1">
            <i class="fab fa-whatsapp fa-lg mr-2"></i>
          </MDBCol>
          <MDBCol col="11">
            <h6 class="fw-normal">Enviar Whatsapp</h6>            
            <a :href="('https://wa.me/' + this.phone)" target="_blank">
              {{ this.phone }}
            </a>
          </MDBCol>
        </MDBRow>
      </MDBRow>      
    </MDBModalBody>
  </MDBModal>

  <MDBRow class="m-0"
    v-if="this.isEmployee">
    <MDBCol md="10" class="offset-md-1">
      <MDBRow center class="m-0" 
        v-if="this.cv">
        <MDBCol col="12" lg="3" md="12" class="text-center p-0" id="container-cards">
          <MDBRow>
            <MDBCol col="12" sm="6" md="6" lg="12"  class="mb-4 rounded-5">
              <MDBCard border="light" shadow="4" bg="white" class="h-100">
                <MDBCardBody>
                  <MDBCol class="mb-4">
                    <MDBIcon icon="check" size="lg" />
                    <MDBCol class="d-inline mb-4 mx-3 fw-bold">Habilidades</MDBCol>h3>                          
                  </MDBCol> 
                  <p v-for="(skill) in this.cv.skills" class="form-options-text">
                    {{ skill.skill }}
                  </p> 
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol col="12" sm="6" md="6" lg="12" class=" mb-4 rounded-5">
              <MDBCard  border="light" shadow="4" bg="white" class="h-100">
                <MDBCardBody>
                  <MDBCol class="mb-4">
                    <MDBIcon icon="language" size="lg" />
                    <h3 class="d-inline mb-4 mx-3 fw-bold">Idiomas</h3>                          
                  </MDBCol> 
                  <p v-for="(lenguage) in this.cv.lenguages" class="form-options-text">
                    {{ lenguage.lenguage }}
                  </p>             
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        
        <MDBCol col="12" lg="9" md="12" class="px-3">
          <MDBRow class="mb-4">
            <MDBCol>
              <h3 class="d-inline mx-3 fw-bold">Acerca de mi</h3>              
              <p class="mt-4 form-options-text">{{ this.cv.description }}</p>
            </MDBCol>
          </MDBRow>
          <hr>
          <MDBRow class="mb-3">
            <MDBCol class="mb-4">
              <MDBIcon icon="briefcase" size="lg"/>            
              <h3 class="d-inline mb-4 mx-3 fw-bold">Experiencia Laboral</h3>  
            </MDBCol>
            <p v-for="(workExperience) in this.cv.workExperiences" class="form-options-text mb-4">
              ● {{ workExperience.workExperience }}
            </p>
          </MDBRow>
          <hr>
          <MDBRow class="mb-3">
            <MDBCol class="mb-4">
              <MDBIcon icon="graduation-cap" size="lg"/>
              <h3 class="d-inline mb-4 mx-3 fw-bold">Educación</h3>                    
            </MDBCol>
            <p v-for="(academicTraining) in this.cv.academicTrainings" class="form-options-text mb-4">
              ● {{ academicTraining.academicTraining }}
            </p>    
          </MDBRow>
          <hr>
          <MDBRow class="mb-3 rounded-5">
            <MDBCol class="mb-4">
              <MDBIcon icon="file" size="lg" />
              <h3 class="d-inline mb-4 mx-3 fw-bold">Certificaciones</h3>      
            </MDBCol>     
            <p v-for="(certification) in this.cv.certifications" class="form-options-text mb-4">
              ● {{ certification.certification }}
            </p>      
          </MDBRow>
        </MDBCol> 
      </MDBRow>
      
      <MDBRow center class="m-0"
        v-else>
        <MDBRow class="m-0 p-0">
          <MDBCol md="4" class="d-flex align-items-center justify-content-center">
            <img class="img-fluid" src="../assets/cv.svg" id="cv-img"/>
          </MDBCol>
          
          <MDBCol md="8" class="d-flex align-items-center justify-content-center">
            <MDBRow>
              <h2 class="form-title text-center my-4">
                Este perfil aún no cuenta con un CV registrado
              </h2>
              
              <p class="text-center form-options-text m-0">
                El Currículum Vitae (CV) es un resumen breve de las experiencias formativas y laborales y de las habilidades profesionales. Su objetivo es demostrar la idoneidad de la candidatura a un puesto de trabajo al que se aplique.
              </p>           
            </MDBRow>
          </MDBCol>
        </MDBRow>  
      </MDBRow>
    </MDBCol>
  </MDBRow>

  <MDBRow class="m-0"
    v-else>
    <MDBCol md="10" class="offset-md-1">
      <MDBRow class="m-0 mt-4"
        v-if="(this.groups.length === 0)">
        <MDBRow class="m-0 p-0">
          <MDBCol md="4" class="d-flex align-items-center justify-content-end">
            <img class="img-fluid" src="../assets/group.svg"/>
          </MDBCol>
          
          <MDBCol md="8" class="d-flex align-items-center justify-content-center">
            <MDBRow>
              <h2 class="form-title text-center my-4">
                Este perfil aún no pertenece a ningún grupo de Reclutadores 
              </h2>
              
              <p class="text-center form-options-text m-0">
                Los grupos le permiten a los reclutadores compartir información y contactos con otros reclutadores que puede resultar útil para los Empleados.
              </p>                                  
            </MDBRow>
          </MDBCol>
        </MDBRow>  
      </MDBRow>
    </MDBCol>
  </MDBRow>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<style scoped src="@/wwwroot/css/profile-information.css"></style>
<script src="@/wwwroot/js/user-profile.js"></script>
