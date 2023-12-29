'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect } from 'react'
import gsap, { SteppedEase } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { slideUp } from './animation'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import Rounded from '@/common/RoundedButton'
import SOCIALS from '@/utils/socials'

export default function Home() {
	const typewriter = useRef(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)
		let animate = gsap.timeline({delay: 3,repeat: -1, repeatDelay: 1, paused: true})

    animate.fromTo('.anim_typewriter', {
      width: "0", /* same as CSS .line-1 width */
    },{
      width: "224px", /* same as CSS .line-1 width */
      repeat: -1,
      repeatDelay: 3,
      duration: 3,
      ease: SteppedEase.config(40)    })
    animate.fromTo('.anim_typewriter', {
      "border-right-color": "rgba(255,255,255,0.75)"
    }, {
      "border-right-color": "rgba(255,255,255,0)",
      repeat: -1,
      duration: 1,
      ease: SteppedEase.config(40)
    })

    animate.play()
	}, { scope: typewriter})


	return (
		<motion.main
			variants={slideUp}
			initial="initial"
			animate="enter"
			className={styles.landing}
		>
			<Image src="/images/avatar_bg_2.jpg" fill={true} alt="background" />

			<div data-scroll data-scroll-speed={0.1} className={styles.description} ref={typewriter}>
				<svg
					width="9"
					height="9"
					viewBox="0 0 9 9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
						fill="white"
					/>
				</svg>
        <p className={styles.hi}>Hi, I&apos;m</p>
        <p className={styles.name}>Tom Thanh</p>
        <p className={`anim_typewriter ${styles.anim_typewriter} ${styles.job_title}`}>Software Developer</p>

        <Rounded onClick={() => window.open(SOCIALS.GITHUB, '_blank')} className={styles.button}>
						<p>Go to GitHub</p>
					</Rounded>
			</div>
		</motion.main>
	)
}
