import {Button} from "@mui/material";

export default function Card({durationText, price, image_url}) {
    return (
        <section className="subscription_card__wrapper">
            <div className="subscription_card">
                <img className="subscription_card__image" src={image_url} alt="subscription" />
            </div>
            <div className="subscription_card__footer">
                <span className="subscription_card__duration">Подписка {durationText}</span>
                <span className="subscription_card__price">{price}</span>
                <Button variant="contained" className="subscription_card__button">Подробнее</Button>
            </div>
        </section>
    )
}