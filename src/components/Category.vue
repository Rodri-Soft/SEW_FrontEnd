<template>

    <div>
        <div class="col col-sm-12">
            <div class="d-flex justify-content-lg-end justify-content-center">
                <MDBCard class="profileCard backgroundFont">

                    <MDBCardBody class="text-center pb-0">
                        <MDBCardTitle>Categorías</MDBCardTitle>
                    </MDBCardBody>

                    <MDBListGroup>

                        <CategoryItem v-for="(categoryItem, i) in categoryInformation" :key="i"
                            :categories="categoryItem" />
                    </MDBListGroup>
                </MDBCard>
            </div>

        </div>

        <!-- <div class="col">
            <div class="d-flex justify-content-lg-end justify-content-center">
                <MDBBtn color="primary mt-3 mb-3 shadow-0 backgroundFont profileCard">Mi Perfil</MDBBtn>
            </div>
        </div> -->
    </div>

</template>

<style scoped src="@/wwwroot/css/category.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/category.js"></script>