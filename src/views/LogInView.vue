<template>

  
  <MDBNavbar light container class="shadow-0 background">
    <MDBNavbarBrand href="#">
      <img src="@/assets/logo.svg" alt="..." class="logo" />
    </MDBNavbarBrand>
  </MDBNavbar>

  <section>

    <div class="background background-images">
      <div class="d-flex justify-content-between logIn-background">

        <div id="background-left-container" class="logIn-background-left">
          <img src="@/assets/loginBackground-left.svg" class="img-fluid" alt="background-left" />
        </div>

        <div id="background-right-container" class="logIn-background-right">
          <img src="@/assets/loginBackground-right.svg" class="img-fluid" alt="background-right" />
        </div>

      </div>
    </div>

    <div class="background form-container">
      <div class="logIn-form logIn-form-container shadow-5-strong d-flex justify-content-between">
        <form class="logIn-form">
          
          <MDBRow>
            <MDBCol>
              <p class="text-center form-title">Inicio de Sesión</p>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <p class="text-center form-text form-text-title">Encuentra el trabajo de tus sueños</p>
            </MDBCol>
          </MDBRow>

          <!-- Email input -->
          <MDBInput type="email" label="Email" id="form2Email" v-model="form2Email" wrapperClass="mb-4" />
          <!-- Password input -->
          <MDBInput type="password" label="Contraseña" id="form2Password" v-model="form2Password"
            wrapperClass="mb-2" />
          <!-- 2 column grid layout for inline styling -->

          <MDBRow class="mb-4">
            <MDBCol>
              <!-- Simple link -->
              <a href="#!" class="form-text form-link">¿Olvidaste tu contraseña?</a>
            </MDBCol>
          </MDBRow>

          <!-- Submit button -->
          <MDBBtn block class="logIn-form-button"> Ingresar </MDBBtn>

          <MDBRow class="mt-4">
            <MDBCol>
              <p class="text-center form-text">─ O Inicia Sesión con ─</p>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol class="d-flex justify-content-center">
              <MDBBtn tag="a" class="button-google" href="#!" outline="dark">
                <MDBIcon iconStyle="fab" icon="google"></MDBIcon>
                Google
              </MDBBtn>
            </MDBCol>
          </MDBRow>

          <MDBRow class="mt-3">
            <MDBCol class="text-center form-text">
              <p>¿No tienes una cuenta? <a href="#!">Regístrate</a></p>
            </MDBCol>
          </MDBRow>                                  

        </form>          
      </div>
    </div>      

  </section>

</template>
  
<style scoped src="@/wwwroot/css/logIn.css">

</style>
<script src="@/wwwroot/js/logIn.js"></script>