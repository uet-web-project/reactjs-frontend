export function postAPI() {
  return {
    // it's for registrationDep
    registrationDepLogin: "auth/registration-dep",
    createRegistrationDep: "registration-dep",

    //it's for center
    registrationCenterLogin: "auth/registration-center",
    createRegistrationCenter: "registration-center",
    createVehicleFromCertificate:"vehicle/create-vehicle-from-certificate",

    //it's for data
    getDataForCarTypeOverview: `vehicle/group-by-vehicle-type`,
  };
}
