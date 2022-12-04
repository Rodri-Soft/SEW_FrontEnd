<template style="background-color: red;">
  <MDBNavbar light container class="shadow-0" position="top">
    <router-link to="/login">
      <MDBNavbarBrand>
        <img src="@/assets/logo-sew.svg" alt="logo" class="logo" />
      </MDBNavbarBrand>
    </router-link>
  </MDBNavbar> 

  <section>
    <div class="background background-images">
      <div class="d-flex justify-content-between logIn-background">
        <div id="background-left-container" class="logIn-background-left">
          <img src="@/assets/loginBackground-left.svg" class="img-fluid" alt="Background image" />
        </div>
  
        <div id="background-right-container" class="logIn-background-right">
          <img src="@/assets/loginBackground-right.svg" class="img-fluid" alt="Background image" />
        </div>
      </div>
    </div>

    <MDBRow class="m-0 background form-container"> 
      <MDBCol md="4" class="d-flex align-items-center justify-content-center">
        <MDBCard shadow="6" class="p-4">
          <MDBCardBody>
            <h2 class="form-title text-center">Cambiar Contraseña</h2>
            <p class="text-center form-options-text" id="message-change-password">
              Recuerda usar 8 o más caracteres con una combinación de mayusculas, minusculas, números y símbolos
            </p>
            <MDBSpinner id="spinner" class="d-none m-auto d-flex mb-4" tag="span" size="sm" />
            <form id="form-change-password" class="needs-validation" novalidate
            @submit.prevent="changePassword">
              <MDBRow class="g-4">                
                <MDBCol md="12">
                  <MDBInput type="password" label="Nueva Contraseña" id="input-new-password"
                    invalidFeedback="Verifica que la contrasaña" required inputGroup
                    v-model="newPassword">
                    <span outline="primary" class="password-span input-group-text border-0" @click="showPassword">
                      <MDBIcon icon="eye" size="lg" class="password-icon"/>
                    </span>
                  </MDBInput>
                </MDBCol>
                
                <MDBCol md="12">
                  <MDBInput type="password" label="Confirmación de Contraseña" id="input-password-confirm"
                    invalidFeedback="Las contrasaña no coinciden" required inputGroup 
                    v-model="passwordConfirm" >
                    <span outline="primary" class="password-span input-group-text border-0" 
                      @click="showPassword">
                      <MDBIcon icon="eye" size="lg" class="password-icon" />
                    </span>
                  </MDBInput>
                </MDBCol>                  
                
                <MDBCol md="12">
                  <MDBBtn type="submit" class="mt-3 logIn-form-button" block>
                    Cambiar Contraseña
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </section>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/change-password.js"></script>
<style>
  .user-form {
    padding: 0 7% 5%;
  }
</style>