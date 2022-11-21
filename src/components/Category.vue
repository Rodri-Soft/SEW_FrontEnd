<template>            
    <MDBCard class="profileCard backgroundFont">
        <MDBCardBody class="text-center pb-0">
            <MDBCardTitle>Categorías</MDBCardTitle>
        </MDBCardBody>

        <MDBListGroup>
            <CategoryItem v-for="(categoryItem, i) in categoryInformation" :key="i"
                :categories="categoryItem" />
        </MDBListGroup>
    </MDBCard>    
</template>

<style scoped src="@/wwwroot/css/category.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/category.js"></script>