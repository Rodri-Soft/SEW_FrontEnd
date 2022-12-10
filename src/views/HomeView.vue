<template>

    <Navbar class="mb-4"/>

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 mb-3">
                <ProfileMainMenu/>                
            </div>

            <div class="col-lg-6 p-lg-0">                
                <MainFeed v-for="(offerItem, i) in offerInformation" :key="i"
                            :offers="offerItem" />
            </div>

            <div class="col-lg-3 mb-3">
                <div class="col col-sm-12">
                    <div class="d-flex justify-content-lg-end justify-content-center">
                        <Category v-on:consultOffers="consultOffers"/>
                    </div>
                </div>                
            </div>
        </div>
    </div>        

</template>

<style scoped src="@/wwwroot/css/home.css"></style>
<script src="@/wwwroot/js/home.js"></script>