import "../styles/MobileSubscription.css";
import "../styles/MobileMainPage.css"

export default function Subscription() {
    console.log("subscription")
    return (
        <div className="Text-container">
            <div>
                <h2>
                    Подписка на издания
                    Северодвинского издательского центра.
                </h2>
                <h5>
                    Мы предлагаем вам удобные варианты подписки на наши издания, чтобы вы всегда 
                    оставались в курсе новинок и получали качественные материалы прямо к себе домой или в офис. 
                    Выберите подходящий для себя тариф и наслаждайтесь регулярными выпусками наших книг, журналов и сборников!
                </h5>
            </div>
            <div className="rounded-field">
                <div class="description">
                    <h2>Подписка</h2>
                    <p>На 1 месяц</p>
                    <p>300 рублей</p>
                    <button><a href="/">Купить</a></button>
                </div>
            </div>
            <div className="rounded-field">
                <div class="description">
                    <h2>Подписка</h2>
                    <p>На 6 месяц</p>
                    <p>1000 рублей</p>
                    <button><a href="/">Купить</a></button>
                </div>
            </div>
            <div className="rounded-field">
                <div class="description">
                    <h2>Подписка</h2>
                    <p>На 1 год</p>
                    <p>2000 рублей</p>
                    <button><a href="/">Купить</a></button>
                </div>
            </div>
        </div>
        
    )
}