// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import SearchIcon from "@mui/icons-material/Search";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import sunny from "./assets/images/sunny.png";

const schema = z.object({
  search: z.string(),
});
type FormData = z.infer<typeof schema>;

export default function WeatherCard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        padding="12px"
        
      >
        <Grid size={{ xs: 12, sm:6, md: 4, lg: 3 }}>
          <Item className="p-0 rounded-4xl border-0 shadow-none">
            <Card
              variant="outlined"
              className="border-0 rounded-4xl card-color shadow-lg px-7"
            >
              <CardContent>
                <div className="flex">
                  <PlaceIcon fontSize="large" className="text-color" />
                  <p className="text-lg pl-2 text-color mt-1">London</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="search"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "999px",
                          },
                        }}
                        size="small"
                        className="mt-3"
                        placeholder="Enter Location"
                        fullWidth
                        helperText={errors.search?.message}
                        error={!!errors.search}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton aria-label="search">
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    )}
                  />
                </form>

                <img src={sunny} alt="sunny" className="mt-15" />

                <div className="text-center">
                  <p className="text-lg text-color" >Clear</p>
                  <p className="text-7xl my-5 text-color">
                    28 <span className="text-color">&deg;</span>
                  </p>
                  <p className="text-lg text-color" >Fri, 3 May</p>
                </div>

                <Grid container marginTop="20px" spacing={2}>
                  <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <Item className="p-0 rounded-2xl border-0 shadow-none weather-data">
                      <div className="text-center weather-data px-14 md:px-4 py-4 rounded-2xl">
                        <p className="text-lg text-color">Humidity</p>
                        <WaterDropIcon fontSize="large" className="text-white my-4" />
                        <p className="text-lg text-color">35%</p>
                      </div>
                    </Item>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <Item className="p-0 rounded-2xl border-0 shadow-none weather-data">
                      <div className="text-center weather-data px-16 md:px-4 py-4 rounded-2xl">
                        <p className="text-lg text-color">Wind</p>
                        <AirOutlinedIcon fontSize="large" className="text-white my-4" />
                        <p className="text-lg text-color">3 km/h</p>
                      </div>
                    </Item>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
