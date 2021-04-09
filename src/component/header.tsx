
const Header = () => {
    return (
        <div>
            <div className="relative  overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className='relative pt-6 px-4 sm:px-6 lg:px-8'>
                        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label='Global'>
                            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <a href="/">
                                        <span className='sr-only'>Main</span>
                                        <h1 className='text-bold text-2xl'>PoseDetect</h1>
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;