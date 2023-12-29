'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);
    const linkST = useRef(null);

    useEffect( () => {
      if(isActive) setIsActive(false)
    }, [pathname])

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.registerPlugin(ScrollToPlugin)
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
                onEnterBack: () => {gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"},setIsActive(false))}
            }
        })

        const navItems = gsap.utils.toArray(".nav_item")
        navItems.forEach((link) => {
          console.log("link", link);
          let element = link.getAttribute("href"),
            linkST = ScrollTrigger.create({
              trigger: element,
              start: "top top"
            });
          console.log(`element`, element);

          ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center"
          });

          link.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
              duration: 1,
              scrollTo: linkST.start,
              overwrite: "auto"
            });
          });
        });
    }, [])

    return (
        <>
        <div ref={header} className={styles.header}>
            <div className={styles.logo}>
                <p className={styles.copyright}>©</p>
                <div className={styles.name}>
                    <p className={styles.codeBy}>Code by</p>
                    <p className={styles.firstName}>Tom</p>
                    <p className={styles.lastName}>Thanh</p>
                </div>
            </div>
            <div className={styles.nav}>
                <Magnetic>
                    <div className={styles.el}>
                        <a href="#work" className="nav_item">Work</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <a href="#about" className="nav_item">About</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <a href="#contact" className="nav_item">Contact</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
            </div>
        </div>
        <div ref={button} className={styles.headerButtonContainer}>
            <Rounded onClick={() => {setIsActive(!isActive)}} className={`${styles.button}`}>
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
            </Rounded>
        </div>
        <AnimatePresence mode="wait">
            {isActive && <Nav closeMenu={() =>setIsActive(false)}/>}
        </AnimatePresence>
        </>
    )
}
