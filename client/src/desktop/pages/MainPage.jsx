import NewsCards from "../components/NewsPage";
import "../styles/MainPage.css";
import { Button } from "@mui/material";


export default function MainPage() {
    console.log("main page")
    return (
        <>
            <div class="main-page">
                <div class="float-image">
                    <img src="main-page-image-1.jfif" alt="new's post view" />
                </div>
                <div class="text-block">
                    <div class="h1 primary-color poppins-bold">
                        Добро пожаловать на сайт Северодвинского издательского центра!
                    </div>
                    
                    <div class="plain">
                        Мы рады приветствовать вас на официальной странице нашего издательского центра, расположенного в сердце города Северодвинска. Наш центр занимается изданием книг, журналов и других печатных материалов, стремясь донести до читателей качественные и интересные издания, которые помогут расширить кругозор, углубить знания и насладиться художественным словом.<br/><br/>

                        Наша миссия — развитие культуры чтения и поддержка местных авторов, исследователей, краеведов и творческих личностей. Мы помогаем создавать уникальные издания, посвященные истории и традициям нашего региона, научным открытиям и художественным произведениям, которые найдут отклик в сердцах читателей.
                        Чем мы занимаемся:<br /><br />
                        <ul>
                            <li>Издание книг и журналов: от литературных произведений до учебной и научной литературы.</li>
                            <li>Печать на заказ: качественная печать тиражей любых объемов.</li>
                            <li>Поддержка авторов: помощь в подготовке рукописей к печати, редактирование и создание оригинального дизайна обложек.</li>
                            <li>Творческие проекты и мероприятия: встречи с писателями, презентации новых книг и литературные вечера.</li>
                        </ul>
                        <Button variant="contained" color="primary" sx={{width: "125px"}}>Подробнее</Button>
                    </div>
                </div>
                <NewsCards />
            </div>
        </>
    )
}

