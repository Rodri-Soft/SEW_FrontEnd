<template>

    <Navbar class="mb-4" />

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 mb-3">
                <h1>Ofertas</h1>
                <MDBRow>
                    <MDBCol id="newOfferButton" col="12">
                        <MDBBtn @click="modalAddOffer = true" class="mt-2 mb-2 shadow-0 backgroundFont profileCard buttonPadding buttonHover">
                            <i class="fas fa-plus me-2 fa-lg"></i>
                            Crear Nueva Oferta
                        </MDBBtn>                         
                    </MDBCol>                    
                </MDBRow>                        
                <ProfileMainMenu :user="userObject" />
            </div>

            <div class="col-lg-6 p-lg-0">
                <h2>Mis Ofertas</h2>                
                <OfferItem v-for="(offer, i) in offerInformation" :key="i"
                            :personalOffers="offer" />
                    
            </div>

            <div class="col-lg-3 mb-3">
                <div class="col col-sm-12">
                    <div class="d-flex justify-content-lg-end justify-content-center">
                        <Category/>
                    </div>
                </div>                
            </div>
        </div>
    </div>

    <section>
        <MDBModal id="modalAddOffer" tabindex="-1" v-model="modalAddOffer"
        staticBackdrop
        centered>
        <MDBModalBody>
            <a href="#" class="text-reset">
            <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="modalAddOffer = false"/>
            </a> 

            <MDBModalTitle class="text-center form-title">
                Crear Nueva Oferta
            </MDBModalTitle>

            <form @submit.prevent="registerNewUser" class="user-form" novalidate>        
            <MDBRow class="g-3">
                <MDBCol>
                <p id="message-register" class="text-center mt-3">                    
                    Crea una nueva oferta laboral para compartir
                </p>
                </MDBCol>

                <MDBCol md="12">
                    <MDBInput type="text" label="Título" id="input-full-name" v-model="fullName"
                        invalidFeedback="Verifica tu nombre completo" 
                        required/>
                </MDBCol>
                
                <MDBCol md="12">
                    <MDBInput type="text" label="Descripción" id="input-rfc" v-model="rfc" 
                        invalidFeedback="Verifica tu RFC" 
                        required/>            
                </MDBCol>

                <MDBCol md="12">
                    <MDBInput type="phone" label="Categoría" id="input-phone-number" v-model="phoneNumber"
                        invalidFeedback="Verifica tu número telefónico" 
                        required/>            
                </MDBCol>

                <MDBCol md="12">
                    <div class="select">
                        <select name="format" id="format">
                            <option selected disabled>Choose a book format</option>
                            <option value="pdf">PDF</option>
                            <option value="txt">txt</option>
                            <option value="epub">ePub</option>
                            <option value="fb2">fb2</option>
                            <option value="mobi">mobi</option>
                        </select>
                    </div>
                </MDBCol>

                <MDBCol md="12">
                    <MDBInput type="email" label="Experiencia" id="input-email-register" v-model="emailRegister"
                        invalidFeedback="Verifica tu correo elétronico" 
                        required/>            
                </MDBCol>

                <MDBCol md="12">
                    <MDBInput type="email" label="Jornada Laboral" id="input-workday-register" v-model="emailRegister"
                        invalidFeedback="Verifica tu correo elétronico" 
                        required/>            
                </MDBCol>

                <!-- <MDBCol md="12">
                <MDBInput type="password" label="Contraseña" id="input-password-register" v-model="passwordRegister"
                    invalidFeedback="Recuerda usar mayusculas, minusculas, números y símbolos" 
                    formText="Usa 8 o más caracteres con una combinación de mayusculas, minusculas, números y símbolos"
                    required
                    inputGroup>
                    <span outline="primary" class="password-span input-group-text border-0" @click="showPassword">
                    <MDBIcon icon="eye" size="lg" class="password-icon"/>
                    </span>
                </MDBInput>            
                </MDBCol> -->
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
            
            <MDBBtn id="register-user-button" type="submit" class="mt-2 logIn-form-button" block>Registrarse</MDBBtn>
            </form>
        </MDBModalBody>
        </MDBModal>
    </section>

</template>

<style scoped src="@/wwwroot/css/offer.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/offer.js"></script>