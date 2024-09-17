from http import HTTPStatus

from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .api import BaseResource
from ..models import PostModel, UserRole


class Post(BaseResource):
    path = "/post"
    
    @classmethod
    def get(cls):
        jwt = get_jwt_identity()
        user_id = jwt["id"] if jwt else None
        args = request.args

        posts = PostModel.get_filtered_posts(
            user_id,
            args.get("offset", 0),
            args.get("limit", 10)
        )

        if posts: 
            return {
                "posts": [post.json() for post in posts]
            }, HTTPStatus.OK
        else:
            return {
            "message": "No posts found"
        }, HTTPStatus.NOT_FOUND


    @classmethod
    def post(cls):
        jwt = get_jwt_identity()
        
        if jwt["role"] != UserRole.ADMIN:
            return {
                "message": "admin role required for this action"
            }, HTTPStatus.FORBIDDEN
        author_id = jwt["id"]
        json = request.get_json()
        title = json.get("title")
        content = json.get("content")
        required_subscription = json.get("required_subscription", UserRole.USER)

        if not all([title, content]):
            return {
                "message": "missed fields which required"
            }, HTTPStatus.BAD_REQUEST

        post = PostModel(
            title, content, author_id, required_subscription
        )
        post.save()

        return {
            "message": "Post created successfully"
        }, HTTPStatus.CREATED