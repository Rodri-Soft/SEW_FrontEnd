<template>
	<MDBNavbar expand="lg" light container class="shadow-1 d-flex justify-content-between">
		<router-link to="/home">
			<MDBNavbarBrand class="form-title ">
				<img src="@/assets/logo-2.svg" alt="logo" class="m-0 logo" />
				<h2 class="fs-5 form-title m-auto d-flex align-items-center">SEW</h2>
			</MDBNavbarBrand>
		</router-link>

		<MDBNavbarToggler id="toggleNavbar" target="#navbarSupportedContent" 
			@click="collapse = !collapse">
		</MDBNavbarToggler>

		<MDBCollapse v-model="collapse" id="navbarSupportedContent">
			<MDBNavbarNav class="mb-2 mb-lg-0">
				<MDBNavbarItem>
					<form class="d-flex input-group w-auto">
						<div class="d-flex align-items-center search-container">
							<i class="fas fa-search search-icon"></i>
							<input type="search" class="form-control search-input rounded-4" 
								placeholder="Explota Ofertas Laborales" aria-label="Search" id="input-search"/>
							<!-- <MDBDropdown v-model="dropdownFilter">
								<a id="filterButton" class="m-2 color-button" href="#" @click="(dropdownFilter = !dropdownFilter)">
									<MDBIcon icon="filter" size="lg"></MDBIcon>
									<p class="filter-text ms-2">Filtros</p>
								</a>

								<MDBDropdownMenu id="dropDownFilter" aria-labelledby="dropdownMenuButton">
									<MDBDropdownItem href="#">Nombre</MDBDropdownItem>
									<MDBDropdownItem href="#">Categoría</MDBDropdownItem>
									<MDBDropdownItem href="#">Fecha</MDBDropdownItem>
								</MDBDropdownMenu>
							</MDBDropdown> -->
						</div>
					</form>
				</MDBNavbarItem>

			</MDBNavbarNav>			
		</MDBCollapse>
		
		<MDBNavbarNav class="d-flex justify-content-end flex-row">
			<MDBNavbarItem to="#" class="me-3 me-lg-0 m-auto d-flex align-items-center">
				<MDBDropdown to="" v-model="dropdownBellNotifications" class="me-2">
					<a id="bellNotificationsButton" @click="dropdownBellNotifications = !dropdownBellNotifications">
						<MDBIcon icon="bell" size="lg" class="color-button"></MDBIcon>
						<MDBBadge pill notification class="bg-danger">1</MDBBadge>
					</a>

					<MDBDropdownMenu id="dropDownBell" aria-labelledby="dropdownMenuButtonNotifications"
						class="dropdownMenuButton-notifications">
						<MDBDropdownItem href="#">Action</MDBDropdownItem>
					</MDBDropdownMenu>
				</MDBDropdown>
			</MDBNavbarItem>

			<MDBNavbarItem class="me-3 me-lg-0 m-auto d-flex align-items-center">
				<MDBDropdown btnGroup v-model="dropdownProfile" class="shadow-0" >
					<MDBDropdownToggle @click="dropdownProfile = !dropdownProfile" class="dropdownMenuButton-user rounded-7 shadow-0">
						<img :src=this.profileImage class="rounded-circle me-3" height="30" alt=""
							loading="lazy" />
						@ {{ this.user.rfc }}
					</MDBDropdownToggle>
					<MDBDropdownMenu>
						<router-link to="/profile">
							<MDBDropdownItem href="#">
								Mi perfil
							</MDBDropdownItem>
						</router-link>
						<router-link to="/login">
							<MDBDropdownItem href="#">
								Cerrar sesión
							</MDBDropdownItem>
						</router-link>
					</MDBDropdownMenu>
				</MDBDropdown>
			</MDBNavbarItem>
		</MDBNavbarNav>			
	</MDBNavbar>
</template>

<style scoped src="@/wwwroot/css/navbar.css"></style>
<style src="@/wwwroot/css/logIn.css"></style>
<script src="@/wwwroot/js/navbar.js"></script>
