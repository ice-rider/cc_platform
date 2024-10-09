from yookassa.domain.request import PaymentRequest
from .pay_config import TARIFFS, SERVER_URL, Payment


def make_payment_url(tarif: str, pay_id: int):
    amount = TARIFFS[tarif]
    
    payment = PaymentRequest({
        "amount": {
            "value": str(amount),
            "currency": "RUB"
        },
        "capture": True,  # Автоматическое подтверждение
        "confirmation": {
            "type": "redirect",
            "return_url": SERVER_URL + f'/pay/{pay_id}/success'
        },
        "description": f"Оплата подписки за {tarif} {tarif}"
    })

    response = Payment.create(payment)
    confirmation_url = response.confirmation.confirmation_url

    return confirmation_url