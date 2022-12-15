<template>

    <Navbar class="mb-4" />

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 mb-3">
                <h1>Solicitudes</h1>                                  
                <ProfileMainMenu/>
            </div>

            <div class="col-lg-8 p-lg-0">
                <h2>Mis Solicitudes</h2>     
                <h3 v-show="emptyJobApplications == true" class="mt-5 text-center">No hay Solicitudes por mostrar 🤔</h3>           
                <JobApplicationItem v-for="(jobApplication, i) in jobApplications"
                            :key="i"
                            :employeeJobApplication="jobApplication" />                                                                                                                            
            </div>            
        </div>
    </div>
    
    <Footer class="mt-4"/>
</template>

<style scoped src="@/wwwroot/css/offer.css"></style>
<style scoped src="@/wwwroot/css/sharedStyles.css"></style>
<script src="@/wwwroot/js/jobApplication.js"></script>