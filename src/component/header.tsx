
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
                                        <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Logo" className="h-8 w-auto sm:h-10" />
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