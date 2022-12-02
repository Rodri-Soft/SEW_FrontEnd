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
              <MDBBtn class="logIn-form-button" floating
                @click="(modalWorkEdit = true)">
                <MDBIcon icon="plus" size="lg" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          
          <MDBRow class="mb-2"
            v-for="(workExperience, index) in user.employee.cv.workExperiences">
            <MDBCol col="10" class="">
              <MDBCardText class="text-start form-options-text">
                {{ workExperience.workExperience }}
              </MDBCardText>
            </MDBCol>
            <MDBCol col="1" class="m-0 d-flex align-items-center justify-content-end">
              <a class="m-1 form-options-text btn btn-link btn-floating" href="#!" role="button"
                @click="(modalWorkEdit = true), showDataToOperate(workExperience.workExperience, 'edit')">
                <MDBIcon icon="pencil-alt" size="lg" />
              </a>             
            </MDBCol>
            <MDBCol col="1" class="m-0 d-flex align-items-center justify-content-end">
              <a class="m-1 form-options-text btn btn-link btn-floating" href="#!" role="button"
                @click="((modalWorkDelete = true), showDataToOperate(workExperience.workExperience, 'delete'))">
                <MDBIcon icon="trash" size="lg" />
              </a>             
            </MDBCol>
            <hr class="mt-2"
              v-if="index != Object.keys(user.employee.cv.workExperiences).length - 1">
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>

  <MDBModal tabindex="-1" staticBackdrop centered v-model="modalWorkEdit">
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          @click="modalWorkEdit = false" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Editar información
      </MDBModalTitle>

      <p class="text-center mt-4 form-options-text" id="message-works-edit">
        Recuerda mantener tus Experiencias Laborales actualizadas
      </p>
      <MDBSpinner id="spinner-edit" class="d-none" size="sm" />

      <MDBRow>
        <form class="form-options-text needs-validation"
          id="form-user-edit" novalidate 
          @submit.prevent="">
          <MDBRow class="my-2 mx-2">
            <MDBCol col="1" class="d-flex align-items-center">
              <MDBIcon icon="briefcase" size="lg" class="mr-2"/>
            </MDBCol>
            <MDBCol col="11" class="mb-2">
              <MDBInput type="text" class="form-control" name="work" id="input-work-edit"
                label="Experiencia Laboral" invalidFeedback="Verifica la experiencia laboral" 
                v-model="work"/>
            </MDBCol>
          </MDBRow>
          
          <MDBRow class="mx-3 my-4 d-flex justify-content-center">
            <MDBBtn class="logIn-form-button" type="submit" block>
              Actualizar información
            </MDBBtn>
          </MDBRow>
        </form>
      </MDBRow>  
    </MDBModalBody>
  </MDBModal>

  <MDBModal tabindex="-1" staticBackdrop centered v-model="modalWorkDelete">
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          @click="modalWorkDelete = false" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Eliminar Experiencia Laboral
      </MDBModalTitle>
      <p class="text-center mt-4 form-options-text" id="message-works-edit">
        ¿Estás seguro de eliminar esta Experiencia Laboral?
        <br>
        Una vez eliminada no se podrá recuperar la información:
      </p> 
      
      <p class="m-0 p-0 text-center mx-4 my-4 form-options-text">
        {{this.data}}
      </p>

      <MDBSpinner id="spinner-edit" class="d-none" size="sm" />

      <MDBRow class="mt-4">
        <MDBRow class="m-0 p-0 mt-1 mb-4 text-center">
          <MDBCol>
            <MDBBtn class="logIn-form-button">
              <MDBIcon icon="check" size="lg" class="mr-2" />
              Aceptar
            </MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn class="logIn-form-button"
              @click="modalWorkDelete = false">
              <MDBIcon icon="times" size="lg" class="mr-2" />
              Cancelar
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBRow>
    </MDBModalBody>
  </MDBModal>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/cv-lenguages.js"></script>
