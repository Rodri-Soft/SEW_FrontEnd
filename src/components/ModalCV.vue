<template>
  <section>
    <MDBModal id="modal-lenguage-cv" tabindex="-1" v-model="modalLenguageCV" 
      staticBackdrop centered v-if="!user.employee.cv">
      <MDBModalBody>
        <a href="#" class="text-reset">
          <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalLenguageCV = false" />
        </a>

        <FormInformation/>
        
        <form class="user-form form-options-text" novalidate>
          <MDBRow class="g-3">
            <MDBRow class="text-center">
              <h6 id="message-lenguages" class="form-options-text mb-3">
                Agrega los idiomas que dominas (etapa 1/6)
              </h6>
            </MDBRow>
            <MDBRow class="m-0 p-0 mb-4">
              <MDBCol md="8">
                <MDBInput type="text" label="Idioma" id="input-lenguage" v-model="lenguage" invalidFeedback="Verifica el campo"
                  required />
              </MDBCol>
              <MDBCol md="4">
                <MDBBtn class="logIn-form-button" @click="addRow('lenguage')" color="primary" block type="button">
                  Agregar
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow class="m-0">
              <MDBTable striped border class="mb-0 bg-white text-center" id="lenguages-table">
                <thead class="bg-light">
                  <tr>
                    <th>Idioma</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(lenguage, index) in lenguages" :key="index">
                    <td>{{ lenguage }}</td>
                    <td>
                      <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm" @click="deleteRow(index, 'lenguage')">
                        <MDBIcon icon="trash" />
                      </MDBBtn>
                    </td>
                  </tr>
                </tbody>
              </MDBTable>
            </MDBRow>
          </MDBRow>
        
          <MDBBtn @click="openModalWorkCV" class="mt-4 logIn-form-button" block>Siguiente</MDBBtn>
        </form>
      </MDBModalBody>
    </MDBModal>
    
    <MDBModal id="modal-work-cv" tabindex="-1" v-model="modalWorkCV" 
      staticBackdrop centered v-if="!user.employee.cv">
      <MDBModalBody>
        <a href="#" class="text-reset">
          <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalWorkCV = false" />
        </a>

        <FormInformation/>
        
        <form class="user-form form-options-text" novalidate>
          <MDBRow class="g-3">
            <MDBRow class="text-center">
              <h6 id="message-work" class="form-options-text mb-3">
                Agrega tus experiencias laborales  (etapa 2/6)
              </h6>
            </MDBRow>
            <MDBRow class="m-0 p-0 mb-4">
              <MDBCol md="8">
                <MDBInput type="text" label="Experiencia Laboral" id="input-work" v-model="work" invalidFeedback="Verifica el campo"
                  required />
              </MDBCol>
              <MDBCol md="4">
                <MDBBtn class="logIn-form-button" @click="addRow('work')" color="primary" block type="button">
                  Agregar
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow class="m-0">
              <MDBTable striped border class="mb-0 bg-white text-center" id="works-table">
                <thead class="bg-light">
                  <tr>
                    <th>Experiencia Laboral</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(work, index) in works" :key="index">
                    <td>{{ work }}</td>
                    <td>
                      <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm" @click="deleteRow(index, 'work')">
                        <MDBIcon icon="trash" />
                      </MDBBtn>
                    </td>
                  </tr>
                </tbody>
              </MDBTable>
            </MDBRow>
          </MDBRow>
          
          <MDBRow>
            <MDBCol md="6">
              <MDBBtn @click="openModalLenguageCV" class="mt-4 logIn-form-button" block>Atrás</MDBBtn>
            </MDBCol>
            <MDBCol md="6">
              <MDBBtn @click="openModalAcademicCV" class="mt-4 logIn-form-button" block>Siguiente</MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBModalBody>
    </MDBModal>

    <MDBModal id="modal-academic-cv" tabindex="-1" v-model="modalAcademicCV" 
      staticBackdrop centered v-if="!user.employee.cv">
      <MDBModalBody>
        <a href="#" class="text-reset">
          <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalAcademicCV = false" />
        </a>

        <FormInformation/>
        
        <form class="user-form form-options-text" novalidate>
          <MDBRow class="g-3">
            <MDBRow class="text-center">
              <h6 id="message-work" class="form-options-text mb-3">
                Agrega tu formación académica  (etapa 3/6)
              </h6>
            </MDBRow>
            <MDBRow class="m-0 p-0 mb-4">
              <MDBCol md="8">
                <MDBInput type="text" label="Formación académica" id="input-academic" v-model="academic" invalidFeedback="Verifica el campo"
                  required />
              </MDBCol>
              <MDBCol md="4">
                <MDBBtn class="logIn-form-button" @click="addRow('academic')" color="primary" block type="button">
                  Agregar
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow class="m-0">
              <MDBTable striped border class="mb-0 bg-white text-center" id="works-table">
                <thead class="bg-light">
                  <tr>
                    <th>Formación Académica</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(academic, index) in academics" :key="index">
                    <td>{{ academic }}</td>
                    <td>
                      <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm" @click="deleteRow(index, 'academic')">
                        <MDBIcon icon="trash" />
                      </MDBBtn>
                    </td>
                  </tr>
                </tbody>
              </MDBTable>
            </MDBRow>
          </MDBRow>
          
          <MDBRow>
            <MDBCol md="6">
              <MDBBtn @click="openModalWorkCV" class="mt-4 logIn-form-button" block>Atrás</MDBBtn>
            </MDBCol>
            <MDBCol md="6">
              <MDBBtn @click="openModalCertificationCV" class="mt-4 logIn-form-button" block>Siguiente</MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBModalBody>
    </MDBModal>

    <MDBModal id="modal-certification-cv" tabindex="-1" v-model="modalCertificationCV" 
      staticBackdrop centered v-if="!user.employee.cv">
      <MDBModalBody>
        <a href="#" class="text-reset">
          <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalCertificationCV = false" />
        </a>

        <FormInformation/>
        
        <form class="user-form form-options-text" novalidate>
          <MDBRow class="g-3">
            <MDBRow class="text-center">
              <h6 class="form-options-text mb-3">
                Agrega tus certificaciones  (etapa 4/6)
              </h6>
            </MDBRow>
            <MDBRow class="m-0 p-0 mb-4">
              <MDBCol md="8">
                <MDBInput type="text" label="Certificación" id="input-certification" v-model="certification" invalidFeedback="Verifica el campo"
                  required />
              </MDBCol>
              <MDBCol md="4">
                <MDBBtn class="logIn-form-button" @click="addRow('certification')" color="primary" block type="button">
                  Agregar
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow class="m-0">
              <MDBTable striped border class="mb-0 bg-white text-center" id="works-table">
                <thead class="bg-light">
                  <tr>
                    <th>Certificación</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(certification, index) in certifications" :key="index">
                    <td>{{ certification }}</td>
                    <td>
                      <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm" @click="deleteRow(index, 'certification')">
                        <MDBIcon icon="trash" />
                      </MDBBtn>
                    </td>
                  </tr>
                </tbody>
              </MDBTable>
            </MDBRow>
          </MDBRow>
          
          <MDBRow>
            <MDBCol md="6">
              <MDBBtn @click="openModalAcademicCV" class="mt-4 logIn-form-button" block>Atrás</MDBBtn>
            </MDBCol>
            <MDBCol md="6">
              <MDBBtn @click="openModalSkillCV" class="mt-4 logIn-form-button" block>Siguiente</MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBModalBody>
    </MDBModal>
    
    <MDBModal id="modal-skill-cv" tabindex="-1" v-model="modalSkillCV" 
      staticBackdrop centered v-if="!user.employee.cv">
      <MDBModalBody>
        <a href="#" class="text-reset">
          <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalSkillCV = false" />
        </a>

        <FormInformation/>
        
        <form class="user-form form-options-text" novalidate>
          <MDBRow class="g-3">
            <MDBRow class="text-center">
              <h6 class="form-options-text mb-3">
                Agrega tus habilidades  (etapa 5/6)
              </h6>
            </MDBRow>
            <MDBRow class="m-0 p-0 mb-4">
              <MDBCol md="8">
                <MDBInput type="text" label="Habilidad" id="input-skill" v-model="skill" invalidFeedback="Verifica el campo"
                  required />
              </MDBCol>
              <MDBCol md="4">
                <MDBBtn class="logIn-form-button" @click="addRow('skill')" color="primary" block type="button">
                  Agregar
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow class="m-0">
              <MDBTable striped border class="mb-0 bg-white text-center" id="works-table">
                <thead class="bg-light">
                  <tr>
                    <th>Habilidad</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(skill, index) in skills" :key="index">
                    <td>{{ skill }}</td>
                    <td>
                      <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm" @click="deleteRow(index, 'skill')">
                        <MDBIcon icon="trash" />
                      </MDBBtn>
                    </td>
                  </tr>
                </tbody>
              </MDBTable>
            </MDBRow>
          </MDBRow>
          
          <MDBRow>
            <MDBCol md="6">
              <MDBBtn @click="openModalCertificationCV" class="mt-4 logIn-form-button" block>Atrás</MDBBtn>
            </MDBCol>
            <MDBCol md="6">
              <MDBBtn @click="openModalDescriptionCV" class="mt-4 logIn-form-button" block>Siguiente</MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBModalBody>
    </MDBModal>

    <MDBModal id="modal-description-cv" tabindex="-1" v-model="modalDescriptionCV" 
      staticBackdrop centered v-if="!user.employee.cv">
      <MDBModalBody>
        <a href="#" class="text-reset">
          <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalDescriptionCV = false" />
        </a>

        <FormInformation/>
        
        <form class="user-form form-options-text" novalidate>
          <MDBRow class="g-3">
            <MDBRow class="text-center">
              <h6 class="form-options-text mb-3">
                ¡Estás por terminar! Agregar una descripción acerca de ti (etapa 6/6)
              </h6>
            </MDBRow>
            <MDBRow class="m-0 p-0 mb-4">
              <MDBTextarea label="Descripción" rows="4"
                id="input-description" v-model="description"
                invalidFeedback="Verifica el campo"
                required />
            </MDBRow>            
          </MDBRow>
          
          <MDBRow>
            <MDBCol md="6">
              <MDBBtn @click="openModalSkillCV" class="mt-4 logIn-form-button" block>Atrás</MDBBtn>
            </MDBCol>
            <MDBCol md="6">
              <MDBBtn @click="" class="mt-4 logIn-form-button" block>Registrar</MDBBtn>
            </MDBCol>
          </MDBRow>      
        </form>
      </MDBModalBody>
    </MDBModal>
  </section>  
</template>

<style scoped src="@/wwwroot/css/profile.css"></style>
<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/modal-cv.js"></script>