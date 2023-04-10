import React, { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    const id = window.localStorage.getItem("id");
    if (!id) {
      window.location.href = "/authentication/login";
    }
  }, []);

  return <div>index</div>;
}

export default LandingPage;
