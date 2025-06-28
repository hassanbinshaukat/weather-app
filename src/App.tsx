import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CircularProgress,
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
import cloudy from "./assets/images/cloudy.png";
import rainy from "./assets/images/rainy.png";
import snowy from "./assets/images/snowy.png";
import { useEffect, useState } from "react";

const schema = z.object({
  location: z.string().min(1, "Please enter location"),
});
type FormData = z.infer<typeof schema>;

export interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export default function WeatherCard() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

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
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      location: "",
    },
  });
  const onSubmit = (data: FormData) => console.log(data);

  const api_key = "1992a6630a7a766ca25b930f5f169d8c";

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const defaultLocation = "Karachi";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      console.log(defaultData);
      setData(defaultData);
      setLoading(false);
    };
    fetchDefaultWeather();
  }, []);

  const search = async () => {
    const location = getValues("location");
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod !== 200) {
        setNotFound(true);
        setData(null);
      } else {
        setNotFound(false);
        setData(searchData);
      }
    }
    setLoading(false);
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Maze: cloudy,
    Mist: cloudy,
  };

  const weatherImage: string | undefined = data?.weather
    ? weatherImages[data.weather[0].main as keyof typeof weatherImages]
    : sunny;

  const backgroundImages = {
    Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
    Rain: "linear-gradient(to right, #5bcdfb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haza: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
  };

  const backgroundImage = data?.weather
    ? backgroundImages[data.weather[0].main as keyof typeof backgroundImages]
    : "linear-gradient(to right, #f3b07c, #fcd283)";

  const currentDate = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const daysOfMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = daysOfMonth[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

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
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Item className="p-0 rounded-4xl border-0 shadow-none">
            <Card
              variant="outlined"
              className="border-0 rounded-4xl shadow-lg px-7"
              style={{
                backgroundImage: backgroundImage?.replace("to right", "to top"),
              }}
            >
              <CardContent>
                <div className="flex">
                  <PlaceIcon fontSize="large" className="text-color" />
                  <p className="text-lg pl-2 text-color mt-1">{data?.name}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="location"
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
                        helperText={errors.location?.message}
                        error={!!errors.location}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="search"
                                  onClick={search}
                                  type="submit"
                                >
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

                {loading ? (
                  <CircularProgress />
                ) : notFound ? (
                  <div className="text-4xl text-color text-center mt-15">
                    Not Found 😒
                  </div>
                ) : (
                  <>
                    <img src={weatherImage} alt="sunny" className="mt-15" />

                    <div className="text-center">
                      <p className="text-lg text-color">
                        {data?.weather[0].main}
                      </p>
                      <p className="text-6xl my-5 text-color">
                        {data?.main.temp}{" "}
                        <span className="text-color">&deg;</span>
                      </p>
                      <p className="text-lg text-color">{formattedDate}</p>
                    </div>

                    <Grid container marginTop="20px" spacing={2}>
                      <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                        <Item className="p-0 rounded-2xl border-0 shadow-none weather-data">
                          <div className="text-center weather-data px-14 md:px-4 py-4 rounded-2xl">
                            <p className="text-lg text-color">Humidity</p>
                            <WaterDropIcon
                              fontSize="large"
                              className="text-white my-4"
                            />
                            <p className="text-lg text-color">
                              {data?.main.humidity}%
                            </p>
                          </div>
                        </Item>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                        <Item className="p-0 rounded-2xl border-0 shadow-none weather-data">
                          <div className="text-center weather-data px-16 md:px-4 py-4 rounded-2xl">
                            <p className="text-lg text-color">Wind</p>
                            <AirOutlinedIcon
                              fontSize="large"
                              className="text-white my-4"
                            />
                            <p className="text-lg text-color">
                              {data?.wind.speed} km/h
                            </p>
                          </div>
                        </Item>
                      </Grid>
                    </Grid>
                  </>
                )}
              </CardContent>
            </Card>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
