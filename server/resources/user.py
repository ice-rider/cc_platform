from http import HTTPStatus

from flask import request

from .api import BaseResource
from ..models import UserModel


class User(BaseResource):
    path = "/user"

    @classmethod
    def get(cls):
        user_id = request.args.get("id")
        if not user_id:
            return {
                "message": "id is required"
            }, HTTPStatus.BAD_REQUEST
        
        user = UserModel.get_by_id(user_id)

        if user:
            return {
                "user": user.json()
            }, HTTPStatus.OK
        else:
            return {
                "message": "No user found"
            }, HTTPStatus.NOT_FOUND
