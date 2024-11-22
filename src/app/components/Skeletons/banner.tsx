import './styles.css'

const BannerSkeleton = () => {
    return (
        <div>
            <div className="card__banner is-loading">
                <div className="image-banner"></div>
            </div>
        </div>
    )
}

export default BannerSkeleton;