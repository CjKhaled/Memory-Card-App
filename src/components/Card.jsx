

function Card({ link, name }) {
    return (
        <div className="card">
            <img  src={link} alt="An Image" />
            <h2>{name}</h2>
        </div>
        
    )
}

export default Card;