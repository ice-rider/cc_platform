import "../styles/common.css";

export default function FollowInfo ({ user_id }) {

    return (
        <div className="follow-info">
            <div className="cols">
                <div className="follow-info__status">Статус подписки: </div>
                <div className="follow-info__ost" >Осталось: </div>
                <div className="follow-info__expired">Истекает: </div>
            </div>
            <div className="cols">
                <div className="follow-info__status">100 </div>
                <div className="follow-info__ost" >200 </div>
                <div className="follow-info__expired">300</div>
            </div>
        </div>
    )
}