import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../Registration/Navbar";
import { useLocation , useNavigate} from "react-router-dom";

interface PhotoDisplayProps {
  src: string; // URL of the image
  alt?: string; // Optional alt text for the image
  title: string; // Title of the image
}

const Page1: React.FC<PhotoDisplayProps> = ({ src, alt, title }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const result = location.state?.result;

  
  const goHome = () => {
    navigate("/prediction"); // Assuming '/' is the path to your home page
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#d4e8f3",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center", // Center align text inside container
          }}
        >
          <div>
            {title && (
              <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
                {title}
              </h1>
            )}
            <img
              src={src}
              alt={alt}
              style={{ width: "260px", height: "250px", borderRadius: "50%" }}
            />
            <p>The probability of heart disease is: {result}%</p>
            <button
              onClick={goHome}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Go Back
            </button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Page1;
