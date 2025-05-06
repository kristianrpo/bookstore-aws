class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://bookstore_user:bookstore_pass@db/bookstore'
    SECRET_KEY = 'some-secret-key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
