import { Link } from 'react-router-dom';
import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
}

const FeatureCard = ({ title, description, icon, path }: FeatureCardProps) => {
    return (
        <Link to={path}>
            <div className="glass-card p-6 h-full cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-[var(--color-primary)] font-semibold text-lg group-hover:text-[var(--color-primary-light)] transition-colors">
                        {title}
                    </h3>
                    <div className="text-[var(--color-text-muted)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--color-primary)] transition-all">
                        {icon}
                    </div>
                </div>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default FeatureCard;
