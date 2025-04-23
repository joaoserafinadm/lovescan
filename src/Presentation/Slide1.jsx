import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Music } from 'lucide-react';
import styles from './Presentation.module.css';

export default function Slide1(props) {
    const { loveName, couplePhoto, onComplete } = props;
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {
        // Set a timeout to trigger the exit animation after 15 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            
            // Give time for the exit animation to complete before notifying parent
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 1000); // Animation duration
        }, 15000);
        
        return () => clearTimeout(timer);
    }, [onComplete]);
    
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className={` ${styles.slideBackground}`}
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 1, ease: "easeInOut" }
                    }}
                >
                    <div className="row mt-5">
                        <div className="col-12 fadeItem px-5" style={{ fontFamily: "'Indie Flower', cursive" }}>
                            <h1 style={{ fontSize: '3rem' }} className='fadeItem'>Para meu amor,</h1>
                            <h1 style={{ fontSize: '3.5rem' }} className='fadeItem'>{loveName} ❤️</h1>
                        </div>
                        <div className="col-12 text-end">
                            <motion.div
                                className="rounded"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                            >
                                <img src={couplePhoto} alt="" className={`${styles.couplePhoto} rounded me-2 border border-2 shadow`} />
                            </motion.div>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-rose-500 opacity-70"
                                initial={{
                                    x: Math.random() * 100,
                                    y: Math.random() * 100 + 100
                                }}
                                animate={{
                                    y: [
                                        Math.random() * 100 + 100,
                                        Math.random() * -100 + 500
                                    ],
                                    x: [
                                        Math.random() * 100,
                                        Math.random() * 100 + 100
                                    ],
                                    opacity: [0.7, 0.2, 0.7]
                                }}
                                transition={{
                                    duration: 10 + Math.random() * 20,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                <Heart size={20 + Math.floor(Math.random() * 24)} fill="currentColor" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}