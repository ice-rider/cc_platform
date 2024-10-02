import "../styles/Subscription.css";

export default function Subscription() {
    console.log("subscription")
    return (
        <div className="rounded-field">
            <div class="description">
                <h2>Подписка</h2>
                <p>Это описание подписки.</p>
            </div>
            <img src="../../../cat.jpg" alt="Изображение продукта" class="product-image"></img>
            <button class="purchase-button">Приобрести</button>
            
        </div>
    )
}