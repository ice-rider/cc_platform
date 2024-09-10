from enum import Enum
from datetime import timedelta, datetime


class UserRole(Enum):
    USER  = "USER"
    ADMIN = "ADMIN"


SUBSCRIPTION_PERIODS = {
    30:  timedelta(weeks=30),
    90: timedelta(days=90),
    180: timedelta(days=180)
}

TODAY = datetime.now
