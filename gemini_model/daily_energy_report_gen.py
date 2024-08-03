import pandas as pd
from datetime import datetime, timedelta
from fpdf import FPDF
import matplotlib.pyplot as plt
import os
from dotenv import load_dotenv
import google.generativeai as genai
import getpass
import json

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
import uvicorn

app = FastAPI()

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = getpass.getpass(os.getenv("GOOGLE_API_KEY"))
    
def create_energy_report():
    # Read the CSV data (assuming it's saved as 'data.csv')
    df = pd.read_csv('C:/FarmE/preprocessing_data/2019-11-27_rain.csv', parse_dates=['timestamp'])

    # Calculate energy generated (kWh) for each hour
    df['hour'] = df['timestamp'].dt.floor('h')
    hourly_energy = df.groupby('hour')['P_AC'].sum() / 60 / 1000  # Sum of minute values, divided by 60 to get hourly kWh

    #energy generated inverter conversion rate
    # P_DC = I_DC * V_DC
    # convertion_efficiency_rate = P_DC * P_AC
    df['P_DC'] = df['I_DC'] * df['V_DC']
    hourly_energy_DC = df.groupby('hour')['P_DC'].sum() / 60 / 1000  # Sum of minute values, divided by 60 to get hourly kWh

    # Calculate hourly data
    hourly_temp = df.groupby('hour')['temp'].mean() # Mean of temp

    hourly_wind_speed = df.groupby('hour')['vento_vel'].mean() # Mean of wind speed

    hourly_wind_direction = df.groupby('hour')['vento_dir'].mean() # Mean of wind direction

    hourly_rainfall = df.groupby('hour')['rainfall'].sum() # Sum of rainfall

    hourly_tamanho_medio = df.groupby('hour')['tamanho_medio'].mean() # Mean of tamanho_medio

    sunlight_hour = 0
    # Calculate total energy generated
    total_energy_generated = hourly_energy.sum()
    total_energy_generated_DC = hourly_energy_DC.sum()
    conversion_efficiency_rate = total_energy_generated / total_energy_generated_DC * 100 

    # Calculate other metrics
    avg_temp = df['temp'].mean()
    avg_wind_speed = df['vento_vel'].mean()
    total_rainfall = df['rainfall'].sum()
    avg_mass_pm1 = df['massaPM1'].mean()
    avg_mass_pm2_5 = df['massaPM2'].mean()
    avg_mass_pm4 = df['massaPM4'].mean()
    avg_mass_pm10 = df['massaPM10'].mean()
    avg_tamnho_medio = df['tamanho_medio'].mean()
    co2_savings = total_energy_generated * 0.758  # 0.758 kg CO2 per kWh based on research



    # Calculate most frequent wind direction
    wind_direction_mode = df['vento_dir'].mode().iloc[0]


    # Lists to store the formatted strings
    hourly_energy_list = []
    hourly_energy_DC_list = []


    # Populate the lists
    for hour, energy in hourly_energy.items():
        hourly_energy_list.append(f"{hour.strftime('%H:%M')}: {energy:.2f} kWh")
        if energy > 0:
            sunlight_hour += 1



    today_date = df['timestamp'].dt.date.iloc[0]


    system_downtime = "no information"
    maintenance_activity = "no information"
    energy_consumption = "no information"
    on_site_consumption = "no information"
    ystd_energy_gen = "no information"
    increased_energy_gen_percent_ystd = "no information"
    histroical_energy_gen = "no information"
    increased_energy_gen_percent_hist = "no information"
    other_env_impact = "no information"
    performance_alert = "no information"
    weather_warning = "no information"


    # Calculating hourly energy
    # hourly_energy = df.groupby('hour')['P_AC'].sum() / 60 / 1000  # Sum of minute values, divided by 60 to get hourly kWh

    # Find the highest kWh in the day
    peak_hour = hourly_energy.idxmax()
    peak_energy = hourly_energy.max()

    summary = (
        f"Weather Conditions:\n"
        f"Date: {today_date}\n"
        f"Sunlight Hours: {sunlight_hour}\n"
        f"Average Temperature: {avg_temp:.2f}°C\n"
        f"Average Wind Speed: {avg_wind_speed:.2f} m/s\n"
        f"Most Frequent Wind Direction: {wind_direction_mode}°\n"
        f"Total Rainfall: {total_rainfall:.2f} mm\n"
        f"Air Quality Data:\n"
        f"Average PM1: {avg_mass_pm1:.2f} µg/m³\n"
        f"Average PM2.5: {avg_mass_pm2_5:.2f} µg/m³\n"
        f"Average PM4: {avg_mass_pm4:.2f} µg/m³\n"
        f"Average PM10: {avg_mass_pm10:.2f} µg/m³\n"
        f"Average Particulate Concentration: {avg_tamnho_medio:.2f} particle/m³\n\n"

        f"Energy Generation Data:\n"
        f"Total Energy Generated AC: {total_energy_generated:.2f} kWh\n"
        f"Total Energy Generated DC: {total_energy_generated_DC:.2f} kWh\n"
        f"Conversion Efficiency Rate: {conversion_efficiency_rate:.2f}%\n"
        f"Peak hour: {peak_hour}: {peak_energy:.2f} kWh\n"
    )

    # Display the lists
    summary += "Hourly Energy Generation:\n"
    for entry in hourly_energy.items():
        summary += f"  {entry[0]}: {entry[1]:.2f} kWh\n"

    summary += (
        f"System downtime: {system_downtime}\n"
        f"Maintenance Activity: {maintenance_activity}\n"
        f"Energy Consumption: {energy_consumption}\n"
        f"On-site Consumption: {on_site_consumption}\n"
        f"Yesterday's Energy Generation: {ystd_energy_gen}\n"
        f"Increased Energy Generation Percentage from Yesterday: {increased_energy_gen_percent_ystd}\n"
        f"Historical Energy Generation: {histroical_energy_gen}\n"
        f"Increased Energy Generation Percentage from Historical: {increased_energy_gen_percent_hist}\n"
        f"CO2 Savings: {co2_savings:.2f} kg\n"
        f"Other environmental impact: {other_env_impact}\n"
        f"Performance Alerts: {performance_alert}\n"
        f"Weather Warnings: {weather_warning}\n"
    )

    # print(summary)



    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
    }

    model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction="""
    You are the report generation model. Your task is to generate a  Other Environmental Impact, Performance Alerts,  Weather Warnings, summary and recommendation for daily energy generation report based on the provided data. 
    Your duties include summarizing the data and providing a recommendation paragraph. If any data is missing or not provided, just say no information.
    Sample Information you will be provided is:
    Weather Conditions:
    Date: 
    Sunlight Hours:
    Average Temperature: °C
    Average Wind Speed:  m/s
    Most Frequent Wind Direction: °
    Total Rainfall:  mm
    Air Quality Data:
    Average PM1:  µg/m³
    Average PM2.5: µg/m³
    Average PM4:  µg/m³
    Average PM10:  µg/m³
    Average Particulate Concentration:  particle/m³
    Energy Generation Data:
    Total Energy Generated AC:  kWh
    Total Energy Generated DC:  kWh
    Conversion Efficiency Rate: %
    Peak hour: 
    Hourly Energy Generation:
    
    System and Maintenance Data
        System Downtime: The period during which the energy generation system was non-operational.
        Maintenance Activity: Any scheduled or unscheduled maintenance activities performed on the system.
    Energy Consumption and On-site Usage
    Energy Consumption: The total amount of energy consumed on-site.
    On-site Consumption: The amount of energy generated that was consumed on-site.
    Comparative Data
    Yesterday's Energy Generation: The total energy generated on the previous day.
    Increased Energy Generation Percentage from Yesterday:The percentage increase in energy generation compared to the previous day.
    Historical Energy Generation: The historical average energy generation for this date.
    Increased Energy Generation Percentage from Historical: The percentage increase in energy generation compared to the historical average.
    Environmental Impact
    CO2 Savings: The amount of CO2 emissions prevented due to the generated energy.
    Other Environmental Impact: Any additional environmental benefits achieved.
    Performance and Safety Alerts
    Performance Alerts: Any alerts indicating issues with the system performance. (if any is provided)
    Weather Warnings: Any weather-related warnings that might affect energy generation. (if any is provided)
    
    Template:
    Other Environmental Impact: Any additional environmental benefits achieved. (generate some base on the provided information)
    Performance Alerts: Any alerts indicating issues with the system performance. (generate some base on the provided information)
    Weather Warnings: Any weather-related warnings that might affect energy generation. (generate some base on the provided information)
    Summary: A brief overview of the day's energy generation and related data.
    Recommendations: Suggestions for improving energy generation efficiency or addressing any issues identified or any other suggestion at least give one if nothing from the provided information
    """
    )

    chat_session = model.start_chat(
    history=[
    ]
    )
    info = f"{summary}"
    response = chat_session.send_message(info)

    # print(response.text)
    json_data = response.text




    # Load JSON data into a dictionary
    data = json.loads(json_data)

    # Extract the values of "Summary" and "Recommendations"
    other_env_impact = data.get("Other Environmental Impact", "No other environmental impact available")
    performance_alert = data.get("Performance Alerts", "No performance alerts available")
    weather_warning = data.get("Weather Warnings", "No weather warnings available")
    summary = data.get("Summary", "No summary available")
    recommendations = data.get("Recommendations", "No recommendations available")

    # Print the extracted values
    # print("Other Environmental Impact:")
    # print(other_env_impact)
    # print("\nPerformance Alerts:")
    # print(performance_alert)
    # print("\nWeather Warnings:")
    # print(weather_warning)
    # print("Summary:")
    # print(summary)
    # print("\nRecommendations:")
    # print(recommendations)



    class PDF(FPDF):
        def header(self):
            # Only show header on the first page
            if self.page_no() == 1:
                self.set_font('Arial', 'B', 24)
                self.cell(0, 10, f'Daily Energy Generation Report on {today_date}', 0, 1, 'C')
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
    Sunlight Hours: {sunlight_hour}
    Average Temperature: {avg_temp:.2f}°C
    Average Wind Speed: {avg_wind_speed:.2f} m/s
    Most Frequent Wind Direction: {wind_direction_mode}°
    Total Rainfall: {total_rainfall:.2f} mm
    Air Quality Data:
        Average PM1: {avg_mass_pm1:.2f} µg/m³
        Average PM2.5: {avg_mass_pm2_5:.2f} µg/m³
        Average PM4: {avg_mass_pm4:.2f} µg/m³
        Average PM10: {avg_mass_pm10:.2f} µg/m³
        Average Particulate Concentration: {avg_tamnho_medio:.2f} particle/m³
    """

    energy_generation_data = f"""
    Total Energy Generated AC: {total_energy_generated:.2f} kWh
    Total Energy Generated DC: {total_energy_generated_DC:.2f} kWh
    Conversion Efficiency Rate: {conversion_efficiency_rate:.2f}%
    Peak hour: {peak_hour}: {peak_energy:.2f} kWh

    Hourly Energy Generation:
    {hourly_energy_list}:
    """

    environmental_impact = f"""
    Environmental Impact:{other_env_impact}
    CO2 Savings: {co2_savings:.2f} kg
    """

    alerts_notifications = f"""
    Performance Alerts: {performance_alert}
    Weather Warnings: {weather_warning}
    """

    summary_recommendations = f"""
    Summary: {summary}

    Recommendations: {recommendations}
    """

    # Add chapters to the PDF
    pdf.add_chapter('Weather Conditions', weather_conditions)
    pdf.add_chapter('Energy Generation Data', energy_generation_data)
    pdf.add_chapter('Environmental Impact', environmental_impact)
    pdf.add_chapter('Alerts and Notifications', alerts_notifications)
    pdf.add_chapter('Summary and Recommendations', summary_recommendations)


    # Ensure all series have the same hours
    available_hours = df['hour'].unique()

    # Variables to plot
    variables = {
        'Energy Generation (kWh)': hourly_energy,
        'Temperature (°C)': hourly_temp,
        'Wind Speed (ms)': hourly_wind_speed,
        'Wind Direction (°)': hourly_wind_direction,
        'Rainfall (mm)': hourly_rainfall,
        'Particulate Size (µm)': hourly_tamanho_medio
    }


    # Constants for image placement
    img_width = 190  # Width of the image in the PDF (190 mm to fit within page margins)
    img_height = 110  # Height of the image in the PDF (100 mm)
    margin = 10  # Margin around the image
    x_pos = margin
    y_pos = margin
    max_y = 297  # A4 page height in mm

    # Add the first page
    pdf.add_page()

    # Plot each variable
    for variable_name, variable_data in variables.items():
        # Ensure that the variable_data is aligned with available_hours
        variable_data_aligned = variable_data.reindex(available_hours).fillna(0)
        
        plt.figure(figsize=(10, 6))
        plt.plot(available_hours, variable_data_aligned, marker='o')
        plt.title(f'Hourly {variable_name}')
        plt.xlabel('Hour of Day')
        plt.ylabel(f'{variable_name}')
        plt.grid(True)
        plt.xticks(rotation=45)
        plt.tight_layout()

        # Save the plot as an image
        plot_filename = f'hourly_{variable_name.replace(" ", "_").replace("(", "").replace(")", "")}.png'
        plt.savefig(plot_filename)
        plt.close()

        # Check if adding the image would exceed the page height
        if y_pos + img_height + margin > max_y:
            # Add a new page
            pdf.add_page()
            y_pos = margin  # Reset y position

        # Append the plot to the PDF
        pdf.image(plot_filename, x=x_pos, y=y_pos, w=img_width)
        
        # Update y position for the next image
        y_pos += img_height + margin

        # Clean up the plot image file
        os.remove(plot_filename)

    # Save the final PDF
    pdf_filename = f"./gemini_model/report_database/daily_energy_generation_report_{today_date}.pdf"
    pdf.output(pdf_filename)

    print(f"PDF report saved to: {pdf_filename}")
    return pdf_filename
    
@app.post("/generate_report/")
async def generate_report():
    try:
        # Generate the PDF report and return the path
        report_path = create_energy_report()
        return {"message": "Report generated successfully", "path": report_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download_report/{filename}")
async def download_report(filename: str):
    directory = "./gemini_model/report_database"
    file_path = os.path.join(directory, filename)
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename, media_type='application/pdf')
    else:
        raise HTTPException(status_code=404, detail="File not found")

if __name__ == "__main__":
    uvicorn.run(app,host="0.0.0.0",port=5002)







