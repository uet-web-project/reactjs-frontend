import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav-bar/Navbar";
import axiosInstance from "../../utils/axios";
import PersonInformation from "../../components/person-card/PersonInformation";
import FakeData from "../../assets/data/dep.json";
import Overview from "../../components/overview/Overview";

function LandingPage() {
  //   const currentData = FakeData[0];
  //   const { name, role, education, email, img } = currentData;
  return (
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         // backgroundColor: "#62b7d3",
    //         padding: "20px",
    //         borderRadius: "10px",
    //         width:"60%",
    //         justifyContent:"center"
    //       }}
    //     >
    //       {FakeData.map((item) => {
    //         return (
    //           <PersonInformation
    //             name={item.name}
    //             role={item.role}
    //             education={item.education}
    //             email={item.email}
    //             img={item.img}
    //           />
    //         );
    //       })}
    //     </div>
    //   );
    <Overview />
  );
}

export default LandingPage;
