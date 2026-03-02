import { motion, AnimatePresence } from "motion/react";
import { HeartPulse } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-light"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-brand-orange/20 blur-xl" />
            <HeartPulse className="relative h-24 w-24 text-brand-orange drop-shadow-lg" strokeWidth={1.5} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xl font-medium tracking-tight text-brand-dark"
          >
            Cuidando da sua saúde...
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
