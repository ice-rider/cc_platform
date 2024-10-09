import os

from yookassa import Payment


SERVER_URL = os.getenv('SERVER_URL')
if not SERVER_URL:
    raise Exception('env SERVER_URL is not set')

YOOKASSA_SHOP_ID = 'shop id'
YOOKASSA_API_KEY = 'api key'

Payment.config({
    "account_id": YOOKASSA_SHOP_ID,
    "secret_key": YOOKASSA_API_KEY
})

TARIFFS = {
    '1_month': 299,
    '3_month': 799,
    '6_month': 1499 
}
