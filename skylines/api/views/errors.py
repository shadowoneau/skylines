from werkzeug.exceptions import HTTPException, InternalServerError
from .json import jsonify


def register(app):
    """ Register error handlers on the given app """

    @app.errorhandler(400)
    @app.errorhandler(404)
    @app.errorhandler(500)
    def handle_http_error(e):
        if not isinstance(e, HTTPException):
            e = InternalServerError()

        return jsonify({
            'message': e.description,
        }, status=e.code)

    @app.errorhandler(TypeError)
    @app.errorhandler(ValueError)
    def raise_bad_request(e):
        return jsonify({
            'message': e.message,
        }, status=400)

    @app.errorhandler(LookupError)
    def raise_not_found(e):
        return jsonify({
            'message': e.message,
        }, status=404)
