export function getAPI(token?: string, id?: string) {
  return {
    verifyToken: `auth/${token}`,

    // registration dep
    getAllDeps: "registration-dep",
    getDepProfile: "registration-dep/profile",
    // registration center
    getAllCenter:"/registration-center",

    // vehicle
    getAllVehicles: "vehicle",

    getCenterListById: `registration-center/get-by-dep-id/${id}`,

    //Car Type
    getWeekDataForCarTypeOverview: `vehicle/group-by-vehicle-type/filter-by-week`,

    getMonthDataForCarTypeOverview: `vehicle/group-by-vehicle-type/filter-by-month`,

    getYearDataForCarTypeOverview: `vehicle/group-by-vehicle-type/filter-by-year`,

    //TotalOverviewChart
    getWeekDataForTotalOverviewChart: `vehicle/get-registered-vehicles-count/filter-by-week`,
    getMonthDataForTotalOverviewChart: `vehicle/get-registered-vehicles-count/filter-by-month`,
    getYearDataForTotalOverviewChart: `vehicle/get-registered-vehicles-count/filter-by-year`,
  };
}
