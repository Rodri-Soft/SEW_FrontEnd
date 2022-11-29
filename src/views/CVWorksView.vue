<template>
  <Navbar class="mb-4" />
  <UserInformation />

  <MDBRow class="m-0 p-0">
    <MDBCol md="8" class="offset-md-2">
      <MDBCard id="works-card">
        <MDBCardBody>      
          <MDBRow class="d-flex justify-content-center mb-5">
            <MDBCol col="3" class="d-flex align-items-center text-start">
              <!-- <router-link to="/profile" class="btn btn-link btn-sm"> -->
              <router-link to="/profile" class="btn btn-floating logIn-form-button">
                <MDBIcon icon="arrow-left" size="lg" />
              </router-link>
            </MDBCol>
            <MDBCol col="6" class="d-flex align-items-center justify-content-center">
              <MDBCardTitle class="text-center form-title">
                Experiencia Laboral
              </MDBCardTitle>
            </MDBCol>
            <MDBCol col="3" class="d-flex align-items-center justify-content-end">
              <MDBBtn class="logIn-form-button" floating>
                <MDBIcon icon="plus" size="lg" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          
          <MDBRow class="mb-2"
            v-for="(workExperience, index) in user.employee.cv.workExperiences">
            <MDBCol col="11" class="">
              <MDBCardText class="text-start form-options-text">
                {{ workExperience.workExperience }}
              </MDBCardText>
            </MDBCol>
            <MDBCol col="1" class="m-0 d-flex align-items-center justify-content-end">
              <a class="m-1 form-options-text btn btn-link btn-floating" href="#!" role="button">
                <MDBIcon icon="pencil-alt" size="lg" />
              </a>             
            </MDBCol>
            <hr class="mt-2"
              v-if="index != Object.keys(user.employee.cv.workExperiences).length - 1">
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/cv-lenguages.js"></script>
