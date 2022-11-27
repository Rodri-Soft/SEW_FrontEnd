<template>
  <section>
    <form class="user-form form-options-text" 
      @submit.prevent novalidate>
      <MDBRow class="g-3">
        <MDBRow class="text-center">
          <h6 class="form-options-text mt-3 mb-4">
            {{ supportInformation }}
          </h6>
        </MDBRow>

        <MDBRow class="m-0 p-0"
          v-if="isTableVisible">
          <MDBRow class="m-0 mb- p-0">
            <MDBCol md="8">
              <MDBInput type="text" v-bind:label=labelName v-bind:id="inputName" v-model="input" counter
                v-bind:maxlength="inputMax"
                invalidFeedback="Verifica el campo" required/>
            </MDBCol>
            <MDBCol md="4">
              <MDBBtn class="logIn-form-button" color="primary" type="button" block 
                @click="addRow()">
                Agregar
              </MDBBtn>
            </MDBCol>
          </MDBRow>
  
          <MDBRow class="m-0">
            <p class="text-center mt-4">{{ tableTitle }}</p>
  
            <MDBTable striped border class="mb-0 bg-white text-center">
              <thead class="bg-light">
                <tr>
                  <th>{{ elementName }}</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(element, index) in elements" :key="index">
                  <td>{{ element }}</td>
                  <td>
                    <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm"
                      @click="deleteRow(index, elements)">
                      <MDBIcon icon="trash" />
                    </MDBBtn>
                  </td>
                </tr>
              </tbody>
            </MDBTable>
          </MDBRow>
        </MDBRow>
        
        <MDBRow v-else class="m-0 p-0 mb-4">
          <MDBTextarea label="Descripción" rows="4" v-bind:id="inputName" v-model="description" maxlength="250"
            invalidFeedback="Verifica el campo" required />
        </MDBRow>
      </MDBRow>

      <MDBRow>
        <MDBCol md="6">
          <MDBBtn class="mt-4 logIn-form-button" block 
            v-if="isButtonPreviusVisible" 
            @click="previousStage()">
            Atrás
          </MDBBtn>
        </MDBCol>
        <MDBCol md="6" 
          v-if="isRegister">
          <MDBBtn class="mt-4 logIn-form-button" block              
            @click="registerCV()">
            Registrarse
          </MDBBtn>
        </MDBCol>
        <MDBCol  md="6"
          v-else>
          <MDBBtn class="mt-4 logIn-form-button" block 
            v-if="elements.length > 0" 
            @click="nextStage()">
            Siguiente
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </form>
  </section>
</template>

<style scoped src="@/wwwroot/css/profile.css"></style>
<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/cv-item-form.js"></script>