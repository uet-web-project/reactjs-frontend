import * as React from "react";
import Typography from "@mui/material/Typography";
import { locationHook } from "../../redux/hooks/locationCode";
import Button from "../button/Button";
import { styled, alpha, Theme } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NestedMenuItem } from "mui-nested-menu";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles.css";

export default function DropDownLocation({
  setState,
}: {
  setState: (
    isDistrict: boolean,
    cityName: string,
    cityCode: number,
    districtName?: string,
    districtCode?: number
  ) => void;
}) {
  const { getLocationCode, locationCode } = locationHook();
  const [anchorEl, setAnchorEl] = React.useState<
    null | HTMLElement | undefined
  >(null);
  const openCity = Boolean(anchorEl);
  const handleClickCity = (
    event: React.MouseEvent<HTMLElement> | undefined
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseCity = () => {
    setAnchorEl(null);
  };

  const [searchCity, setSearchCity] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");

  useEffect(() => {
    console.log(locationCode);
    if (locationCode.length === 0) getLocationCode();
  }, []);

  let timeoutId: any;
  function handleSearchTermChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    clearTimeout(timeoutId);
    const searchTerm = e.target.value;
    timeoutId = setTimeout(() => {
      if (e.target.id === "city-drop-textField") setSearchCity(searchTerm);
      else setSearchDistrict(searchTerm);
    }, 1000);
  }

  // handle passing data to ref function
  function onDropDownItemClick(
    cityName: string,
    cityCode: number,
    districtName?: string,
    districtCode = 0,
    isDistrict = false
  ) {
    setAnchorEl(null);
    if (isDistrict) setState(true, cityName, cityCode);
    else setState(false, cityName, cityCode, districtName, districtCode);
  }

  return (
    <div>
      <Button content="contained" onClick={handleClickCity} />
      <Menu
        sx={{ "& .MuiMenu-paper": { backgroundColor: "white !important" } }}
        anchorEl={anchorEl}
        open={openCity}
        onClose={handleCloseCity}
      >
        <TextField
          id="city-drop-textField"
          className="locationsDropField"
          label="Cities"
          variant="standard"
          onChange={handleSearchTermChange}
          onKeyDown={(event) => event.stopPropagation()}
        />
        {Array.isArray(locationCode) && (
          <div>
            {locationCode
              .filter((city) =>
                city.name
                  .toLowerCase()
                  .normalize()
                  .includes(searchCity.toString().toLowerCase().normalize())
              )
              .map((city) => (
                <div>
                  <NestedMenuItem
                    key={city.code}
                    label={city.name}
                    parentMenuOpen={openCity}
                    onClick={() => onDropDownItemClick(city.name, city.code)}
                  >
                    {Array.isArray(city.districts) && (
                      <div>
                        <TextField
                          id="district-drop-textField"
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
                          style={{ backgroundColor: "white" }}
                        />
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
