<template>
  <Navbar class="mb-4" />
  <ProfileInformation />
  
  <MDBRow class="m-0"
    v-if="!user.employee">
    <MDBCol md="10" class="offset-md-1">
      <MDBRow class="m-0 mt-4"
        v-if="(user.recruiter.groups.length === 0)">
        <MDBRow class="m-0 p-0">
          <MDBCol md="4" class="d-flex align-items-center justify-content-end">
            <img class="img-fluid" src="../assets/group.svg"/>
          </MDBCol>
          
          <MDBCol md="8" class="d-flex align-items-center justify-content-center">
            <MDBRow>
              <h2 class="form-title text-center my-4">
                Aún no perteneces a ningún grupo de Reclutadores 
              </h2>
              
              <p class="text-center form-options-text m-0">
                Recuerda que puedes crear un grupo o unirte a uno existente. Los grupos de te permiten compartir información y contactos con otros reclutadores. 
              </p>
              
              <MDBBtn class="logIn-form-button m-0 my-4" >
                Ver grupos
              </MDBBtn>                       
            </MDBRow>
          </MDBCol>
        </MDBRow>  
      </MDBRow>
    </MDBCol>
  </MDBRow>

  <MDBRow class="m-0"
    v-else>
    <MDBCol md="10" class="offset-md-1">
      <MDBRow center class="m-0" 
        v-if="user.employee.cv">
        <MDBCol col="12" lg="3" md="12" class="text-center p-0" id="container-cards">
          <MDBRow>
            <MDBCol col="12" sm="6" md="6" lg="12"  class="mb-4 rounded-5">
              <MDBCard border="light" shadow="4" bg="white" class="h-100">
                <MDBCardBody>
                  <MDBCol class="mb-4">
                    <MDBIcon icon="check" size="lg" />
                    <h3 class="d-inline mb-4 mx-3 fw-bold">Habilidades</h3>      
                    <router-link to="/profile/cv/skills" class="btn btn-link btn-sm">Editar</router-link>
                  </MDBCol> 
                  <p v-for="(skill) in user.employee.cv.skills" class="form-options-text">
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
                    <router-link to="/profile/cv/lenguages" class="btn btn-link btn-sm">Editar</router-link>
                  </MDBCol> 
                  <p v-for="(lenguage) in user.employee.cv.lenguages" class="form-options-text">
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
              <MDBBtn class="btn-link btn-sm"
                @click="(modalCVDescription = true)">
                Editar
              </MDBBtn>
              <p class="mt-4 form-options-text">{{ user.employee.cv.description }}</p>
            </MDBCol>
          </MDBRow>
          <hr>
          <MDBRow class="mb-3">
            <MDBCol class="mb-4">
              <MDBIcon icon="briefcase" size="lg"/>            
              <h3 class="d-inline mb-4 mx-3 fw-bold">Experiencia Laboral</h3>
              <router-link class="btn btn-link btn-sm" to="/profile/cv/work-experiences" >
                Editar
              </router-link>
            </MDBCol>
            <p v-for="(workExperience) in user.employee.cv.workExperiences" class="form-options-text mb-4">
              ● {{ workExperience.workExperience }}
            </p>
          </MDBRow>
          <hr>
          <MDBRow class="mb-3">
            <MDBCol class="mb-4">
              <MDBIcon icon="graduation-cap" size="lg"/>
              <h3 class="d-inline mb-4 mx-3 fw-bold">Educación</h3>      
              <router-link to="/profile/cv/academic-trainings" class="btn btn-link btn-sm">Editar</router-link>
            </MDBCol>
            <p v-for="(academicTraining) in user.employee.cv.academicTrainings" class="form-options-text mb-4">
              ● {{ academicTraining.academicTraining }}
            </p>    
          </MDBRow>
          <hr>
          <MDBRow class="mb-3 rounded-5">
            <MDBCol class="mb-4">
              <MDBIcon icon="file" size="lg" />
              <h3 class="d-inline mb-4 mx-3 fw-bold">Certificaciones</h3>      
              <router-link to="/profile/cv/certifications" class="btn btn-link btn-sm">Editar</router-link>
            </MDBCol>     
            <p v-for="(certification) in user.employee.cv.certifications" class="form-options-text mb-4">
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
                ¡Recuerda Agregar tu CV!
              </h2>
              
              <p class="text-center form-options-text m-0">
                El Currículum Vitae (CV) es un resumen breve de tus experiencias formativas y laborales y de tus habilidades profesionales. Su objetivo es demostrar la idoneidad de tu candidatura a un puesto de trabajo al que apliques.
              </p>
  
              <FormCV />             
            </MDBRow>
          </MDBCol>
        </MDBRow>  
      </MDBRow>
    </MDBCol>
  </MDBRow>
  
  <MDBModal tabindex="-1" staticBackdrop centered
    v-model="modalCVDescription">
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          @click="((modalCVDescription = false), this.description = this.user.employee.cv.description)" />
      </a>

      <MDBRow class="m-0">
        <MDBModalTitle class="text-center form-title">
          Mi descripción
        </MDBModalTitle>
  
        <p class="text-center mt-4 form-options-text" id="message-description-edit">
          Tu descripción es la primera impresión que darás a los Reclutadores. 
          Recuerda que es importante que sea breve y concisa. 
        </p>
      </MDBRow>
      
      <MDBSpinner id="spinner-edit" class="m-auto d-flex align-items-center mb-2 d-none" 
        size="sm" />

      <MDBRow id="description-form-container">
        <form class="form-options-text needs-validation"
          id="form-user-edit" novalidate 
          @submit.prevent="verifyFormOperation">
          <MDBRow class="my-2 mx-2">
            <MDBCol col="12" class="mb-2">
              <MDBTextarea type="text" class="form-control" name="description" id="input-description" 
                label="Mi descripción" invalidFeedback="Verifica la descripción" maxlength="200"
                v-model="description" />
            </MDBCol>
          </MDBRow>
          
          <MDBRow class="mx-3 my-4 d-flex justify-content-center">
            <MDBBtn class="logIn-form-button" type="submit" block>
              Guardar
            </MDBBtn>
          </MDBRow>
        </form>
      </MDBRow>  
    </MDBModalBody>
  </MDBModal>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/profile.js"></script>