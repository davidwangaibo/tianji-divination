import { useEffect, useRef } from 'react';

const StarryBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create stars
        const starCount = 200;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 2 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            container.appendChild(star);
        }

        // Create shooting stars periodically
        const createShootingStar = () => {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.left = `${Math.random() * 70}%`;
            shootingStar.style.top = `${Math.random() * 50}%`;
            shootingStar.style.animation = `shootingStar ${Math.random() * 1 + 0.5}s linear forwards`;
            container.appendChild(shootingStar);

            setTimeout(() => {
                shootingStar.remove();
            }, 2000);
        };

        const interval = setInterval(createShootingStar, 4000);
        createShootingStar();

        return () => {
            clearInterval(interval);
            container.innerHTML = '';
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{
                background: 'linear-gradient(to bottom, #0a1628 0%, #0d1e3a 50%, #0a1628 100%)',
                zIndex: -1,
            }}
        >
            {/* Nebula effect */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(ellipse at 20% 50%, rgba(100, 130, 200, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(150, 100, 180, 0.1) 0%, transparent 40%)',
                }}
            />
        </div>
    );
};

export default StarryBackground;
