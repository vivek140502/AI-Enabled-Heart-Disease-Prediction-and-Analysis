import joblib
import mysql.connector
from passlib.context import CryptContext
from fastapi import Form,HTTPException
from model import *
from mysql.connector import Error as MySQLError
import os 


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_database_connection():
    DB_HOST = os.getenv('DB_HOST')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_DATABASE = os.getenv('DB_DATABASE')

    try:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_DATABASE
        )
        return conn
    except:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
        )
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS aeron")

        return conn


def Probability_Of_Heart_Disease(p: Predict):
    model = joblib.load('model_joblib_heart')
    p1 = int(p.age)
    if p.gender == 'Male':
        p2 = 1
    else:
        p2 = 0
    p3 = int(p.cp)
    p4 = int(p.trestbps)
    p5 = int(p.chol)
    p6 = int(p.fbs)
    p7 = int(p.restecg)
    p8 = int(p.mhra)
    p9 = int(p.exang)
    p10 = float(p.oldpeak)
    p11 = int(p.slope)
    p12 = int(p.ca)
    p13 = int(p.thal)
    conn = get_database_connection()
    cursor = conn.cursor()
    cursor.execute("select Customer_id from heart_disease.register_details where Email=%s", (p.email,))
    res = cursor.fetchone()[0]
    if res:
        cursor.execute(
            "insert into heart_disease.heart_info(Customer_id,Age,Gender,Cp,Trestbps,Chol,Fbs,Restecg,Mhra,Exang,Oldpeak,Slope,Ca,Thal) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
            (res, p.age, p.gender, p.cp, p.trestbps, p.chol, p.fbs, p.restecg, p.mhra, p.exang, p.oldpeak, p.slope,
             p.ca, p.thal))
        conn.commit()
        res = model.predict_proba([[p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13]])[:, 1]
        percentage_of_heart_disease = res * 100
        return {"data": int(percentage_of_heart_disease)}


def login_user(login: Login):
    conn = get_database_connection()
    cursor = conn.cursor()
    query = """Select Email,Password from heart_disease.register_details where Email=%s"""
    cursor.execute(query, (login.email,))
    data = cursor.fetchone()
    if data and pwd_context.verify(login.password, data[1]):
        return "Login Successfully"
    elif data:
        raise HTTPException(status_code=400, detail="Password is incorrect")
    else:
        raise HTTPException(status_code=400, detail="No user exists")


def Register_User(r: Register_U):
    hashed_password = pwd_context.hash(r.Password)
    try:
        conn = get_database_connection()
        cursor = conn.cursor()
        # Create the database if it doesn't exist
        cursor.execute("CREATE DATABASE IF NOT EXISTS heart_disease")
        cursor.execute("USE heart_disease")

        # Create the tables if they don't exist
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS register_details (
                Customer_id INT AUTO_INCREMENT PRIMARY KEY,
                Username VARCHAR(50) NULL,
                Full_name VARCHAR(50) NULL,
                Mobile_number BIGINT NULL,
                Email VARCHAR(75) NULL,
                Password VARCHAR(100) NULL,
                Gender VARCHAR(6) NULL,
                Age INT NULL,
                Weight FLOAT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS heart_info (
                Customer_id INT NOT NULL,
                Age INT NULL,
                Gender VARCHAR(6) NULL,
                Cp INT NULL,
                Trestbps INT NULL,
                Chol INT NULL,
                Fbs INT NULL,
                Restecg INT NULL,
                Mhra INT NULL,
                Exang INT NULL,
                Oldpeak INT NULL,
                Slope INT NULL,
                Ca INT NULL,
                Thal INT NULL,
                INDEX (Customer_id),
                FOREIGN KEY (Customer_id) REFERENCES register_details(Customer_id)
            )
        """)

        # Check if the user already exists
        query = "SELECT * FROM register_details WHERE email = %s"
        value = (r.Email,)
        cursor.execute(query, value)
        result = cursor.fetchone()
        if result:
            print('User already exists')
            raise HTTPException(status_code=400, detail="Email already exists")

        # Insert the new user
        insert_query = "INSERT INTO register_details(Username, Full_name,Mobile_number, Email, Password, Gender, Age, Weight) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)"
        values = (r.Username, r.Fullname, r.Mobile_number, r.Email, hashed_password, r.Gender, r.Age, r.Weight)
        cursor.execute(insert_query, values)
        conn.commit()
        return "User registered successfully"
    except MySQLError as e:
        # Log the error for debugging purposes
        print(f"Database error: {e}")
        # Return a more informative error message to the client
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later.")





