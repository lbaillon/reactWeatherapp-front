"use client";

import styles from "./page.module.css";
import CityCard from "./cityCard";
import { useEffect, useState } from "react";

type City = {
    cityName: string;
    description: string;
    main: string;
    tempMax: number;
    tempMin: number;
};



export default function Home() {
const backURL = process.env.NEXT_PUBLIC_BACK_URL
    const [cityTable, setCityTable] = useState<City[]>([]);

    useEffect(() => {
        fetch(`${backURL}paris`)
            .then((response) => response.json())
            .then((data:City) => {
                setCityTable([data]);
            });
    }, []);

    const cities = cityTable.map((data, i) => {
      return <CityCard key={i} cityName={ data.cityName } description={data.description} main={data.main}  max={data.tempMax} min={data.tempMin}/>
    })

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
                    ></input>
                    <button className={styles.glassbutton}>
                        {" "}
                        <img
                            className={styles.glass}
                            src="glass.png"
                            alt="glass"
                        />{" "}
                    </button>
                </div>
                <div className={styles.login}>
                    <img className={styles.user} src="user.png" alt="user" />
                </div>
            </div>
            <div className={styles.cardsContainer}>
              {cities}
            </div>
        </div>
    );
}
