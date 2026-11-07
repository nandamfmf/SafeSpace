from pathlib import Path
import sqlite3

DATABASE_PATH = Path(__file__).with_name("database.db")

def get_connection():
    return sqlite3.connect(DATABASE_PATH)

with get_connection() as con:
    con.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    """)


