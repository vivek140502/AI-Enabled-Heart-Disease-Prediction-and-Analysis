import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Slider,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../Registration/Navbar";

const Prediction: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: sessionStorage.getItem("email") || "",
    age: "",
    gender: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    mhra: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: String(value) });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setFormData((prevData) => ({
      ...prevData,
      age: newValue.toString(),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedUserEmail = sessionStorage.getItem("loginEmail");
    const updatedFormData = {
      ...formData,
      email: storedUserEmail || formData.email,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FAST_API}api/model/`,
        updatedFormData
      );
      console.log("Response from server:", response.data);
      if (response && response.data) {
        const result = response.data.data;
        if (result >= 1 && result < 40) {
          navigate("/page1", { state: { result } });
        } else if (result >= 40 && result < 75) {
          navigate("/page2", { state: { result } });
        } else if (result >= 75 && result <= 100) {
          navigate("/page3", { state: { result } });
        } else {
          alert("Unknown response from server");
        }
      } else {
        alert("Unknown response from serverrrrrr");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while processing your request");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url("/11.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="sm" // Adjust the maxWidth to control the width
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography id="age-slider" gutterBottom>
                  Age
                </Typography>
                <Slider
                  aria-labelledby="age-slider"
                  value={formData.age === "" ? 0 : parseInt(formData.age)}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  marks
                  min={0}
                  max={100}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    value={formData.gender}
                    name="gender"
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Gender
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    value={formData.cp}
                    name="cp"
                    displayEmpty
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Chest Pain Type
                    </MenuItem>
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    labelId="cp-label"
                    value={formData.cp}
                    name="cp"
                    displayEmpty
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Chest Pain Type
                    </MenuItem>
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Resting blood pressure"
                  value={formData.trestbps}
                  name="trestbps"
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { fontWeight: "bold" },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Serum cholestoral in mg/dl"
                  value={formData.chol}
                  name="chol"
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { fontWeight: "bold" },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Fasting blood sugar > 120 mg/dl"
                  value={formData.fbs}
                  name="fbs"
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { fontWeight: "bold" },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    //   labelId="gender-label"
                    value={formData.restecg}
                    name="restecg"
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Resting electrocardiographic results
                    </MenuItem>
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Maximum heart rate"
                  value={formData.mhra}
                  name="mhra"
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { fontWeight: "bold" },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    //   labelId="gender-label"
                    value={formData.exang}
                    name="exang"
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Exercise induced angina
                    </MenuItem>
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="ST depression induced by exercise relative to rest(Oldpeak)"
                  value={formData.oldpeak}
                  name="oldpeak"
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { fontWeight: "bold" },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    //   labelId="gender-label"
                    value={formData.slope}
                    name="slope"
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Slope of the peak exercise ST segment
                    </MenuItem>
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    value={formData.ca}
                    name="ca"
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Number of major vessel
                    </MenuItem>
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="2">3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    //   labelId="gender-label"
                    value={formData.thal}
                    name="thal"
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Thalassemia
                    </MenuItem>
                    <MenuItem value="0">0=Normal</MenuItem>
                    <MenuItem value="1">1=Fixed Defect</MenuItem>
                    <MenuItem value="2">2=Reversable Defect</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                
              >
                Submit
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Prediction;
