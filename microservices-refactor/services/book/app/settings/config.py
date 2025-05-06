class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://bookstore_user:bookstore_pass@localhost:3306/bookstore'
    SECRET_KEY = 'some-secret-key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
