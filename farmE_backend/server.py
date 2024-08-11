from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import glob

# Import functions from other files
import pdf_md_rag
import multimodal_chatbot
import daily_energy_report_gen
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the AI Interview System!"}

# RAG-based Q&A Endpoint
@app.post("/rag_qa")
async def rag_qa(user_question: str):
    documents = load_and_combine_pdfs("./gemini_model/report_database")
    save_to_markdown(documents, "./gemini_model/output_markdown")
    raw_text = get_markdown_text(glob.glob("./gemini_model/output_markdown/*.md"))
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    response = user_input({"question": user_question})
    return response

# Report Generation Endpoints
@app.post("/generate_report")
async def generate_report():
    # Assuming generate_report function is defined in one of the imported files
    report = generate_report_function()  # Replace with actual function call
    return report

@app.get("/download_report/{filename}")
async def download_report(filename: str):
    # Assuming download_report function is defined in one of the imported files
    report_file = download_report_function(filename)  # Replace with actual function call
    return FileResponse(report_file, media_type="application/pdf", filename=filename)

# Gemini Model Endpoints
@app.post("/gemini_text")
async def gemini_text(text_input: str = Form(...)):
    response = user_input({"question": text_input})
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)