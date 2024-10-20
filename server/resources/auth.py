from http import HTTPStatus

from flask import request
from flask_jwt_extended import create_access_token
from passlib.hash import pbkdf2_sha256

from .api import BaseResource
from ..models import UserModel


class Login(BaseResource):
    path = "/auth/login"

    @classmethod
    def post(cls):
        json = request.get_json()
        user = UserModel.auth(
            json.get("username"),
            json.get("password")
        )

        if user:
            access_token = create_access_token(identity=user.json())
            user_data = user.json()
            user_data.update({"email": user.email})
            return {
                "message": "Login successful",
                "user": user_data,
                "access_token": access_token
            }, HTTPStatus.OK
        else:
            return {
                "message": "Login or password is incorrect"
            }, HTTPStatus.UNAUTHORIZED
        

class Register(BaseResource):
    path = "/auth/register"

    @classmethod
    def post(cls):
        json = request.get_json()
        username = json.get("username")
        password = json.get("password")
        email = json.get("email")

        if not all([username, password, email]):
            return {
                "message": "missed fields which required"
            }, HTTPStatus.BAD_REQUEST

        user = UserModel(
            username, 
            pbkdf2_sha256.hash(password), 
            email
        )
        
        print("user: ", user.json())
        access_token = create_access_token(identity=user.json())
        user_data = user.json()
        user_data.update({"email": user.email})
        return {
            "message": "User created successfully",
            "access_token": access_token,
            "user": user_data
        }, HTTPStatus.CREATED