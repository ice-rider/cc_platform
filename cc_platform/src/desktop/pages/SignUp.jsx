import "../styles/SignUp.css";

export default function SignUp() {
    console.log("sign-up") 
    return (
        <div className="rounded-field">
            <div class="description">
                <h2>Вход</h2>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Почта:</label>
                    <input
                        type="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Повторите пароль:</label>
                    <input
                        type="password"
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
};