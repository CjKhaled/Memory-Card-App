

function Card({ link, name, handleClick}) {
    return (
        <div className="card" id={name} onClick={handleClick}>
            <img  src={link} alt="An Image" />
            <h3>{name}</h3>
        </div>
        
    )
}

export default Card;