import { Box, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { changeSearch, fetchpageres } from "@/app/redux/slice";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";
import { getUsersList } from "@/app/redux/Admin/AdminAxioses";
export default function Asynchronous() {
  const dispatch = useDispatch();
  const pages = useSelector(fetchpageres);
  const router=useRouter()

 

  return (
    <div>
     <Box sx={{ '& > :not(style)': { m: 1 } }}>
      
      <TextField
      
        id="input-with-icon-textfield"
      
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onChange={(e)=>{
          dispatch(getUsersList())
          router?.push(`/admin?values=${e.target.value}`)
      
      }}
      />
      
    </Box>
    </div>
  );
}
