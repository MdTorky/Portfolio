import React from 'react'
import { motion } from "framer-motion"

const Stairs = () => {

    const stairAnimation = {
        hidden: {
            top: "0%",
        },
        animate: {
            top: "100%",
        },
        exit: {
            top: ["100%", "0%"],
        }
    }

    const reverseIndex = (index) => {
        const totalSteps = 8;
        return totalSteps - index - 1
    }

    return (
        <>
            {[...Array(8)].map((_, index) => {
                return (
                    <motion.div
                        key={index}
                        variants={stairAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            duration: 0.5,
                            easing: "easeInOut",
                            delay: 1.5 + (reverseIndex(index) * 0.1)
                        }}
                        className='h-full w-32 dark:bg-gray-800 bg-gray-200 relative z-99'
                    >
                    </motion.div>
                )
            })}
        </>
    )
}

export default Stairs
