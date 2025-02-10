import Link from "next/link";
import styles from "./login.module.css";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function Login() {
    return (
        <div className={styles.loginpage}>
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                  <Link href="/">
                    <img className={styles.logo} src="logo.svg" alt="logo" />
                  </Link>
                </div>
            </div>
            <div className={styles.cardsContainer}>
              <SignUp/>
              <SignIn/>
            </div>
        </div>
    );
}
