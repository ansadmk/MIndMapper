import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { PageState, changeBreadCrumb, changeCurrentPage, changeEditable, changeShowPageForm, changesubpageRender, fetchpageres } from "@/app/redux/slice";
import { Button } from "react-bootstrap";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function Asynchronous() {
  const dispatch = useDispatch();
  const pages = useSelector(fetchpageres);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...pages?.data?.mainpages]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
    noOptionsText={"not found"}
    onChange={(e,value)=>{
      dispatch(PageState(true))
      dispatch(changeCurrentPage(value));
      dispatch(changeBreadCrumb({type:'clear'}))
      dispatch(changeBreadCrumb({type:'push',data:{role:"main",content:value}}))
      dispatch(changeShowPageForm(false));
      dispatch(changeEditable("false"));
      dispatch(changesubpageRender("false"));
    }}
      isOptionEqualToValue={(option, value) => option.content === value.content}
      getOptionLabel={(option) => option.content}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Pages"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <div>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}

              </div>
            ),
          }}
        />
      )}
    />
  );
}
