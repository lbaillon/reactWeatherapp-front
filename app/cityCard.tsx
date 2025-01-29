import styles from "./cityCard.module.css";

type CityProps = {
    cityName:string, 
    description:string, 
    main:string, 
    max:number, 
    min:number
}

export default function CityCard({ cityName, description, main, max, min }: CityProps)  {
const weatherLogo:string = `${main}.png`
    return (
        <div className ={styles.card}>
            <p className={styles.name}>{cityName}</p>
				<p className={styles.description}>{description}</p>
				<img className={styles.weatherIcon} src={weatherLogo}/>
				<div className={styles.temperature}>
					<p className={styles.tempMin}>{min}°C</p>
					<span> - </span>
					<p className={styles.tempMax}>{max}°C</p>
				</div>
        </div>
    )
}