<template>
  <MDBBtn class="text-center logIn-form-button my-4" 
    @click="cvModal = true">
    Agregar
  </MDBBtn>

  <MDBModal tabindex="-1" staticBackdrop centered v-model="cvModal">
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          data-mdb-toggle="tooltip" title="Cerrar"
          @click="cvModal = false, closeCVStages()" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Curriculum Vitae
      </MDBModalTitle>

      <MDBCol class="mb-4">
        <p id="message-register" class="text-center mt-3 form-options-text">
          Aún no has agregado tu CV, por favor llena el siguiente formulario para poder mostrar tu información
        </p>
      </MDBCol>
      <MDBSpinner id="spinner-register-cv" class="d-none" size="sm" />
      
      <CVItemForm 
        supportInformation='Agrega todos los idiomas que domines (etapa 1/6)'
        tableTitle='Tabla con idioma agregados' 
        elementName='Idioma' elementMax='50' inputId='input-language'
        @next-stage="showStageTwo" isTableVisible v-show="isStageOneVisible" />
      
      <CVItemForm 
        supportInformation='Agrega tus experiencias laborales  (etapa 2/6)'
        tableTitle='Tabla con experiencias laborales agregadas' 
        elementName='Experiencia Laboral' elementMax='200' inputId='input-work'
        @previous-stage="showStageOne" @next-stage="showStageThree" isButtonPreviusVisible
        isTableVisible v-show="isStageTwoVisible" />

      <CVItemForm 
        supportInformation='Agrega tu formación académica (etapa 3/6)'
        tableTitle='Tabla con formación academica agregada' 
        elementName='Formación Académica' elementMax='200' inputId='input-academic' 
        @previous-stage="showStageTwo" @next-stage="showStageFour" isButtonPreviusVisible
        isTableVisible v-show="isStageThreeVisible" />

      <CVItemForm 
        supportInformation='Agrega tus certificaciones (etapa 4/6)'
        tableTitle='Tabla con certificaciones agregadas' 
        elementName='Certificación' elementMax='200' inputId='input-certification' 
        @previous-stage="showStageThree" @next-stage="showStageFive"
        isButtonPreviusVisible isTableVisible v-show="isStageFourVisible" />

      <CVItemForm 
        supportInformation='Agrega tus habilidades (etapa 5/6)' 
        tableTitle='Tabla con habilidades agregadas'
        elementName='Habilidad' elementMax='200' inputId='input-skill' 
        @previous-stage="showStageFour" @next-stage="showStageSix" 
        isButtonPreviusVisible isTableVisible v-show="isStageFiveVisible" />

      <CVItemForm 
        supportInformation='¡Estás por terminar! Agregar una descripción acerca de ti (etapa 6/6)'
        elementName='Descripción' elementMax='200' inputId='input-description' 
        @previous-stage="showStageFive" @register-cv="createCV" 
        isButtonPreviusVisible isRegister v-show="isStageSixVisible" />
    </MDBModalBody>
  </MDBModal>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/form-cv.js"></script>

<style scoped>
  #spinner-register-cv {
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;
  }
</style>