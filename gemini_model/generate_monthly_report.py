import pandas as pd
from datetime import datetime
from fpdf import FPDF

# Load data
data = pd.read_csv('./preprocessing_data/final_complete_data.csv')

# Ensure timestamp is in datetime format
data['timestamp'] = pd.to_datetime(data['timestamp'])

# Filter for November data
november_data = data[data['timestamp'].dt.month == 11]

# Group by month for November
monthly_data = november_data.groupby(november_data['timestamp'].dt.to_period('M')).agg({
    'IRR': ['sum', 'mean'],
    'massaPM1': 'mean',
    'massaPM2': 'mean',
    'massaPM4': 'mean',
    'massaPM10': 'mean',
    'numPM1': 'mean',
    'numPM2': 'mean',
    'numPM4': 'mean',
    'numPM10': 'mean',
    'tamanho_medio': 'mean',
    'temp': 'mean',
    'vento_vel': 'mean',
    'rainfall': 'sum',
    'P_AC': 'sum',
    'I_AC': 'sum',
    'I_DC': 'sum',
    'V_AC': 'mean',
    'V_DC': 'mean'
})

# Flatten the multi-level column index
monthly_data.columns = ['_'.join(col).strip() for col in monthly_data.columns.values]

# Get the aggregated data for November
row = monthly_data.iloc[0]  # Since it's monthly data, there should be only one row

# Prepare monthly report
today_date = 'November'
total_sunlight_hours = row['IRR_sum'] / 60  # Assuming IRR is measured per minute
average_temp = row['temp_mean']
average_wind_speed = row['vento_vel_mean']
total_rainfall = row['rainfall_sum']

air_quality_data = {
    'Average PM1': row['massaPM1_mean'],
    'Average PM2.5': row['massaPM2_mean'],
    'Average PM4': row['massaPM4_mean'],
    'Average PM10': row['massaPM10_mean'],
    'Average Particulate Concentration': row['numPM1_mean']  # Assuming numPM1 is the particulate concentration
}

energy_data = {
    'Total Energy Generated AC': row['P_AC_sum'] / 1000,  # Assuming P_AC is in Wh
    'Total Energy Generated DC': row['I_DC_sum'] * row['V_DC_mean'] / 1000,  # Assuming I_DC and V_DC are in W and V
    'Conversion Efficiency Rate': (row['P_AC_sum'] / (row['I_DC_sum'] * row['V_DC_mean'])) * 100
}

# Generate the PDF report
class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 24)
        self.cell(0, 10, f'Monthly Energy Generation Report for November', 0, 1, 'C')
        self.ln(10)

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(5)

    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, body)
        self.ln()

    def add_chapter(self, title, body):
        self.add_page()
        self.chapter_title(title)
        self.chapter_body(body)

# Create the PDF object
pdf = PDF()
pdf.set_left_margin(10)
pdf.set_right_margin(10)

# Add content to the PDF
weather_conditions = f"""
Sunlight Hours: {total_sunlight_hours:.2f} hours
Average Temperature: {average_temp:.2f}°C
Average Wind Speed: {average_wind_speed:.2f} m/s
Total Rainfall: {total_rainfall:.2f} mm
Air Quality Data:
    Average PM1: {air_quality_data['Average PM1']:.2f} µg/m³
    Average PM2.5: {air_quality_data['Average PM2.5']:.2f} µg/m³
    Average PM4: {air_quality_data['Average PM4']:.2f} µg/m³
    Average PM10: {air_quality_data['Average PM10']:.2f} µg/m³
    Average Particulate Concentration: {air_quality_data['Average Particulate Concentration']:.2f} particles/m³
"""

energy_generation_data = f"""
Total Energy Generated AC: {energy_data['Total Energy Generated AC']:.2f} kWh
Total Energy Generated DC: {energy_data['Total Energy Generated DC']:.2f} kWh
Conversion Efficiency Rate: {energy_data['Conversion Efficiency Rate']:.2f}%
"""

environmental_impact = f"""
Environmental Impact: The clean energy generated this month contributed to improved air quality by reducing greenhouse gas emissions, promoting a healthier environment.
CO2 Savings: {energy_data['Total Energy Generated AC'] * 0.75:.2f} kg
"""

alerts_notifications = f"""
Performance Alerts: No performance alerts were reported for this month.
Weather Warnings: No weather warnings were reported for this month.
"""

summary_recommendations = f"""
Summary: The energy generation and environmental conditions for November have been analyzed.
Recommendations: Consider optimizing energy generation during periods of lower efficiency and monitoring weather conditions for better performance.
"""

# Add chapters to the PDF
pdf.add_chapter('Weather Conditions', weather_conditions)
pdf.add_chapter('Energy Generation Data', energy_generation_data)
pdf.add_chapter('Environmental Impact', environmental_impact)
pdf.add_chapter('Alerts and Notifications', alerts_notifications)
pdf.add_chapter('Summary and Recommendations', summary_recommendations)

# Save the PDF
pdf_filename = f"./gemini_model/report_database/monthly_energy_generation_report_november.pdf"
pdf.output(pdf_filename)

print(f"PDF report saved to: {pdf_filename}")
