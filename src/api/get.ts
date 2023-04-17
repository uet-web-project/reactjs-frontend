export function get(token?: string) {
  return {
    verifyToken: `auth/${token}`,

    // registration dep
    getAllDeps: "registration-dep",
    getDepProfile: "registration-dep/profile",
  };
}
