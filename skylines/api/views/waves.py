from flask import Blueprint, request

from skylines import api
from .json import jsonify
from .parser import parse_location

waves_blueprint = Blueprint('waves', 'skylines')


@waves_blueprint.route('/')
def list():
    location = parse_location(request.args)
    return jsonify(api.get_waves_by_location(location))
