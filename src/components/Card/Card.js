import React from "react";

import './Card.scss'

function Card(props) {
    const {card} = props
    return (
        <div className="card-item">
            {card.cover &&<img draggable="false" src={card.cover} alt="heheh"></img>}
            {card.title}
        </div>
    )
}

export default Card