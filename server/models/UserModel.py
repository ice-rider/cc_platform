from __future__ import annotations

from passlib.hash import pbkdf2_sha256

from .db import db, BaseModel
from .config import UserRole, SUBSCRIPTION_PERIODS, TODAY


class UserModel(BaseModel):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=False, nullable=False)
    password = db.Column(db.String(87), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.Enum(UserRole), default=UserRole.USER)
    subscription_end = db.Column(db.DateTime(timezone=True), nullable=True)

    def __init__(self, username: str, password: str, email: str) -> None:
        self.username = username
        self.password = password
        self.email = email

    @classmethod
    def auth(cls, email: str, password: str) -> UserModel | None:
        user = cls.query.filter_by(email=email).first()

        if user is None:
            return None

        if not pbkdf2_sha256.verify(password, user.password):
            return None

        return user

    def json(self) -> dict:
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role.value,
            "subscription": self.subscription.strftime("%d.%m.%Y") \
                if self.subscription_end is not None else None
        }

    def change_role(self, role: UserRole) -> None:
        self.role = role
        self.save()

    def add_subscription(self, subscription_days: int) -> tuple[bool, str]:
        if self.subscription_end is not None:
            return False, "Already subscribed"
        
        if subscription_days not in SUBSCRIPTION_PERIODS.keys():
            return False, "Invalid subscription period"
        
        delta = SUBSCRIPTION_PERIODS[subscription_days]
        self.subscription_end = TODAY() + delta
        self.save()
        return True, "Subscription added"
