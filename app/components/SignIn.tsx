"use client";

import styles from "./sign.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()
  const backURL = process.env.NEXT_PUBLIC_BACK_URL

  const handleConnect = () => {
    fetch(`${backURL}users/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: userEmail, password: password} )
    }).then(response => response.json())
    .then(data =>{
      if(data){
        dispatch(login({username: data.username, token: data.token, cities: data.cities}))
        setUserEmail("")
        setPassword("")
        router.push("/")
      }
    })
  }

  return (
  <div className ={styles.card}>
    <h1>SIGN-IN</h1>
    <div className={styles.inputContainer}>
    <input className={styles.input} placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} value={userEmail}></input>
    <input className={styles.input} type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
    </div>
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={() => handleConnect()}>Connect</button>
    </div>
  </div>
  )
}