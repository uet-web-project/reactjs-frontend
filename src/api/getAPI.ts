export function getAPI(token?: string, id?: string) {
  return {
    verifyToken: `auth/${token}`,

    // registration dep
    getAllDeps: "registration-dep",
    getDepProfile: "registration-dep/profile",
    getAllVehicleByDep: "vehicle/get-by-registration-dep",
    //center
    getCenterProfile: "registration-center/profile",
    getAllVehicleByCenter: "vehicle/get-by-registration-center",
    // vehicle
    getAllVehicles: "vehicle",

    getCenterListById: `registration-center/get-by-dep-id/${id}`,

    //TotalOverviewChart
    getWeekDataForTotalOverviewChart: `vehicle/get-registered-vehicles-count/filter-by-week`,
    getMonthDataForTotalOverviewChart: `vehicle/get-registered-vehicles-count/filter-by-month`,
    getYearDataForTotalOverviewChart: `vehicle/get-registered-vehicles-count/filter-by-year`,
  };
}
