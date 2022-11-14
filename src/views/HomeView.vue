<template>

    <Navbar class="mb-4"/>

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3">
                <ProfileMainMenu/>
            </div>

            <div class="col-lg-6 p-lg-0">
                <MainFeed/>
            </div>

            <div class="col-lg-3">
                <Category/>
            </div>
        </div>
    </div>        

</template>

<style scoped src="@/wwwroot/css/home.css"></style>
<script src="@/wwwroot/js/home.js"></script>