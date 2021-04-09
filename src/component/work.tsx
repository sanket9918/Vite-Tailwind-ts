import Header from './header'
import Face from './recognition/face'
import Pose from './recognition/pose.jsx'
const Work = () => {

    return (
        <div>
            <Header />
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 lg:mt-20 lg:px-8 xl:mt-28 ">
                <div className="text-center">
                    <p className="text-2xl">The area will contain the cam output</p>
                </div>
                <div className='flex justify-start items-center rounded-xl mt-4 px-6 py-4 text-center mx-auto bg-green-300 text-green-800 max-w-7xl sm:w-1/2 w-full'>
                    <span className='text-center mx-auto'>
                        The output is based on the availability of resources</span></div>
                <div className='flex justify-center items-center text-center mx-auto mt-4 mb-6'><Pose /> </div>
            </div>
        </div>
    )
}
export default Work;