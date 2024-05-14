from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from logic import *


load_dotenv()
app = FastAPI()
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_DATABASE = os.getenv('DB_DATABASE')

# Now use these variables to create your database connection entities



app.add_middleware(
 CORSMiddleware,
 allow_origins=["*"],
 allow_credentials=True,
 allow_methods=["*"],
 allow_headers=["*"]
 )

@app.post("/api/model/")
async def probability_of_heart_disease(p:Predict):
 return Probability_Of_Heart_Disease(p)

@app.post("/api/login/")
async def Login(login:Login):

 return login_user(login)

@app.post("/api/Register/")
async def Register(r:Register_U):
 return Register_User(r)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app,host="127.0.0.1",port=8000)
