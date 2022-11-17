<template>

    <Navbar class="mb-4" />

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 mb-3">
                <ProfileMainMenu :user="userObject" />
            </div>

            <div class="col-lg-6 p-lg-0">
                <!-- <MainFeed v-for="(offerItem, i) in offerInformation" :key="i"
                            :offers="offerItem" /> -->

            </div>

            <div class="col-lg-3 mb-3">
                <Category />
            </div>
        </div>
    </div>

</template>

<style scoped src="@/wwwroot/css/offer.css">

</style>
<script src="@/wwwroot/js/offer.js"></script>