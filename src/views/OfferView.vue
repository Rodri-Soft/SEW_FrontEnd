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
                <ProfileMainMenu/>
            </div>

            <div class="col-lg-6 p-lg-0">
                <h2>Mis Ofertas</h2>     
                <h3 v-show="emptyOffers == true" class="mt-5 text-center">No hay ofertas por mostrar 🤔</h3>           
                <OfferItem v-for="(offer, i) in offerInformation"
                            :key="i"
                            :personalOffers="offer"
                            v-on:alterOfferItem="alterOfferItem(i)"
                            v-on:removeOfferItem="removeOfferItem(i)"                    
                            v-on:showOffer="showOffer(i)"
                            v-on:consultOffer="consultOffer(i)" />                    
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
            <a tag="button" class="text-reset">
                <MDBIcon icon="close" size="lg" class="d-flex justify-content-end" @click="closeOfferModal()"/>
            </a> 

            <MDBModalTitle v-show="update == false" class="text-center form-title">
                Crear Nueva Oferta
            </MDBModalTitle>
            <MDBModalTitle v-show="update == true" class="text-center form-title">
                Actualiza una Oferta
            </MDBModalTitle>

            <form id="offerForm" @submit.prevent="manageOfferForm" class="user-form" novalidate>        
                <MDBRow class="g-3">
                    <MDBCol>
                    <p v-show="update == false" id="message-publish" class="text-center mt-3">                    
                        Crea una nueva oferta laboral para compartir
                    </p>
                    <p v-show="update == true" id="message-update" class="text-center mt-3">                    
                        Actualiza la información de tu oferta
                    </p>
                    </MDBCol>

                    <MDBCol md="12">
                        <MDBInput type="text" label="Título" id="input-offer-title" v-model="title"
                            invalidFeedback="Verifica el título" 
                            required/>
                    </MDBCol>

                    <MDBCol md="12">
                        <div class="select">
                            <select name="combobox-category" id="combobox-offer-category" v-model="category">
                                <option value="null" selected disabled>Seleccione una categoría</option>
                                <option value="Servicios">Servicios</option>
                                <option value="Industria manufacturera">Industria manufacturera</option>
                                <option value="Tecnología y telecomunicaciones">Tecnología y telecomunicaciones</option>
                                <option value="Alimentos y bebidas">Alimentos y bebidas</option>
                                <option value="Construcción">Construcción</option>
                            </select>
                        </div>
                    </MDBCol>

                    <MDBCol md="12">
                        <MDBInput type="text" label="Jornada Laboral" id="input-offer-workday" v-model="workday"
                            invalidFeedback="Verifica la jornada laboral" 
                            required/>            
                    </MDBCol>
                    
                    <MDBCol md="12">
                        <MDBTextarea rows="4" type="text" label="Descripción" id="textarea-offer-description" v-model="description" 
                            invalidFeedback="Verifica la descripción" 
                            required/>            
                    </MDBCol>                               
                    
                    <MDBCol md="12">
                        <MDBTextarea rows="4" type="text" label="Experiencia Laboral" id="textarea-offer-experience" v-model="experience"
                            invalidFeedback="Verifica la experiencia laboral " 
                            required/>            
                    </MDBCol>                               
                </MDBRow>                                               
                
                <MDBBtn id="publish-offer-button" v-show="update == false" type="submit" class="mt-4 backgroundFont" block>Publicar</MDBBtn>
                <MDBBtn id="update-offer-button" v-show="update == true" type="submit" class="mt-4 backgroundFont" block>Actualizar</MDBBtn>
            </form>
        </MDBModalBody>
        </MDBModal>
    </section>
</template>

<style scoped src="@/wwwroot/css/offer.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/offer.js"></script>