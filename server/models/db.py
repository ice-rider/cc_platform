from __future__ import annotations

from flask_sqlalchemy import SQLAlchemy
from flask.typing import AppOrBlueprintKey


db = SQLAlchemy()


def init_app(app: AppOrBlueprintKey) -> None:
    global db, db_logger

    db.init_app(app)
    with app.app_context():
        db.create_all()


class BaseModel(db.Model):  # type: ignore
    __abstract__ = True

    def __str__(self) -> str:
        return str(self.json())
    
    @classmethod
    def get_by_id(cls, id) -> BaseModel | None:
        return cls.query.get(id)

    def save(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()