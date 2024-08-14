import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { Close, CheckCircle, Info } from "@mui/icons-material";

import GppGoodIcon from "@mui/icons-material/GppGood";

const BlockchainEnergyDataModal = ({ open, onClose }) => {
  const dates = Array(15).fill("2019-11-");

  const electricalData = {
    timestamp: "2019-11-18 12:00:00",
    acPower: 6500,
    acCurrent: 28,
    dcCurrent: 30,
    acVoltage: 230,
    dcVoltage: 400,
    irr: 800,
  };

  const groupedMeasurements = {
    acPower: [1000, 1100, 1200, 1300, 1400, 1500],
    acCurrent: [4.5, 4.8, 5.0, 5.2, 5.4, 5.6],
    dcCurrent: [4.0, 4.2, 4.4, 4.6, 4.8, 5.0],
    acVoltage: [220, 225, 230, 235, 240, 245],
    dcVoltage: [395, 400, 405, 410, 415, 420],
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Typography variant="h6">
              Energy Production data on Blockchain
            </Typography>
            <GppGoodIcon color="success" sx={{ ml: 3, fontSize: 24 }} />
          </Box>

          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ height: "100%", overflow: "auto" }}>
              <Typography
                variant="subtitle1"
                sx={{ p: 1, backgroundColor: "#f5f5f5" }}
              >
                DATE
              </Typography>
              {dates.map((date, index) => (
                <Typography key={index} variant="body2" sx={{ p: 1 }}>
                  {`${date}${index + 1}`}
                </Typography>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box mb={2}>
              <Typography variant="h6">Block Index: 501</Typography>
              <Typography variant="body2" display="flex" alignItems="center">
                Block hash: 102302130124828410319184120931230123810
                <IconButton size="small">
                  <Info fontSize="small" />
                </IconButton>
              </Typography>
              <Typography variant="body2" display="flex" alignItems="center">
                MerkleRoot: 102302130124828410319184120931230123810
                <IconButton size="small">
                  <Info fontSize="small" />
                </IconButton>
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              Electrical Data (November 18, 2019 - 12:00 PM)
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>AC Power (W)</TableCell>
                    <TableCell>AC Current (A)</TableCell>
                    <TableCell>DC Current (A)</TableCell>
                    <TableCell>AC Voltage (V)</TableCell>
                    <TableCell>DC Voltage (V)</TableCell>
                    <TableCell>IRR (W/m²)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{electricalData.timestamp}</TableCell>
                    <TableCell>{electricalData.acPower}</TableCell>
                    <TableCell>{electricalData.acCurrent}</TableCell>
                    <TableCell>{electricalData.dcCurrent}</TableCell>
                    <TableCell>{electricalData.acVoltage}</TableCell>
                    <TableCell>{electricalData.dcVoltage}</TableCell>
                    <TableCell>{electricalData.irr}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" gutterBottom>
              Grouped Measurements
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {[1, 2, 3, 4, 5, 6].map((group) => (
                      <TableCell key={group}>Group {group}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(groupedMeasurements).map(([key, values]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key === "acPower"
                          ? "AC Power (W)"
                          : key === "acCurrent"
                            ? "AC Current (A)"
                            : key === "dcCurrent"
                              ? "DC Current (A)"
                              : key === "acVoltage"
                                ? "AC Voltage (V)"
                                : "DC Voltage (V)"}
                      </TableCell>
                      {values.map((value, index) => (
                        <TableCell key={index}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BlockchainEnergyDataModal;
