<template>    
    
    <MDBListGroupItem class="backgroundFont categoryListItem">

        <div class="d-flex justify-content-between">
            <p class="d-flex align-items-center mt-3 mb-1 text-wrap listText">{{categories.title}}</p>
            <MDBBtn color="light shadow-0 listButton" rounded>Ver</MDBBtn>
        </div>                    
                                                        
    </MDBListGroupItem>

</template>

<style scoped src="@/wwwroot/css/categoryItem.css">

</style>

<script>

import $ from 'jquery';

import {
    MDBBtn,
    MDBCardGroup,
    MDBCardGroupItem,
    MDBListGroupItem,
    MDBListGroup

} from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {

    name: 'CategoryItem',
    components: {
        MDBBtn,
        MDBCardGroup,
        MDBCardGroupItem,
        MDBListGroupItem,
        MDBListGroup
    },
    props: ["categories"],

}

</script>