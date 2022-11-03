<template>
  <!-- <div>      
    <HelloWorld msg="LogIn"/>
  </div> -->

  <!-- <div class="bg-image logIn-background">
	</div> -->

  <MDBNavbar light container class="shadow-0">
    <MDBNavbarBrand href="#">
      <!-- <div> -->
      <img src="@/assets/logo.svg" alt="..." class="logo"/>
      <!-- </div>       -->
    </MDBNavbarBrand>
  </MDBNavbar>

  <section>
    <div class="background">
      <div class="d-flex justify-content-between logIn-background">

        <div class="logIn-background-left"><img src="@/assets/loginBackground-left.svg" class="img-fluid" alt="..." />
        </div>

        <div class="logIn-background-right"><img src="@/assets/loginBackground-right.svg" class="img-fluid" alt="..." />
        </div>

      </div>
    </div>

    <div class="background form-container">
      <div class="logIn-form shadow-5-strong">
        <form>

          <p class="text-center form-title">Inicio de Sesión</p>

          <p class="text-center form-text form-text-title">Encuentra el trabajo de tus sueños</p>

          <!-- Email input -->
          <MDBInput type="email" label="Email" id="form2Email" v-model="form2Email" wrapperClass="mb-4" />
          <!-- Password input -->
          <MDBInput type="password" label="Contraseña" id="form2Password" v-model="form2Password" wrapperClass="mb-4" />
          <!-- 2 column grid layout for inline styling -->
          <MDBRow class="mb-4">            
            <MDBCol>
              <!-- Simple link -->
              <a href="#!" class="form-text">Olvidaste tu contraseña?</a>
            </MDBCol>
          </MDBRow>
          <!-- Submit button -->
          <MDBBtn block class="logIn-form-button"> Ingresar </MDBBtn>

          <p class="text-center form-text">─ O Inicia Sesión con ─</p>

          <!-- Register buttons -->
          <div class="text-center">
            <p>Not a member? <a href="#!">Register</a></p>
            <p>or sign up with:</p>
            <MDBBtn color="primary" floating class="mx-1">
              <MDBIcon iconStyle="fab" icon="facebook-f" />>
            </MDBBtn>

            <MDBBtn color="primary" floating class="mx-1">
              <MDBIcon iconStyle="fab" icon="google" />
            </MDBBtn>

            <MDBBtn color="primary" floating class="mx-1">
              <MDBIcon iconStyle="fab" icon="twitter" />
            </MDBBtn>

            <MDBBtn color="primary" floating class="mx-1">
              <MDBIcon iconStyle="fab" icon="github" />
            </MDBBtn>
          </div>
        </form>
      </div>
    </div>

  </section>



</template>
  
<style scoped src="@/wwwroot/css/logIn.css">

</style>
<script src="@/wwwroot/js/logIn.js"></script>