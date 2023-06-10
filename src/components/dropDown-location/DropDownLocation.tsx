import * as React from "react";
import Typography from "@mui/material/Typography";
import { locationHook } from "../../redux/hooks/locationCode";
import Button from "../button/Button";
import { styled, alpha } from "@mui/material/styles";
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
import { useState } from "react";
import "./styles.css";
export default function DropDownLocation({
  setState,
}: {
  setState: (
    cityName: string,
    cityCode: number,
    districtName: string,
    districtCode: number
  ) => void;
}) {
  const { getLocationCode, locationCode } = locationHook();
  const [anchorEl, setAnchorEl] = React.useState<
    null | HTMLElement | undefined
  >(null);
  const [anchorEl2, setAnchorEl2] = React.useState<
    null | HTMLElement | undefined
  >(null);
  const openCity = Boolean(anchorEl);
  const openDistrict = Boolean(anchorEl2);
  const handleClickCity = (
    event: React.MouseEvent<HTMLElement> | undefined
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseCity = () => {
    setAnchorEl(null);
  };
  const handleClickDistrict = (
    event: React.MouseEvent<HTMLElement> | undefined
  ) => {
    setAnchorEl2(event?.currentTarget);
  };
  const handleCloseDistrict = () => {
    setAnchorEl2(null);
  };

  const handleOpenDistrict = (
    event: React.MouseEvent<HTMLElement> | undefined
  ) => {
    setAnchorEl2(event?.currentTarget);
  };
  const [searchCity, setSearchCity] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");

  return (
    <div>
      <Button content="contained" onClick={handleClickCity} />
      <Menu
        className="menu-container"
        anchorEl={anchorEl}
        open={openCity}
        onClose={handleCloseCity}
      >
        {Array.isArray(locationCode) &&
          locationCode.map((city) => (
            <NestedMenuItem label={city.name} parentMenuOpen={openCity}>
              {Array.isArray(city.districts) &&
                city.districts.map((district: any) => (
                  <MenuItem onClick={handleCloseCity}>{district.name}</MenuItem>
                ))}
            </NestedMenuItem>
          ))}
      </Menu>
    </div>
  );
}
