<template>            
    <MDBCard class="profileCard backgroundFont">
        <MDBCardBody class="text-center pb-0">
            <MDBCardTitle>Categorías</MDBCardTitle>
        </MDBCardBody>

        <MDBListGroup>
            <!-- <CategoryItem v-for="(categoryItem, i) in categoryInformation" :key="i"
                :categories="categoryItem" /> -->

            <MDBListGroupItem class="backgroundFont categoryListItem">
                <div class="d-flex justify-content-between">
                    <p class="d-flex align-items-center mt-3 mb-1 text-wrap listText">Servicios</p>
                    <MDBBtn color="light shadow-0 listButton" rounded v-on:click="$emit('consultOffers', 'Servicios');">Ver</MDBBtn>
                </div>                                                                                    
            </MDBListGroupItem>

            <MDBListGroupItem class="backgroundFont categoryListItem">
                <div class="d-flex justify-content-between">
                    <p class="d-flex align-items-center mt-3 mb-1 text-wrap listText">Industria manufacturera</p>
                    <MDBBtn color="light shadow-0 listButton" rounded v-on:click="$emit('consultOffers', 'Industria manufacturera');">Ver</MDBBtn>
                </div>                                                                                    
            </MDBListGroupItem>
            
            <MDBListGroupItem class="backgroundFont categoryListItem">
                <div class="d-flex justify-content-between">
                    <p class="d-flex align-items-center mt-3 mb-1 text-wrap listText listText-large ">Tecnología y telecomunicaciones</p>
                    <MDBBtn color="light shadow-0 listButton" rounded v-on:click="$emit('consultOffers', 'Tecnología y telecomunicaciones');">Ver</MDBBtn>
                </div>                                                                                    
            </MDBListGroupItem>
            
            <MDBListGroupItem class="backgroundFont categoryListItem">
                <div class="d-flex justify-content-between">
                    <p class="d-flex align-items-center mt-3 mb-1 text-wrap listText">Alimentos y bebidas</p>
                    <MDBBtn color="light shadow-0 listButton" rounded v-on:click="$emit('consultOffers', 'Alimentos y bebidas');">Ver</MDBBtn>
                </div>                                                                                    
            </MDBListGroupItem>

            <MDBListGroupItem class="backgroundFont categoryListItem">
                <div class="d-flex justify-content-between">
                    <p class="d-flex align-items-center mt-3 mb-1 text-wrap listText">Construcción</p>
                    <MDBBtn color="light shadow-0 listButton" rounded v-on:click="$emit('consultOffers', 'Construcción');">Ver</MDBBtn>
                </div>                                                                                    
            </MDBListGroupItem>
        </MDBListGroup>
    </MDBCard>    
</template>

<style scoped src="@/wwwroot/css/category.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/category.js"></script>