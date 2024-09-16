import {
  Button,
  Card,
  Avatar,
  Paper,
  Box,
  Select,
  Divider,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Typography,
  CardContent,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const mockData = [
  {
    title: "Solar Panel 6 is not working regularly",
    date: "August 5, 2024",
  },
  {
    title: "Heavy rain expected in the next 24 hours",
    date: "August 5, 2024",
  },
  // {
  //   title: "Notification 3",
  //   date: "March 10, 2024",
  // },
  // {
  //   title: "Notification 4",
  //   date: "March 10, 2024",
  // },
];

export default function Subscription() {
  return (
    <>
      <Box
        sx={{
          paddingTop: 2,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
          Market your company to potential farmers
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "#565555" }}>
          Just probably write something here. Like how you pay subscription for
          one month or whatnot then find potential farmers that auto matches the
          requirement or products of the company idk.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "6rem",
          }}
        >
          {["Basic Marketing", "Premium Marketing"].map((plan, index) => (
            <Card
              key={plan}
              sx={{
                width: "45%",
                textAlign: "center",
                backgroundColor: "#F8F8F8",
                borderRadius: 2,
                border: "1px solid #E8E8E8",
                maxWidth: 440,
                minHeight: 500,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#4B6837",
                    fontWeight: "bold",
                    marginBottom: 3,
                  }}
                >
                  {plan}
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    // color: "#4B6837",
                    fontSize: "120px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      fontWeight: "bold",
                      // color: "#4B6837",
                    }}
                  >
                    RM
                  </span>{" "}
                  {index === 0 ? "29" : "59"}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    textAlign: "end",
                    marginRight: 10,
                  }}
                >
                  per month
                </Typography>
                <List>
                  {[1, 2, 3, 4].map((item) => (
                    <ListItem key={item}>
                      <ListItemText primary="lorem ipsum dolor sit amet" />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 20,
                    color: "#fff",
                    backgroundColor: "#000",
                    padding: "10px 50px",
                    marginTop: 4,
                  }}
                >
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
