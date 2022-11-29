<template>
  <Navbar class="mb-4" />
  <UserInformation/>
  
  <MDBRow center class="m-0 px-5" v-if="user.employee.cv">
    <MDBCol col="12" lg="4" md="12" class="text-center mx-3" id="container-cards">
      <MDBRow>
        <MDBCol col="12" sm="6" md="6" lg="12"  class="mb-4  rounded-5">
          <MDBCard border="light" shadow="5" bg="white" class="h-100">
            <MDBCardBody>
              <MDBCol class="mb-4">
                <MDBIcon icon="check" size="lg" />
                <h3 class="d-inline mb-4 mx-3 fw-bold">Habilidades</h3>      
                <!-- <MDBBtn color="link" size="sm">Editar</MDBBtn> -->
              </MDBCol> 
              <p v-for="(skill) in user.employee.cv.skills" class="form-options-text">
                {{ skill.skill }}
              </p> 
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol col="12" sm="6" md="6" lg="12" class=" mb-4 rounded-5">
          <MDBCard  border="light" shadow="5" bg="white" class="h-100">
            <MDBCardBody>
              <MDBCol class="mb-4">
                <MDBIcon icon="language" size="lg" />
                <h3 class="d-inline mb-4 mx-3 fw-bold">Idiomas</h3>      
                <!-- <MDBBtn color="link" size="sm">Editar</MDBBtn> -->
              </MDBCol> 
              <p v-for="(lenguage) in user.employee.cv.lenguages" class="form-options-text">
                {{ lenguage.lenguage }}
              </p>             
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBCol>
    
    <MDBCol col="12" lg="7" md="12" class="mx-3">
      <MDBRow class="mb-4 rounded-5">
        <h3 class="mb-4 fw-bold">Acerca de mi</h3>
        <p class="form-options-text">{{ user.employee.cv.description }}</p>
      </MDBRow>
      <hr>
      <MDBRow class="mb-3">
        <MDBCol class="mb-4">
          <MDBIcon icon="briefcase" size="lg"/>            
          <h3 class="d-inline mb-4 mx-3 fw-bold">Experiencia Laboral</h3>
          <router-link class="btn btn-link btn-sm" to="/profile/cv/lenguages" >
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
          <!-- <router-link to="/cv-education" class="btn btn-link btn-sm">Editar</router-link> -->
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
          <!-- <router-link to="/cv-education" class="btn btn-link btn-sm">Editar</router-link> -->
        </MDBCol>     
        <p v-for="(certification) in user.employee.cv.certifications" class="form-options-text mb-4">
          ● {{ certification.certification }}
        </p>      
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
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/profile.js"></script>