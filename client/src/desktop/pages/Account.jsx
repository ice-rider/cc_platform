import { Data } from "../../App";
import { useContext } from "react";
import "../styles/Account.css";

export default function Account() {
    return (
        <div className="account-page__grid">
            <div className="account-page__lc box">
                hz chto tut ya tozhe ne pridumal
            </div>
            <div className="account-page__info box">
                <SubscriptionInfo />
            </div>
            <div className="account-page__buy box">
                <h1>Buy</h1>
            </div>
        </div>
    )
}

function SubscriptionInfo () {
    const { user } = useContext(Data);
    const sub_status = "active";
    const sub_remained = "3 days";
    const sub_expired = "after tomorrow";
    return (
        <table className="subscription-info">
            <thead>
                <tr>
                    <th colSpan={2}> Информация о подписке </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> </td> 
                    <td> </td>
                </tr>
                <tr>
                    <td>Статус подписки: </td>
                    <td>{sub_status}</td>
                </tr>
                <tr>
                    <td>Осталось: </td>
                    <td>{ sub_remained }</td>
                </tr>
                <tr>
                    <td>Истекает: </td>
                    <td>{ sub_expired }</td>
                </tr>
            </tbody>
        </table>
    )
}