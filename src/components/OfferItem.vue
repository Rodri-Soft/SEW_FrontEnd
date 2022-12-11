<template>

    <MDBCard text="center backgroundFont mb-3">
        <MDBCardHeader>
            <div class="d-flex justify-content-end">            
                <MDBDropdown v-model="offerDropdownOptions">
                    <a id="offerEllipsisOptionsIcon" @click="offerDropdownOptions = !offerDropdownOptions">                        
                        <i class="fas fa-ellipsis-v ellipsisIcon fa-lg"></i>
                    </a>
                    <MDBDropdownMenu id="offerDropDownEllipsis" aria-labelledby="offerDropdownMenuButtonEllipsis"
                        class="dropdownMenuButton-ellipsis">
                        <MDBDropdownItem tag="button" v-on:click="remove">Eliminar</MDBDropdownItem>                       
                        <MDBDropdownItem tag="button" v-on:click="alter">Modificar</MDBDropdownItem>                       
                        <MDBDropdownItem tag="button" v-on:click="showOffer">Imprimir</MDBDropdownItem>                       
                    </MDBDropdownMenu>
                </MDBDropdown>                
            </div>

            <div>                                
                <!-- <a tag="button" v-on:click="consultOffer" class="text-decoration-none fs-3">{{personalOffers.title}}</a>  -->
                <h3>{{personalOffers.title}}</h3>               
            </div>

        </MDBCardHeader>

        <MDBCardBody class="offer-content">
            <!-- <h5 class="text-start">Descripción</h5>
            <MDBCardText class="text-start">
                {{personalOffers.description}}
            </MDBCardText>

            <h5 class="text-start">Categoría</h5>
            <MDBCardText class="text-start">
                {{personalOffers.category}}
            </MDBCardText>

            <h5 class="text-start">Experiencia</h5>
            <MDBCardText class="text-start">
                {{personalOffers.experience}}
            </MDBCardText>

            <h5 class="text-start">Jornada Laboral</h5>
            <MDBCardText class="text-start">
                {{personalOffers.workday}}
            </MDBCardText> -->

            <MDBRow class="row">
            
                <MDBCol class="mb-4" col="12" lg="6">
                    <h5 class="text-start">Descripción</h5>
                    <MDBCardText class="text-start">
                        {{personalOffers.description}}
                    </MDBCardText>
                </MDBCol>

                <MDBCol class="mb-4" col="12" lg="6">
                    <h5 class="text-start">Categoría</h5>
                    <MDBCardText class="text-start">
                        {{personalOffers.category}}
                    </MDBCardText>
                </MDBCol>

                <MDBCol class="mb-4" col="12" lg="6">
                    <h5 class="text-start">Experiencia</h5>
                    <MDBCardText class="text-start">
                        {{personalOffers.experience}}
                    </MDBCardText>
                </MDBCol>

                <MDBCol class="mb-4" col="12" lg="6">
                    <h5 class="text-start">Jornada Laboral</h5>
                    <MDBCardText class="text-start">
                        {{personalOffers.workday}}
                    </MDBCardText>
                </MDBCol>

                <MDBAccordion v-model="activeItem">
                    <MDBAccordionItem
                    headerTitle="Accordion Item #1"
                    collapseId="collapseOne"
                    >
                    <strong>This is the first item's accordion body.</strong> It is
                    shown by default, until the collapse plugin adds the appropriate
                    classes that we use to style each element. These classes control
                    the overall appearance, as well as the showing and hiding via
                    CSS transitions. You can modify any of this with custom CSS or
                    overriding our default variables. It's also worth noting that
                    just about any HTML can go within the
                    MDBAccordionItem, though the transition does limit
                    overflow.
                    </MDBAccordionItem>                    
                </MDBAccordion>
                
            </MDBRow>


        </MDBCardBody>

        <MDBCardFooter>

            <div class="d-flex justify-content-start">                
                <MDBBtn class="shadow-0" tag="a" color="danger" floating size="sm">
                    <i class="fas fa-heart me-2"></i>
                </MDBBtn>
                <p class="fs-5 ms-1 me-4 fs-6">{{jobApplicationsNumber}} Solicitudes</p>
                <MDBBtn class="shadow-0" tag="a" color="warning" floating size="sm">
                    <i class="fas fa-star me-2"></i>
                </MDBBtn>
                <p class="fs-5 ms-1 fs-6">{{score}} Calificación</p>
            </div>                              
        </MDBCardFooter>
    </MDBCard>

</template>

<style scoped src="@/wwwroot/css/offerItem.css"></style>
<style scoped src="@/wwwroot/css/mainFeed.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/offerItem.js"></script>