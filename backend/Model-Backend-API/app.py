import os.path
from db import db

from flask import Flask
from flask_migrate import Migrate

from Resources.injury import blp as injury_blp

def create_app(db_url=None):
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DATABASE_URL", "sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate = Migrate(app, db, compare_type=False)

    app.register_blueprint(injury_blp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)