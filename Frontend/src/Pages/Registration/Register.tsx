import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio } from "@mui/material";
import { FormControl, FormLabel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

interface FormData {
  Username: string;
  Fullname: string;
  Mobile_number: string;
  Email: string;
  Password: string;
  Gender: string;
  Age: string;
  Weight: string;
}

export default function RegisterUser() {
  const [Username, setUsername] = React.useState<string>("");
  const [Fullname, setFullname] = React.useState<string>("");
  const [Mobile_number, setMobile_number] = useState<string>("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Gender, setGender] = React.useState("");
  const [Age, setAge] = React.useState("");
  const [Weight, setWeight] = React.useState("");

  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowRegisterForm(true); // Show the registration form when the link is clicked
  };

  const HandleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    const validationErrors: Partial<{
      Username: string;
      Fullname: string;
      Mobile_number: string;
      Email: string;
      Password: string;
      Gender: string;
      Age: string;
      Weight: string;
    }> = {};

    if (!Email.trim()) validationErrors.Email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(Email))
      validationErrors.Email = "Email is invalid";

    if (!Password.trim()) validationErrors.Password = "Password is required";

    if (!Age.trim()) {
      validationErrors.Age = "Age is required";
    } else {
      const ageNumber = parseInt(Age, 10);
      if (isNaN(ageNumber)) {
        validationErrors.Age = "Age must be a number";
      }
    }

    if (!Weight.trim()) {
      validationErrors.Weight = "Weight is required";
    } else {
      const weightNumber = parseInt(Weight, 10);
      if (isNaN(weightNumber)) {
        validationErrors.Weight = "Weight must be a number";
      }
    }

    if (!Username.trim()) validationErrors.Username = "Username is required";

    if (!Fullname.trim()) validationErrors.Fullname = "Fullname is required";

    if (!Gender.trim()) {
      validationErrors.Gender = "Gender is required";
    } else if (!["male", "female"].includes(Gender.toLowerCase())) {
      validationErrors.Gender = "Gender must be either 'male' or 'female'";
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!Mobile_number.trim()) {
      validationErrors.Mobile_number = "Mobile number is required";
    } else if (!mobileRegex.test(Mobile_number)) {
      validationErrors.Mobile_number = "Invalid mobile number";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_FAST_API}api/Register/`, {
          Username,
          Fullname,
          Mobile_number,
          Email,
          Password,
          Gender,
          Age,
          Weight,
        });
        if (response.status === 200) {
          toast.success("Register successful");

          navigate("/login");
        }
      } catch (error) {
        toast.error("Register failed");
        console.error("Register error:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url("/11.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{ background: "white" }}
        >
          <Box
            sx={{
              my: 1,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#ff595a",
                height: 65,
                width: 65,
                marginTop: "30px",
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.Username && <span>{errors.Username}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="Fullname"
                label="Fullname"
                name="Fullname"
                value={Fullname}
                onChange={(e) => setFullname(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.Fullname && <span>{errors.Fullname}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="Mobile_number"
                label="Mobile Number"
                name="Mobile_number"
                value={Mobile_number}
                onChange={(e) => setMobile_number(e.target.value)}
                inputProps={{ maxLength: 10 }}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.Mobile_number && <span>{errors.Mobile_number}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="Email"
                label="Email Address"
                name="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.Email && <span>{errors.Email}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                name="Password"
                label="Password"
                type="Password"
                id="Password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.Password && <span>{errors.Password}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="Gender"
                label="Gender"
                name="Gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.Gender && <span>{errors.Gender}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="Age"
                label="Age"
                name="Age"
                value={Age}
                onChange={(e) => setAge(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.Age && <span>{errors.Age}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="Weight"
                label="Weight"
                name="Weight"
                value={Weight}
                onChange={(e) => setWeight(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />

              <div style={{ color: "red" }}>
                {errors.Weight && <span>{errors.Weight}</span>}
              </div>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#ff595a",
                  "&:hover": {
                    bgcolor: "red",
                  },
                }}
                onClick={HandleRegister}
              >
                Register
              </Button>
              <Grid
                container
                justifyContent="space-between"
                spacing={2}
                sx={{ marginTop: "-15px" }}
              >
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link
                      href="login"
                      variant="body2"
                      onClick={handleRegisterClick}
                    >
                      Already have an account?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
