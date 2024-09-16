from __future__ import annotations

from sqlalchemy import or_

from .db import db, BaseModel
from .config import UserSubscription, UserRole, TODAY
from .UserModel import UserModel


class PostModel(BaseModel):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=False, nullable=False)
    content = db.Column(db.String(500), unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    required_subscription = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    def __init__(self, 
        title: str, 
        content: str,
        author_id: int, 
        required_subscription: bool
    ) -> None:
        self.title = title
        self.content = content
        self.author_id = author_id
        self.required_subscription = required_subscription

    def json(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "author_id": self.user_id,
            "required_subscription": self.required_subscription,
            "created_at": self.created_at
        }
    
    @classmethod
    def get_filtered_posts(
        cls, 
        user_id: int,
        offset: int = 0, 
        limit: int = 10
    ) -> list[PostModel] | None:
        user = UserModel.get_by_id(user_id) if user_id else None

        if (user_id is None or user.subscription_end is not None or user.subscription_end < TODAY()) \
                     and user.role == UserRole.USER):
            posts = cls.query   \
                .filter_by(cls.required_subscription == False) \
                .offset(offset) \
                .limit(limit)   \
                .all()
        else:
            posts = cls.query   \
                .offset(offset) \
                .limit(limit)   \
                .all()

        return posts