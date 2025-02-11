import styles from "./cityCard.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

type CityProps = {
    userCityName: string,
    cityName:string, 
    description:string, 
    main:string, 
    max:number, 
    min:number
}

type User = {
    username: string,
    token: string,
    cities: string[]
}

export default function CityCard({ userCityName, cityName, description, main, max, min }: CityProps)  {
    const backURL = process.env.NEXT_PUBLIC_BACK_URL;
	const user: User = useSelector((state: {user: {value: User}}) => state.user.value);
    const [isDeleted, setIsDeleted] = useState(false)
    const [cardDisplay, setCardDisplay] = useState({'display': 'flex'})

    const logoList= ['Clouds', 'Clear', 'Rain']
    let weatherLogo:string = `${main}.png`
    if (!logoList.includes(main)){
        weatherLogo = "Clouds.png"
    }

    const deleteCity = () => {
        console.log('userCityName', userCityName)
        fetch(`${backURL}users/cities/${userCityName}`, {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token})
        }).then(response => response.json())
        .then(data => {
            if("reason" in data){
                console.log(data)
            }
        })
        setIsDeleted(true)
    }

    useEffect(()=> {
        if (isDeleted) {
            setCardDisplay({'display': 'none'})
        }else {
            setCardDisplay({'display': 'flex'})
        }
    }, [isDeleted])


    let card

    if (user.token){
        card = <div className ={styles.card} style={cardDisplay} >
        <div className={styles.delete}>
            <FontAwesomeIcon icon={faXmark} className={styles.xmark} onClick={()=>deleteCity()} />
        </div>
        <p className={styles.name}>{cityName}</p>
            <p className={styles.description}>{description}</p>
            <img className={styles.weatherIcon} src={weatherLogo}/>
            <div className={styles.temperature}>
                <p className={styles.tempMin}>{min}°C</p>
                <span> - </span>
                <p className={styles.tempMax}>{max}°C</p>
            </div>
    </div>
    } else {
        card = <div className ={styles.card} style={cardDisplay}>
        <p className={styles.name}>{cityName}</p>
            <p className={styles.description}>{description}</p>
            <img className={styles.weatherIcon} src={weatherLogo}/>
            <div className={styles.temperature}>
                <p className={styles.tempMin}>{min}°C</p>
                <span> - </span>
                <p className={styles.tempMax}>{max}°C</p>
            </div>
    </div> 
    }



    return (
        <>
        {card}
        </>
    )
}