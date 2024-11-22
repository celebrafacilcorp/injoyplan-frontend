import styles from './icon.module.css';

interface IProps {
    fill?: string
    width?: string
    height?: string
    className?: string
    viewBox?: string
    xmlns?: string
    onClick?: any
    xmlnsXlink?: string
    children?: React.ReactNode
    icon: any
}

const Svg = ({ children, icon, ...props }: IProps | any) => {

    let convertingStringHTML = function (str : string) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body.innerHTML;
    }

    return (
        <div className={styles.icon} dangerouslySetInnerHTML={{
            __html: convertingStringHTML(icon)
        }}{...props}>

        </div>
    )
}

export default Svg;