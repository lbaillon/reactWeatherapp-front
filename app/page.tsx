"use client";

import styles from "./page.module.css";
import CityCard from "./components/cityCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";



type City = {
    cityName: string;
    description: string;
    main: string;
    tempMax: number;
    tempMin: number;
};

type UserCity = City & {
    userCityName: string
}

type Error = {
    reason: string
}

type User = {
    username: string,
    token: string,
    cities: string[]
}

export default function Home() {
    const backURL = process.env.NEXT_PUBLIC_BACK_URL;
    const [cityTable, setCityTable] = useState<UserCity[]>([]);
    const [city, setCity] = useState<string>("");
    const dispatch = useDispatch()
	const user: User = useSelector((state: {user: {value: User}}) => state.user.value);

    console.log(cityTable)

    useEffect(() => {
        if(user.token){
            for (let city of user.cities){
                fetch(`${backURL}${city}`)
                .then((response) => response.json())
                .then((data: City|Error) => {
                    if("reason" in data){
                        return
                    }
                    setCityTable((prevCities) => [...prevCities, {...data, userCityName: city}]);
                });
            }
        }else{
            fetch(`${backURL}paris`)
            .then((response) => response.json())
            .then((data: City) => {
                setCityTable([{...data, userCityName: "paris"}]);
            }); 
        }
    }, [user.token]);



    const handleSearch = () => {
        if (!user.token) {
            fetch(`${backURL}${city}`)
                .then((response) => response.json())
                .then((data: City|Error) => {
                    console.log(data)
                    if("reason" in data){
                        return
                    }
                    setCityTable([{...data, userCityName: city}]);
                });
        }else{
            fetch(`${backURL}${city}`)
            .then((response) => response.json())
            .then((data: City|Error) => {
                if("reason" in data){
                    return
                }
                setCityTable((prevCities) => [...prevCities, {...data, userCityName: city}]);
            });
            fetch(`${backURL}users/cities/${city}`, {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token})
            }).then(response => response.json())
            .then(data => {
                if("reason" in data){
                    console.log(data)
                }
            })
        }
        setCity("");
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };



    const cities = cityTable.map((data, i) => {
        return (
            <CityCard
                key={`city_${i}`}
                userCityName= {data.userCityName}
                cityName={data.cityName}
                description={data.description}
                main={data.main}
                max={data.tempMax}
                min={data.tempMin}
            />
        );
    });

    const handleLogout = () => {
		dispatch(logout());
	};

    let userSection
    if (user.token) {
        userSection = (
            <div className={styles.logoutSection}>
                <p className= {styles.welcome} >Welcome {user.username} !</p>
                <button className={styles.logoutButton} onClick={() => handleLogout()} >Logout</button>
            </div>
        )
    }else{
        userSection = (
            <Link href="/login">
            <img
                className={styles.user}
                src="user.png"
                alt="user"
            />
        </Link> 
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src="logo.svg" alt="logo" />
                </div>
                <div className={styles.searchInput}>
                    <input
                        className={styles.input}
                        placeholder="Search a city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                    ></input>
                    <button
                        className={styles.glassbutton}
                        onClick={() => handleSearch()}
                    >
                        <img
                            className={styles.glass}
                            src="glass.png"
                            alt="glass"
                        />
                    </button>
                </div>
                <div className={styles.login}>
                    {userSection}
                </div>
            </div>
            <div className={styles.cardsContainer}>{cities}</div>
        </div>
    );
}
