import "../styles/MobileMainPage.css"

export default function MainPage() {
    console.log("main page")
    return (
        <div className="Text-container">
            <h2>Северодвинский издательский центр.</h2>
            <h5>Мы рады приветствовать вас<br></br> на официальной странице нашего<br></br> издательского центра,<br></br> расположенного в сердце города<br></br> Северодвинска.</h5>
            <button><a href="/sign-in">Подробнее</a></button>
        </div>
    )
}

/* 

position: absolute;
width: 597px;
height: 398px;
left: 613px;
top: 104px;

background: url(6410768.jpg);*/
