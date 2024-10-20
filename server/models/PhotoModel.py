from io import BytesIO

from .db import db, BaseModel


class PhotoModel(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    binary = db.Column(db.LargeBinary, nullable=True)

    def to_image(self) -> BytesIO:
        return BytesIO(self.binary)
