import heroBackground from '../../assets/hero.jpg';

const Banner = () => {
    return (
        <div className="hero mb-5 md:mb-10" style={{ backgroundImage: `url(${heroBackground})` }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="relative my-20 flex w-full flex-col items-center sm:mt-24">
                    <h1 className="mt-8 max-w-sm text-white text-center text-4xl font-extrabold sm:max-w-4xl sm:text-5xl">
                        Shape Opinions, Gather Insights
                    </h1>
                    <span className="mt-8 max-w-2xl text-center text-xl leading-relaxed text-white">
                        Discover the latest features and enhancements for your SaaS product. Stay ahead in the market with these improvements.
                    </span>
                    <p className="mt-3 rounded border px-3 py-1 shadow">
                        🎁 <span className="text-customPurple4 font-semibold">$50 off</span> for the first 1,000 users!
                    </p>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:gap-0 sm:gap-x-4">
                        <a className="font-semibold hover:bg-gray-500 flex flex-row items-center justify-center gap-x-2 rounded-lg border-2 px-10 py-3">
                            Explore All Survey →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;