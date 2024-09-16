import "../styles/SignIn.css";

export default function SignIn() {
    console.log("sign-in") 
    return (
        <div className="rounded-field">
            <div class="description">
                <h2>Авторизация</h2>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                    />
                </div>
                <div>
                <button className="form-group button" type="submit">Войти</button>
                </div>
            </form>
        </div>
    )
};