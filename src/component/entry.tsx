import Router, { Route } from 'preact-router';
import Header from './header';
import Work from './work';

const Entry = () => {
    return (
        <div>
            <Header />
            <div class="relative overflow-hidden">
                <div class="max-w-7xl mx-auto">
                    <div class="relative z-10 pb-8  sm:pb-16 md:pb-20  lg:w-full lg:pb-28 xl:pb-32">




                        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div class="text-center">
                                <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span class="block xl:inline">Now make detecting people<br /></span>
                                    <span class="block text-green-800 xl:inline">Easy</span>
                                </h1>
                                <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                                    An app to check the presence of a person infront of the WebCam.
          </p>
                                <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
                                    <div class="rounded-md shadow">
                                        <a href="/work" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-900 md:py-4 md:text-lg md:px-10">
                                            Get started
              </a>
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Entry