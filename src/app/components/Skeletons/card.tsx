import './styles.css'

const CardSkeleton = () => {
    return (
        <div>
            <div className="card is-loading">
                <div className="image"></div>
                <div className="content">
                    <h2></h2>
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default CardSkeleton;