import os.path
import atexit
from db import db

from flask import Flask
from flask_migrate import Migrate
from flask_smorest import Api
from flask_cors import CORS

from Resources.injury import blp as injury_blp
from Resources.kit import blp as kit_blp
from Resources.admin import blp as admin_blp
from Resources.kit_admin import blp as kit_admin_blp
from Resources.kit_compartment import blp as kit_compartment_blp
from Resources.measurements import blp as measurements_blp
from Resources.notification import blp as notification_blp


def create_app(db_url=None):
    app = Flask(__name__)

    CORS(app)

    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Workshop Backend REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"

    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DATABASE_URL", "sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    app.config["broker_url"] = os.getenv("BROKER_URL", "redis://localhost:6379/0")
    app.config["result_backend"] = os.getenv("RESULT_BACKEND", "redis://localhost:6379/0")

    db.init_app(app)
    migrate = Migrate(app, db, compare_type=False)

    api = Api(app)

    api.register_blueprint(injury_blp)
    api.register_blueprint(kit_blp)
    api.register_blueprint(admin_blp)
    api.register_blueprint(kit_admin_blp)
    api.register_blueprint(kit_compartment_blp)
    api.register_blueprint(measurements_blp)
    api.register_blueprint(notification_blp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
