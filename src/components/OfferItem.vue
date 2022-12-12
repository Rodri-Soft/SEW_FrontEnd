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

        <MDBCardBody>
           
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

                <MDBAccordion class="mt-3" v-model="activeItemApplication">

                    <MDBAccordionItem class="accordion-applications"
                    headerTitle="Solicitudes Pendientes"
                    collapseId="collapsePendantApplication"
                    >                        
                        <MDBTable bordered hover class="mb-0 text-center table-jobApplications">
                            <thead>
                                <tr>
                                <th>RFC Trabajador</th>
                                <th>Estado</th>
                                <th>Aceptar</th>
                                <th>Rechazar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(element, index) in jobApplications" :key="index">                                    
                                    <td>
                                        <router-link :to="`/user/${element.rfc}`">
                                            {{ element.rfc }}
                                        </router-link>
                                    </td>
                                    <td>{{ element.status }}</td>
                                    <td>
                                        <MDBBtn color="success" class="btn btn-primary btn-floating" size="sm"
                                            @click="acceptJobApplication(index, jobApplications)">
                                            <MDBIcon icon="check" />                                                                                       
                                        </MDBBtn>                                       
                                    </td>
                                    <td>
                                        <MDBBtn color="danger" class="btn btn-primary btn-floating" size="sm"
                                            @click="refuseJobApplication(index, jobApplications)">
                                            <MDBIcon icon="trash" />
                                        </MDBBtn>
                                    </td>
                                </tr>
                            </tbody>
                        </MDBTable>                                             
                    </MDBAccordionItem>           
                    
                    <MDBAccordionItem class="accordion-applications"
                    headerTitle="Solicitudes Aceptadas"
                    collapseId="collapseAcceptedApplication"
                    >                        
                        <MDBTable bordered hover class="mb-0 text-center table-jobApplications">
                            <thead>
                                <tr>
                                <th>RFC Trabajador</th>
                                <th>Estado</th>
                                <th></th>                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(element, index) in acceptedJobApplications" :key="index">                                    
                                    <td>
                                        <router-link :to="`/user/${element.rfc}`">
                                            {{ element.rfc }}
                                        </router-link>
                                    </td>
                                    <td>{{ element.status }}</td>
                                    <td>
                                        <MDBBtn color="success" class="btn btn-primary btn-floating" size="sm">                                            
                                            <MDBIcon icon="check" />                                                                                       
                                        </MDBBtn>                                       
                                    </td>                                    
                                </tr>
                            </tbody>
                        </MDBTable>                                             
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