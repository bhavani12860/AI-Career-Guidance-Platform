import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Bhavani@123",
    database="ai_career_platform"
)

cursor = db.cursor()