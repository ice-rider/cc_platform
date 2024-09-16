from http import HTTPStatus

from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .api import BaseResource
from ..models import UserModel, UserRole
 

class Admin(BaseResource):
    path = "/admin"

    @classmethod
    @jwt_required()
    def post(cls):
        jwt = get_jwt_identity()

        if jwt["role"] != UserRole.ADMIN:
            return {
                "message": "admin role required for this action"
            }, HTTPStatus.FORBIDDEN

        user_id = request.get_json().get("user_id")
        if not user_id:
            return {
                "message": "user_id is required"
            }, HTTPStatus.BAD_REQUEST

        user = UserModel.get_by_id(user_id)
        if not user:
            return {
                "message": "user not found"
            }, HTTPStatus.NOT_FOUND
        user.role = UserRole.ADMIN
        user.save()
