import base64
from http import HTTPStatus

from flask import request

from .api import BaseResource
from ..models import UserModel


class User(BaseResource):
    path = "/user/<user_id>"

    @classmethod
    def get(cls, user_id):
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

    @classmethod
    def patch(cls, user_id):
        json = request.get_json()
        username = json.get("username")
        email = json.get("email")
        password = json.get("password")
        avatar = json.get("avatar")

        if not user_id:
            return {
                "message": "id is required"
            }, HTTPStatus.BAD_REQUEST
        
        user = UserModel.get_by_id(user_id)

        if avatar:
            avatar = base64.b64decode(avatar)
        
        try:
            user.patch(username, email, password, avatar)
        except Exception as e:
            return {
                "message": str(e)
            }, HTTPStatus.BAD_REQUEST
        else:
            return {
                "message": "User updated successfully"
            }, HTTPStatus.OK