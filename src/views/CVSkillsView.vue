<template>
  <Navbar class="mb-4" />
  <UserInformation />

  <MDBRow class="m-0 p-0">
    <MDBCol md="8" class="offset-md-2">
      <MDBCard id="skills-card">
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
                Habilidades
              </MDBCardTitle>
            </MDBCol>
            <MDBCol col="3" class="d-flex align-items-center justify-content-end">
              <MDBBtn class="logIn-form-button" floating
                @click="showDataToOperate(operation = 'add')">
                <MDBIcon icon="plus" size="lg" data-mdb-toggle="tooltip" title="Agregar Habilidad"/>
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          
          <MDBRow>
            <p class="form-options-text text-center">
              ─ Recuerda que, las Habilidades que agregues, permitirán a los Reclutadores
                conocer tus habilidades y destrezas, para así ofrecerte un puesto de trabajo. ─ 
            </p>            
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
                <tr v-for="(skill, index) in user.employee.cv.skills">
                  <td class="text-start"> {{ (index + 1) + '.' + skill.skill }}</td>
                  <td>
                    <MDBBtn color="primary" class="btn btn-primary btn-floating" size="sm"
                      @click="showDataToOperate(skill, 'edit')">
                      <MDBIcon icon="pencil-alt" data-mdb-toggle="tooltip" title="Editar Habilidad"/>
                    </MDBBtn>
                  </td>
                  <td v-if="(this.user.employee.cv.skills.length > 1)">                    
                    <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm"
                      @click="showDataToOperate(skill, 'delete')">
                      <MDBIcon icon="trash" data-mdb-toggle="tooltip" title="Eliminar Habilidad"/>
                    </MDBBtn>
                  </td>
                </tr>
              </tbody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>

  <MDBModal tabindex="-1" staticBackdrop centered v-model="modalSkillEdit">
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          data-mdb-toggle="tooltip" title="Cerrar"
          @click="modalSkillEdit = false" />
      </a>

      <MDBRow class="m-0">
        <MDBModalTitle class="text-center form-title" id="title-skills-edit">
          {{ this.modalEditTile }}
        </MDBModalTitle>
  
        <p class="text-center mt-4 form-options-text" id="message-skills-edit">
          {{ this.modalEditMessage }}
        </p>
      </MDBRow>
      
      <MDBSpinner id="spinner-edit" class="m-auto d-flex align-items-center mb-2 d-none" size="sm" />

      <MDBRow id="skill-form-container">
        <form class="form-options-text needs-validation"
          id="form-user-edit" novalidate 
          @submit.prevent="verifyFormOperation">
          <MDBRow class="my-2 mx-2">
            <MDBCol col="1" class="d-flex align-items-center">
              <MDBIcon icon="check" size="lg" class="mr-2"/>
            </MDBCol>
            <MDBCol col="11" class="mb-2">
              <MDBInput type="text" class="form-control" name="skill" id="input-skill"
                label="Habilidad" invalidFeedback="Verifica la habilidad" 
                counter maxlength="200" v-model="skill"/>
            </MDBCol>
          </MDBRow>
          
          <MDBRow class="mx-3 my-4 d-flex justify-content-center">
            <MDBBtn class="logIn-form-button" type="submit" id="button-skill-edit" block>
              {{ this.buttonEditText }}
            </MDBBtn>
          </MDBRow>
        </form>
      </MDBRow>  
    </MDBModalBody>
  </MDBModal>

  <MDBModal tabindex="-1" staticBackdrop centered v-model="modalSkillDelete">
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          data-mdb-toggle="tooltip" title="Cerrar"
          @click="modalSkillDelete = false" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Eliminar Habilidad
      </MDBModalTitle>
      <p class="text-center mt-4 form-options-text" id="message-skills-delete">
        ¿Estás seguro de eliminar esta habilIdad?
        <br>
        Una vez eliminada no se podrá recuperar la información:
      </p> 
      
      <MDBSpinner id="spinner-skill-delete" class="d-none m-auto d-flex align-items-center justify-elements-center" size="sm" />

      <MDBRow class="m-0 mt-3" id="skill-info-container">
        <MDBRow class="">
          <hr>
          <p class="m-0 p-0 text-center mx-4 mb-3 form-options-text" id="skill-delete">
            {{ this.data.skill }}
          </p>
          <hr>
        </MDBRow>
        <MDBRow class="m-0 p-0 my-2 text-center">
          <MDBCol>
            <MDBBtn class="logIn-form-button"
              @click="deleteSkill">
              <MDBIcon icon="check" size="lg" class="mr-2" />
              Aceptar
            </MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn class="logIn-form-button"
              @click="modalSkillDelete = false">
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
<script src="@/wwwroot/js/cv-skills.js"></script>
