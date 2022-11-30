<template>
  <MDBNavbar light container class="shadow-0 background">
    <MDBNavbarBrand href="#">
      <img src="@/assets/logo.svg" alt="logo" class="logo" />
    </MDBNavbarBrand>
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

    <div class="background form-container">
      <div class="logIn-form logIn-form-container shadow-5-strong d-flex justify-content-between">
        <form class="g-3 logIn-form needs-validation" novalidate @submit.prevent="login">
          <MDBRow>
              <h2 class="text-center form-title mb-4">Inicio de Sesión</h2>
          </MDBRow>

          <MDBRow>
            <p id="message-login" class="text-center form-options-text form-options-text-title mb-4">
              Encuentra el trabajo de tus sueños
            </p>
          </MDBRow>

          <MDBRow class="g-3">
            <MDBCol md="12" class="mb-2">
              <MDBInput type="email" label="Correo electrónico" v-model="email" id="input-email"
                invalidFeedback="Verifica tu email"
                required
                />
            </MDBCol>
            <MDBCol md="12">              
              <MDBInput type="password" label="Contraseña" v-model="password"
                class="input-password" id="input-password" invalidFeedback="Verifica tu contraseña" autocomplete="on" required inputGroup>
                <span outline="primary" class="password-span input-group-text border-0" @click="showPassword">
                  <MDBIcon icon="eye" size="lg" class="password-icon"/>
                </span>
              </MDBInput>
            </MDBCol>
            <MDBCol md="12" class="mt-4">
              <a @click="modalChangePassword = true" class="form-options-text form-link">                 
                ¿Olvidaste tu contraseña?
              </a>
            </MDBCol>            
          </MDBRow>
          
          <MDBBtn type="submit" class="mt-4 logIn-form-button" block> 
            Ingresar
            <MDBSpinner id="spinner-login" class="ms-2 d-none" tag="span" size="sm" />
          </MDBBtn>

          <MDBRow class="mt-4">
            <p class="text-center form-options-text">─ O Inicia Sesión con ─</p>
          </MDBRow>

          <MDBRow class="mb-4 d-flex justify-content-center">
            <MDBBtn outline="dark" @click="loginWithGoogle()">
              <MDBIcon iconStyle="fab" icon="google"></MDBIcon>
                <strong>
                  Google
                </strong>  
            </MDBBtn>
          </MDBRow>

          <MDBRow class="text-center form-options-text">
            <p id="register-button-login" @click="modalRegisterUser = true">
              ¿No tienes una cuenta? 
              <a href="#" class="text-reset fw-bolder">Regístrate</a>              
            </p>
          </MDBRow>
        </form>                  
      </div>      
    </div>  
  </section>
  
  <section>
    <MDBModal id="modalRegisterUser" tabindex="-1" v-model="modalRegisterUser"
      staticBackdrop
      centered>
      <MDBModalBody>
        <a href="#" class="text-reset">
          <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalRegisterUser = false"/>
        </a> 

        <MDBModalTitle class="text-center form-title">
          Registro de Usuarios
        </MDBModalTitle>

        <form @submit.prevent="registerNewUser" class="user-form" novalidate>        
          <MDBRow class="g-4">
            <MDBCol>
              <p id="message-register" class="text-center mt-3">
                Registrate para encontrar ofertas laborales para ti
              </p>
            </MDBCol>

            <MDBCol md="12">
              <MDBInput type="text" label="Nombre Completo" id="input-full-name" v-model="fullName"
                counter :maxlength="50"
                invalidFeedback="Verifica tu nombre completo"
                required/>
            </MDBCol>
            
            <MDBCol md="12">
              <MDBInput type="text" label="RFC" id="input-rfc" v-model="rfc"
                counter :maxlength="13" 
                invalidFeedback="Verifica tu RFC" 
                required/>            
            </MDBCol>

            <MDBCol md="12">
              <MDBInput type="tel" label="Número telefónico" id="input-phone-number" v-model="phoneNumber"
                counter :maxlength="10"
                invalidFeedback="Verifica tu número telefónico" 
                required/>            
            </MDBCol>

            <MDBCol md="12">
              <MDBInput type="email" label="Correo elétronico" id="input-email-register" v-model="emailRegister"
                invalidFeedback="Verifica tu correo elétronico" 
                required/>            
            </MDBCol>

            <MDBCol md="12">
              <MDBInput type="password" label="Contraseña" id="input-password-register" v-model="passwordRegister"
                invalidFeedback="Recuerda usar mayusculas, minusculas, números y símbolos" 
                formText="Usa 8 o más caracteres con una combinación de mayusculas, minusculas, números y símbolos"
                required
                inputGroup>
                <span outline="primary" class="password-span input-group-text border-0" @click="showPassword">
                  <MDBIcon icon="eye" size="lg" class="password-icon"/>
                </span>
              </MDBInput>            
            </MDBCol>
          </MDBRow>
          
          <MDBRow class="mt-4">          
            <MDBRow class="mx-0">
              <MDBCol md="3" class="p-0 m-0">
                <p>Quiero ser:</p>
              </MDBCol>
              <MDBCol md="4" class="p-0 m-0">
                <MDBRadio label="Reclutador" value="Recruiter" inline name="userRole" required
                  invalidFeedback="Selecciona un puesto" v-model="role"/>
              </MDBCol>
              <MDBCol md="4" class="p-0 m-0">
                <MDBRadio label="Empleado" value="Employee" inline name="userRole" required v-model="role"/>
              </MDBCol>
            </MDBRow>        
          </MDBRow>
          
          <MDBCol class="text-center mt-4">
            <MDBCheckbox label="Acepto Condiciones y Política de Privacidad" class="text-center"
              required
              inline/>          
          </MDBCol>
          
          <MDBBtn id="register-user-button" type="submit" class="mt-2 logIn-form-button" block>
            Registrarse
          </MDBBtn>
        </form>
      </MDBModalBody>
    </MDBModal>
  </section>
  
  <section>
    <MDBModal id="modal-change-password" tabindex="-1" v-model="modalChangePassword"
      staticBackdrop
      centered>
      <MDBModalBody>
        <a href="#" class="text-reset">
          <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalChangePassword = false"/>
        </a> 

        <MDBModalTitle class="text-center form-title">
          Olvide mi contraseña
        </MDBModalTitle>

        <form @submit.prevent="changePassword" class="user-form" novalidate>        
          <MDBRow class="g-3">
            <MDBCol>
              <p id="message-change-password" class="text-center mt-2">
                No te preocupes, ¡nosotros te ayudamos! 😊
              </p>
            </MDBCol>

            <MDBCol md="12">
              <MDBInput type="email" label="Correo elétronico" id="input-email-new" v-model="emailNew"
                invalidFeedback="Verifica tu correo elétronico" 
                required/>            
            </MDBCol>            
          </MDBRow>
            
          <MDBBtn id="change-password-button" type="submit" class="mt-4 logIn-form-button" block>Cambiar contraseña</MDBBtn>
        </form>
      </MDBModalBody>
    </MDBModal>
  </section>
</template>
  
<style scoped src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/logIn.js"></script>
