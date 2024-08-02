import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Button, Card, Avatar } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <div
        style={{
          margin: "2rem 0",
        }}
      ></div>

      {/* Info Panel */}
      <div
        style={{
          display: "flex",
          padding: "1rem 3em",
          borderRadius: 15,
          justifyContent: "space-between",
          backgroundColor: "#6FC635",
          color: "#fff",
        }}
      >
        <div></div>
        <div
          style={{
            flexShrink: 0,
            backgroundColor: "#FF0000",
            padding: "0.5rem 1.5rem",
            borderRadius: 25,
            display: "flex",
            alignItems: "center",
          }}
        >
          <PriorityHighIcon
            sx={{
              fontSize: "18px",
              marginRight: "0.5rem",
            }}
          />
          <Typography
            sx={
              {
                // padding: 0,
                // margin: 0,
              }
            }
          >
            Maintenance Due
          </Typography>
        </div>
      </div>

      <div
        style={{
          margin: "2rem 0",
        }}
      ></div>

      {/* Main Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flexGrow: 8,
          }}
        ></div>

        {/* Right Section */}
        <div
          style={{
            flexGrow: 1,
          }}
        >
          {/* Weather Conditions */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Weather Conditions
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  padding: "0.5rem 2rem",
                  borderRadius: 25,
                }}
              >
                Download Report
              </Button>
            </div>
            <div
              style={{
                margin: "1rem 0",
              }}
            ></div>

            <span
              style={{
                color: "#979696",
                fontSize: "12px",
              }}
            >
              Temperature
            </span>

            <div
              style={{
                margin: "1rem 0",
              }}
            ></div>
            {/* Weather Card Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "1px solid #000",
                  alignItems: "space-between",
                  borderRadius: 15,
                  maxWidth: "140px",
                  flexGrow: 1,
                  textAlign: "center",
                  // flexGrow: 1,
                  minHeight: "171px",
                }}
              >
                <Typography
                  sx={{
                    color: "#A0AEC0",
                    fontSize: "12px",
                  }}
                >
                  Today
                </Typography>
                <img
                  src={`src/assets/dashboard/rainy.png`}
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto",
                  }}
                />

                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  20°C
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Rainy Storm Cloud
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#F5F5F5",
                  alignItems: "space-between",
                  textAlign: "center",
                  borderRadius: 15,
                  maxWidth: "140px",
                  flexGrow: 1,
                  minWidth: "130px",
                  minHeight: "180px",
                }}
              >
                <Typography
                  sx={{
                    color: "#A0AEC0",
                    fontSize: "12px",
                  }}
                >
                  28 Jul 2024
                </Typography>
                <img
                  src={`src/assets/dashboard/cloudy.png`}
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto",
                  }}
                />

                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  20°C
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Cloudy
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  // border: "1px solid #000",
                  alignItems: "space-between",
                  borderRadius: 15,
                  backgroundColor: "#F5F5F5",
                  maxWidth: "140px",
                  flexGrow: 1,
                  minHeight: "171px",
                }}
              >
                <Typography
                  sx={{
                    color: "#A0AEC0",
                    fontSize: "12px",
                  }}
                >
                  29 Jul 2024
                </Typography>
                <img
                  src={`src/assets/dashboard/cloudy.png`}
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto",
                  }}
                />

                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  26°C
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Cloudy
                </Typography>
              </div>
            </div>

            <div
              style={{
                margin: "1rem 0",
              }}
            ></div>
            {/* Misc Info Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "#6FC635",
                  padding: "1rem 1.5rem",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: "215px",
                  flexGrow: 1,
                }}
              >
                <img
                  src={`src/assets/dashboard/sun.png`}
                  style={{
                    width: "35px",
                    height: "35px",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography>Irradiance</Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    0 W/m<sup>2</sup>
                  </Typography>
                </div>
                <div>
                  <Typography>10%</Typography>
                </div>
              </Card>
              <Card
                sx={{
                  backgroundColor: "#6FC635",
                  padding: "1rem 1.5rem",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: "215px",
                  flexGrow: 1,
                }}
              >
                <img
                  src={`src/assets/dashboard/sun.png`}
                  style={{
                    width: "35px",
                    height: "35px",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography>Wind Speed</Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    12 km/h
                  </Typography>
                </div>
                <div>
                  <Typography>40%</Typography>
                </div>
              </Card>
            </div>
          </div>
          {/* End of Weather Condition */}

          <div
            style={{
              margin: "2rem 0",
            }}
          ></div>

          {/* Performance Section */}
          <Card
            sx={{
              backgroundColor: "#F8F7F7",
              padding: "1rem 1.5rem",
              borderRadius: 5,
            }}
          >
            <Typography
              style={{
                color: "#000",
                fontSize: "18px",
              }}
            >
              Potential Performance
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "40px",
                  }}
                >
                  462
                  <span
                    style={{
                      marginLeft: "1rem",
                      fontSize: "30px",
                    }}
                  >
                    mw
                  </span>
                </Typography>
              </div>
              <div
                style={{
                  backgroundColor: "#6FC635",
                  padding: "0.1rem 1.8rem",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  87%
                </Typography>
              </div>
            </div>

            <div
              style={{
                margin: "2rem 0",
              }}
            ></div>

            <span
              style={{
                color: "#979696",
                fontSize: "15px",
              }}
            >
              Monthly Highlights
            </span>
            <div
              style={{
                margin: "1rem 0",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "#fff",
                  padding: "1rem 1.5rem",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`src/assets/dashboard/solar-panel 1.png`}
                  style={{
                    width: "35px",
                    height: "35px",
                    flexShrink: 0,
                    border: "1px solid #000",
                    padding: "1rem",
                  }}
                />
                <div
                  style={{
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#40726C",
                      fontWeight: "bold",
                      fontSize: "35px",
                    }}
                  >
                    301 kWh
                  </Typography>
                </div>
                <div>
                  <Typography>Maximal Used</Typography>
                </div>
              </Card>
              <Card
                sx={{
                  backgroundColor: "#fff",
                  padding: "1rem 1.5rem",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`src/assets/dashboard/solar-panel 1.png`}
                  style={{
                    width: "35px",
                    height: "35px",
                    flexShrink: 0,
                    border: "1px solid #000",
                    padding: "1rem",
                  }}
                />
                <div
                  style={{
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#40726C",
                      fontWeight: "bold",
                      fontSize: "35px",
                    }}
                  >
                    189 kWh
                  </Typography>
                </div>
                <div>
                  <Typography>Minimal Used</Typography>
                </div>
              </Card>
              <Card
                sx={{
                  backgroundColor: "#fff",
                  padding: "1rem 1.5rem",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`src/assets/dashboard/solar-panel 1.png`}
                  style={{
                    width: "35px",
                    height: "35px",
                    flexShrink: 0,
                    border: "1px solid #000",
                    padding: "1rem",
                  }}
                />
                <div
                  style={{
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#40726C",
                      fontWeight: "bold",
                      fontSize: "35px",
                    }}
                  >
                    598 kWh
                  </Typography>
                </div>
                <div>
                  <Typography>Total Used</Typography>
                </div>
              </Card>
            </div>
          </Card>

          {/* End of Performance Section */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
