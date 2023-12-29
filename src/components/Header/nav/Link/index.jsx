import styles from './style.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slide, scale } from '../../animation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

export default function Index({ data, isActive, setSelectedIndicator }) {
	const { title, href, index, closeMenu } = data
  let linkST = useRef(null)

	const handleClick = (e) => {
		e.preventDefault()
		gsap.to(window, {
			duration: 1,
			scrollTo: linkST.current.start,
			overwrite: 'auto',
		})
    closeMenu()
	}

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

    linkST.current = ScrollTrigger.create({
      trigger: href,
      start: "top top"
    });

    ScrollTrigger.create({
      trigger: href.slice(1),
      start: "top center",
      end: "bottom center"
    });
	})

	return (
		<motion.div
			className={styles.link}
			onMouseEnter={() => {
				setSelectedIndicator(href)
			}}
			custom={index}
			variants={slide}
			initial="initial"
			animate="enter"
			exit="exit"
		>
			<motion.div
				variants={scale}
				animate={isActive ? 'open' : 'closed'}
				className={styles.indicator}
			></motion.div>
			<Link href={href} onClick={handleClick}>
				{title}
			</Link>
		</motion.div>
	)
}
