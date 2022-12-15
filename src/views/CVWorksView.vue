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
                <MDBIcon icon="arrow-left" size="lg" data-mdb-toggle="tooltip" title="Regresar"/>
              </router-link>
            </MDBCol>
            <MDBCol col="6" class="d-flex align-items-center justify-content-center">
              <MDBCardTitle class="text-center form-title">
                Experiencia Laboral
              </MDBCardTitle>
            </MDBCol>
            <MDBCol col="3" class="d-flex align-items-center justify-content-end">
              <MDBBtn class="logIn-form-button" floating
                @click="showDataToOperate(operation = 'add')">
                <MDBIcon icon="plus" size="lg" data-mdb-toggle="tooltip" title="Agregar Experiencia Laboral"/>
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          
          <MDBRow>
            <p class="form-options-text text-center">─ Recuerda que, una Experiencia Laboral es un conjunto de datos que te ayudarán a ser más visible en el mercado laboral ─</p>            
            <br><br>
          </MDBRow>

          <MDBTable class="mb-0 form-options-text text-center ">
            <!-- <thead class="bg-primary"> -->
            <thead >
                <tr>
                  <th class="text-start">Descripción</th>
                  <th colspan="2">Operaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(workExperience, index) in user.employee.cv.workExperiences">
                  <td class="text-start"> {{ (index + 1) + '.' + workExperience.workExperience }}</td>
                  <td>
                    <MDBBtn color="primary" class="btn btn-primary btn-floating" size="sm"
                      @click="showDataToOperate(workExperience, 'edit')">
                      <MDBIcon icon="pencil-alt" data-mdb-toggle="tooltip" title="Editar Experiencia Laboral"/>
                    </MDBBtn>
                  </td>
                  <td v-if="(this.user.employee.cv.workExperiences.length > 1)">                    
                    <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm"
                      @click="showDataToOperate(workExperience, 'delete')">
                      <MDBIcon icon="trash" data-mdb-toggle="tooltip" title="Eliminar Experiencia Laboral"/>
                    </MDBBtn>
                  </td>
                </tr>
              </tbody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>

  <MDBModal tabindex="-1" staticBackdrop centered v-model="modalWorkEdit">
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          data-mdb-toggle="tooltip" title="Cerrar"
          @click="modalWorkEdit = false" />
      </a>

      <MDBRow class="m-0">
        <MDBModalTitle class="text-center form-title" id="title-works-edit">
          {{ this.modalEditTile }}
        </MDBModalTitle>
  
        <p class="text-center mt-4 form-options-text" id="message-works-edit">
          {{ this.modalEditMessage }}
        </p>
      </MDBRow>
      
      <MDBSpinner id="spinner-edit" class="m-auto d-flex align-items-center mb-2 d-none" size="sm" />

      <MDBRow id="work-form-container">
        <form class="form-options-text needs-validation"
          id="form-user-edit" novalidate 
          @submit.prevent="verifyFormOperation">
          <MDBRow class="my-2 mx-2">
            <MDBCol col="1" class="d-flex align-items-center">
              <MDBIcon icon="briefcase" size="lg" class="mr-2"/>
            </MDBCol>
            <MDBCol col="11" class="mb-2">
              <MDBInput type="text" class="form-control" name="work" id="input-work"
                label="Experiencia Laboral" invalidFeedback="Verifica la experiencia laboral" 
                counter maxlength="200" v-model="work"/>
            </MDBCol>
          </MDBRow>
          
          <MDBRow class="mx-3 my-4 d-flex justify-content-center">
            <MDBBtn class="logIn-form-button" type="submit" id="button-wokr-edit" block>
              {{ this.buttonEditText }}
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
          data-mdb-toggle="tooltip" title="Cerrar"
          @click="modalWorkDelete = false" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Eliminar Experiencia Laboral
      </MDBModalTitle>
      <p class="text-center mt-4 form-options-text" id="message-works-delete">
        ¿Estás seguro de eliminar esta Experiencia Laboral?
        <br>
        Una vez eliminada no se podrá recuperar la información:
      </p> 
      
      <MDBSpinner id="spinner-work-delete" class="d-none m-auto d-flex align-items-center justify-elements-center" size="sm" />

      <MDBRow class="m-0 mt-3" id="work-info-container">
        <MDBRow class="">
          <hr>
          <p class="m-0 p-0 text-center mx-4 mb-3 form-options-text" id="work-delete">
            {{ this.data.workExperience }}
          </p>
          <hr>
        </MDBRow>
        <MDBRow class="m-0 p-0 my-2 text-center">
          <MDBCol>
            <MDBBtn class="logIn-form-button"
              @click="deleteWork">
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

  <Footer class="mt-5"/>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/cv-works.js"></script>
