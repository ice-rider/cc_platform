import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"

import "../styles/MainPage.css";


export default function NewsCards () {
    const [cards, setCards] = useState([]);
    const load_news = () => {
        axios.get("/news/list")
        .then((response) => {
            if (response.status === 200) {
                setCards(response.data.cards)
            } else {
                toast.error(response.status.toString() + response.data.message)
            }
        })
        .catch((error) => {
            console.table(error);
            toast.error("Cause some error while get news:")
            toast.error(error)
        })
    }
    const set_dummy_cards = () => setCards([
        {
            image_url: "/main_page__card-image-1.png",
            title: "Indomaret Takes Green Steps",
            description: "Indomaret Takes Green Steps highlights the environmentally conscious initiatives of the retail giant...",
            href: `/news/123`,
        },
        {
            image_url: "/main_page__card-image-2.png",
            title: "Preserving the Environment by Reducing Plastic",
            description: "his article advocates for environmental preservation through the reduction of plastic usage.",
            href: `/news/456`
        },
        {
            image_url: "/main_page__card-image-3.png",
            title: "Caring for the Environment with Compostable Plastic Bags",
            description: "Environmentally Conscious: Using Plastic Bags That Can Decompose Into Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
            href: `/news/123`
        }
    ])
    useEffect(set_dummy_cards)
    // useEffect(load_news, []);  // uncomment this on prod and remove lines upper

    return (
        <div class="news">
            <div class="title poppins-bold">Новости северного рабочего</div>
            <div class="cards-wrapper">
                {cards.map((card) => {
                    return (<Card
                        image_url = {card.image_url}
                        title = {card.title}
                        description = {card.description}
                        href = {card.href}
                    />);
                })}
            </div>
        </div>
    );
}


function Card({ image_url, title, description, href}) {
    const navigate = useNavigate();
    const redirect_to_news = () => navigate(href);
    return (
        <div class="card">
            <div class="card__media">
                <img src={image_url} alt="news view has not loaded yet"/>
            </div>
            <div class="card__data">
                <div class="card__title poppins-semibold">
                    { title }
                </div>
                <div class="card__description">
                    { description }
                </div>
            </div>
            <div class="card__btn" onClick={redirect_to_news} >
                <div class="btn btn-outlined">
                    Read more
                </div>
            </div>
        </div>
    )
}