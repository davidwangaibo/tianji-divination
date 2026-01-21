import { Link } from 'react-router-dom';

const Header = () => {
    const navItems = [
        { name: '易经', path: '/coin' },
        { name: '八字', path: '/bazi' },
        { name: '塔罗', path: '/tarot' },
        { name: '灵签', path: '/guanyin' },
        { name: '印度占星', path: '/vedic' },
    ];

    return (
        <header className="relative z-10 pt-10 pb-8">
            <div className="text-center">
                <Link to="/">
                    <h1 className="golden-title text-6xl md:text-7xl tracking-wider mb-6 cursor-pointer hover:scale-105 transition-transform">
                        天机占卜
                    </h1>
                </Link>
                <nav className="flex justify-center items-center gap-6 flex-wrap">
                    {navItems.map((item, index) => (
                        <span key={item.name} className="flex items-center gap-6">
                            <Link to={item.path} className="nav-link hover:text-[var(--color-primary)]">
                                {item.name}
                            </Link>
                            {index < navItems.length - 1 && (
                                <span className="text-[var(--color-text-muted)]">•</span>
                            )}
                        </span>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
