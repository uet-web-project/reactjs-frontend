import * as React from "react";
import CSS from "csstype";
import { locationHook } from "../../redux/hooks/locationCode";
import Button from "../button/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NestedMenuItem } from "mui-nested-menu";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles.css";
import { loadingHook } from "../../redux/hooks/loadingHooks";

export default function DropDownLocation({
  setState,
  placeholder,
  buttonStyle,
  buttonClassName,
  buttonId,
  containerStyle,
  containerClassName,
}: {
  setState: (
    isDistrict: boolean,
    cityName: string,
    cityCode: number,
    districtName?: string,
    districtCode?: number
  ) => void;
  placeholder?: string;
  buttonStyle?: CSS.Properties;
  buttonClassName?: string;
  buttonId?: string;
  containerStyle?: CSS.Properties;
  containerClassName?: string;
}) {
  const { locationCode, getLocationCode } = locationHook();
  const { provinceCode } = loadingHook();

  const [anchorEl, setAnchorEl] = React.useState<
    null | HTMLElement | undefined
  >(null);

  const [searchCity, setSearchCity] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [content, setContent] = useState(placeholder || "Filter by location");
  const [cityCode, setCityCode] = useState(0);
  const [districtCode, setDistrictCode] = useState(0);
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [isSetAction, setAction] = useState(false);
  const openDrop = Boolean(anchorEl);

  //handle return data
  useEffect(() => {
    if (isSetAction) {
      if (districtCode === 0) {
        setState(false, cityName, cityCode);
        if (cityName.length !== 0) setContent(cityName);
      } else {
        setState(true, cityName, cityCode, cityName, districtCode);
        if (cityName.length !== 0) setContent(`${cityName}, ${districtName}`);
      }
      setAction(false);
    }
  }, [openDrop]);

  useEffect(() => {
    if (locationCode.length === 0) {
      getLocationCode();
    }
  }, []);

  const handleClickCity = (
    event: React.MouseEvent<HTMLElement> | undefined
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseCity = () => {
    setAnchorEl(null);
    setSearchCity("");
    setSearchDistrict("");
  };

  let timeoutId: any;
  function handleSearchTermChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    clearTimeout(timeoutId);
    const searchTerm = e.target.value;
    timeoutId = setTimeout(() => {
      if (e.target.name === "city-drop-textField") setSearchCity(searchTerm);
      else setSearchDistrict(searchTerm);
    }, 500);
  }

  // handle passing data to ref function
  function onDropDownItemClick(
    cityName: string,
    cityCode: number,
    districtName?: string,
    districtCode = 0,
    isDistrict = false
  ) {
    setCityCode(cityCode);
    setDistrictName(districtName === undefined ? "" : districtName);
    setDistrictCode(districtCode);
    setCityName(cityName);
    setAnchorEl(null);
    setAction(true);
  }

  function onRemoveFilter() {
    setCityCode(0);
    setDistrictName("");
    setDistrictCode(0);
    setCityName("");
    setContent(placeholder || "Filter by location");
    setAnchorEl(null);
    setAction(true);
  }

  return (
    <div
      style={containerStyle}
      className={`secondary-font ${
        containerClassName ? containerClassName : ""
      }`}
    >
      <Button
        id={buttonId}
        className={`custom-dropdown-button ${
          buttonClassName ? buttonClassName : ""
        }`}
        style={buttonStyle}
        content={content}
        onClick={handleClickCity}
      />
      <Menu
        sx={{
          "& .css-6hp17o-MuiList-root-MuiMenu-list": {
            backgroundColor: "white !important",
          },
        }}
        anchorEl={anchorEl}
        open={openDrop}
        onClose={handleCloseCity}
      >
        <div
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
        >
          <div>
            {provinceCode !== 0 && (
              <Button
                content="Remove"
                onClick={onRemoveFilter}
                style={{ width: "100%" }}
              />
            )}
          </div>

          <TextField
            id="dropdown1"
            name="city-drop-textField"
            className="locationsDropField"
            label="Cities"
            variant="standard"
            onChange={handleSearchTermChange}
            onKeyDown={(event) => event.stopPropagation()}
          />
        </div>
        {Array.isArray(locationCode) && (
          <div style={{ maxHeight: "300px", overflow: "auto" }}>
            {/* search city / province (basic search filter) */}
            {locationCode
              .filter((city) =>
                city.name
                  .toLowerCase()
                  .normalize()
                  .includes(searchCity.toString().toLowerCase().normalize())
              )
              .map((city) => (
                <div key={city.code}>
                  <NestedMenuItem
                    key={city.code}
                    label={city.name}
                    parentMenuOpen={openDrop}
                    onClick={() => onDropDownItemClick(city.name, city.code)}
                  >
                    {Array.isArray(city.districts) && (
                      <div
                        style={{
                          maxHeight: "250px",
                          overflow: "auto",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            padding: "5px 10px",
                            backgroundColor: "white",
                          }}
                        >
                          <TextField
                            id="dropdown2"
                            name="district-drop-textField"
                            className="locationsDropField"
                            label="Districts"
                            variant="standard"
                            onChange={handleSearchTermChange}
                            onKeyDown={(event) => event.stopPropagation()}
                            InputLabelProps={{
                              sx: {
                                color: "black",
                                "&.Mui-focused": { color: "black" },
                              },
                            }}
                            sx={{
                              backgroundColor: "white",
                              width: "100%",
                            }}
                          />
                        </div>
                        {/* filter district name by search term */}
                        {city.districts
                          .filter((district) =>
                            district.name
                              .toLowerCase()
                              .normalize()
                              .includes(
                                searchDistrict
                                  .toString()
                                  .toLowerCase()
                                  .normalize()
                              )
                          )
                          .map((district: any) => (
                            <MenuItem
                              key={district.code}
                              onClick={() =>
                                onDropDownItemClick(
                                  city.name,
                                  city.code,
                                  district.name,
                                  district.code,
                                  true
                                )
                              }
                              sx={{
                                backgroundColor: "white !important",
                              }}
                            >
                              {district.name}
                            </MenuItem>
                          ))}
                      </div>
                    )}
                  </NestedMenuItem>
                </div>
              ))}
          </div>
        )}
      </Menu>
    </div>
  );
}
