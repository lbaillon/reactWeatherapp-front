"use client";

import styles from "./sign.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";


export default function SignUp() {
  const backURL = process.env.NEXT_PUBLIC_BACK_URL
  const router = useRouter()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleRegister = () => {
    fetch(`${backURL}users/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: userName, email: userEmail, password: password} )
    }).then(response => response.json())
    .then(data =>{
      if(data){
        console.log(data)
        dispatch(login({username: data.username, token: data.token, cities: data.cities}))
        setUserName("")
        setUserEmail("")
        setPassword("")
        router.push("/")
      }
    })
  }

  return (
  <div className ={styles.card}>
    <h1>SIGN-UP</h1>
    <div className={styles.inputContainer}>
      <input className={styles.input} placeholder="Name" onChange={(e) => setUserName(e.target.value)} value={userName}></input>
      <input className={styles.input} placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} value={userEmail}></input>
      <input className={styles.input} type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
    </div>
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={() => handleRegister()}>Register</button>
    </div>
  </div>
  )
}