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
import { loadingHook } from "../../redux/hooks/loadingHooks";

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
  const { locationCode } = locationHook();
  const { provinceCode } = loadingHook();

  const [anchorEl, setAnchorEl] = React.useState<
    null | HTMLElement | undefined
  >(null);

  const [searchCity, setSearchCity] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [content, setContent] = useState("Filter By");
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
        if (cityName.length !== 0) setContent(districtName);
      }
      setAction(false);
    }
  }, [openDrop]);

  const handleClickCity = (
    event: React.MouseEvent<HTMLElement> | undefined
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseCity = () => {
    setAnchorEl(null);
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
    setContent("Filter By");
    setAnchorEl(null);
    setAction(true);
  }

  return (
    <div>
      <Button content={content} onClick={handleClickCity} />
      <Menu
        sx={{ "& .MuiMenu-paper": { backgroundColor: "white !important" } }}
        anchorEl={anchorEl}
        open={openDrop}
        onClose={handleCloseCity}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
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
          <div>
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
                      <div>
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
