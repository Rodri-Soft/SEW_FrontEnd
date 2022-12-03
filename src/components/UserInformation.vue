<template>
  <MDBRow class="m-0 mb-2 ">
    <MDBCol md="10" class="offset-md-1">
      <MDBCard shadow="0">
        <MDBCardImg src="https://source.unsplash.com/random/1920x112" alt="Imagen de fondo de perfil" 
          class="text-center m-0 p-0 bg-image" id="profile-background" top style="height: 7rem;"/>
        <!-- <MDBCardImg :src=this.profileImage alt="Imagen de fondo de perfil" 
          class="text-center m-0 p-0 bg-image" id="profile-background" top style="height: 7rem;"/> -->
        <MDBCardBody class="text-center">
          <div class="img-fluid outer-circle shadow-6 text-center">
            <img src="https://source.unsplash.com/random/160x160/?person" 
              class="img-fluid rounded-circle"
              alt="Townhouses and Skyscrapers" 
              id="profile-image" />          
          </div>
          <h2 class="text-center form-title" 
            v-if="user.employee">
            {{ user.employee.fullName }}
            <a class="m-1 form-options-text btn btn-link btn-floating" href="#!"
              role="button"
              @click="(modalUserEdit = true)">
              <MDBIcon icon="pencil-alt" size="lg" />
            </a>  
          </h2>
          <h2 class="text-center form-title" 
            v-else>
            {{ user.recruiter.fullName }}
            <a class="m-1 form-options-text btn btn-link btn-floating" href="#!"
              role="button"
              @click="(modalUserEdit = true)">
              <MDBIcon icon="pencil-alt" size="lg" />
            </a>
          </h2>
          <a class="m-1" @click="modalUserInformation = true" href="#" role="button">
            Información de contacto
          </a>  
          <MDBCardText class="text-muted form-options-text" 
            v-if="user.role == 'Employee'">
            Trabajador
          </MDBCardText>
  
          <MDBCardText class="mb-2 text-muted form-options-text" 
            v-else>
            Reclutador / {{ user.recruiter.charge }}
          </MDBCardText>
  
          <MDBRow class="m-0 d-flext justify-content-center" 
            v-if="user.recruiter" >
            <MDBBadge class="text-wrap py-2 form-options-text logIn-form-button rounded-7" 
              style="width: 7rem;">
              Seguidores            
              {{ user.recruiter.followers.length }}
            </MDBBadge>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>

  <MDBModal id="modal-user-information" tabindex="-1" v-model="modalUserInformation" centered>
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          @click="modalUserInformation = false, fillEditModalFields()" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Información de contacto
      </MDBModalTitle>

      <MDBRow>
        <MDBRow class="my-4 mx-2">
          <MDBCol col="1">
            <MDBIcon icon="envelope" size="lg" class="mr-2" />
          </MDBCol>
          <MDBCol col="11">
            <h6 class="fw-normal">Enviar email</h6>
            <a :href="('mailto:' + user.email)" target="_blank">
              {{ user.email }}
            </a>
          </MDBCol>
        </MDBRow>
        <MDBRow class="mb-4 mx-2">
          <MDBCol col="1">
            <i class="fab fa-whatsapp fa-lg mr-2"></i>
          </MDBCol>
          <MDBCol col="11">
            <h6 class="fw-normal">Enviar Whatsapp</h6>
            <a :href="('https://wa.me/' + user.employee.phone)" target="_blank" 
              v-if="user.employee">
              {{ user.employee.phone }}
            </a>
            <a :href="('https://wa.me/' + user.recruiter.phone)" target="_blank" 
              v-else-if="user.recruiter">
              {{ user.recruiter.phone }}
            </a>
          </MDBCol>
        </MDBRow>
      </MDBRow>      
    </MDBModalBody>
  </MDBModal>

  <MDBModal tabindex="-1" staticBackdrop centered v-model="modalUserEdit">
    <MDBModalBody>
      <a href="#" class="text-reset">
        <MDBIcon icon="close" size="lg" class="d-flex justify-content-end"
          @click="modalUserEdit = false" />
      </a>

      <MDBModalTitle class="text-center form-title">
        Mi información
      </MDBModalTitle>

      <p class="text-center mt-4 form-options-text" id="message-user-edit">
        Recuerda mantener tu información actualizada
      </p>
      <MDBSpinner id="spinner-user-edit" class="d-none" size="sm" />

      <MDBRow>
        <form class="form-options-text needs-validation"
          id="form-user-edit" novalidate 
          @submit.prevent="createEditInformationUser">
          <MDBRow class="my-4 mx-2">
            <MDBCol col="1" class="d-flex align-items-center">
              <MDBIcon icon="user" size="lg" class="mr-2" />
            </MDBCol>
            <MDBCol col="11">            
              <MDBInput type="text" class="form-control" name="fullName" id="input-fullName-edit"
                counter :maxlength="50" label="Nombre completo" invalidFeedback="Verifica tu nombre completo" 
                v-model="fullName"
                v-if="user.employee"/>
              <MDBInput type="text" class="form-control" name="fullName" id="input-fullName-edit"
                counter :maxlength="50" label="Nombre completo" invalidFeedback="Verifica tu nombre completo" 
                v-model="fullName"
                v-else/>
            </MDBCol>
          </MDBRow>
          <MDBRow class="mb-4 mx-2">
            <MDBCol col="1" class="d-flex align-items-center">
              <MDBIcon icon="envelope" size="lg" class="mr-2"/>
            </MDBCol>
            <MDBCol col="11">
              <MDBInput type="email" class="form-control" name="email" id="input-email-edit"
                label="Correo electrónico" invalidFeedback="Verifica tu correo electrónico" 
                v-model="email"/>
            </MDBCol>
          </MDBRow>
          <MDBRow class="mb-4 mx-2">
            <MDBCol col="1" class="d-flex align-items-center">
              <MDBIcon icon="id-card" size="lg" class="mr-2"/>
            </MDBCol>
            <MDBCol col="11">
              <MDBInput type="text" class="form-control" name="rfc" id="input-rfc-edit"
                counter :maxlength="13" label="RFC" invalidFeedback="Verifica tu RFC" 
                v-model="rfc"/>
            </MDBCol>
          </MDBRow>
          <MDBRow class="mb-4 mx-2">
            <MDBCol col="1" class="d-flex align-items-center">
              <MDBIcon icon="phone" size="lg" class="mr-2"/>
            </MDBCol>
            <MDBCol col="11">
              <MDBInput type="tel" class="form-control" name="phone" id="input-phone-edit"
                counter :maxlength="10" invalidFeedback="Verifica tu número telefónico" 
                label="Número telefónico"  v-model="phone"
                v-if="user.employee"/>
              <MDBInput type="tel" class="form-control" name="phone" id="input-phone-edit"
                counter :maxlength="10" invalidFeedback="Verifica tu número telefónico" 
                label="Número telefónico" v-model="phone"
                v-else/>
            </MDBCol>
          </MDBRow>
          <MDBRow class="mb-4 mx-2"
           v-if="user.recruiter">
            <MDBCol col="1" class="d-flex align-items-center">
              <MDBIcon icon="building" size="lg" class="mr-2"/>
            </MDBCol>
            <MDBCol col="11">
              <MDBInput type="text" class="form-control" name="charge" id="input-charge-edit"
                counter :maxlength="20" invalidFeedback="Verifica tu número cargo en la empresarial" label="Cargo empresarial" v-model="charge"/>
            </MDBCol>
          </MDBRow>
          <MDBRow class="mx-3 my-4 mt-5 d-flex justify-content-center">
            <MDBBtn class="logIn-form-button" type="submit" block>
              Guardar
            </MDBBtn>
          </MDBRow>
        </form>
      </MDBRow>  
    </MDBModalBody>
  </MDBModal>
</template>

<style scoped src="@/wwwroot/css/logIn.css"></style>
<style scoped src="@/wwwroot/css/user-information.css"></style>
<script src="@/wwwroot/js/user-information.js"></script>