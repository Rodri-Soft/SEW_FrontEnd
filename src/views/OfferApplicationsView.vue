<template>

    <Navbar class="mb-4"/>

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 mb-3">
                <ProfileMainMenu :user="userObject"/>                
            </div>

            <div class="col-lg-9 mt-5 ms-3 ms-lg-0 me-3 me-lg-0 p-lg-0">  

                <h1>{{offer.title}}</h1>

                <MDBRow class="mt-5">
                    <MDBCol col="6">
                        <h3>Descripción</h3>
                        <MDBCardText class="text-start">
                            {{offer.description}}
                        </MDBCardText>

                        <h3>Categoría</h3>
                        <MDBCardText class="text-start">
                            {{offer.description}}
                        </MDBCardText>

                        <h3>Calificación</h3>
                        <MDBCardText class="text-start">
                            {{offer.score}}
                        </MDBCardText>
                    </MDBCol>

                    <MDBCol col="6">
                        <h3>Experiencia</h3>
                        <MDBCardText class="text-start">
                            {{offer.experience}}
                        </MDBCardText>

                        <h3>Jornada Laboral</h3>
                        <MDBCardText class="text-start">
                            {{offer.workday}}
                        </MDBCardText>
                    </MDBCol>                    
                </MDBRow>


            </div>
            
        </div>
    </div>        

</template>

<style scoped src="@/wwwroot/css/offerApplications.css"></style>
<script src="@/wwwroot/js/offerApplications.js"></script>