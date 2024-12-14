export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
}

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10,
            duration: 0.5,
        },
    },
}

export const imageVariants = {
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
}

export const overlayVariants = {
    hidden: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
}

export const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    hover: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
        },
    },
}