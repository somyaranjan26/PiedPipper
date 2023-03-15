import { saveAs } from 'file-saver'
import { ImageLink } from './image-link';
import { QualitySelection } from './quality-selection'
import { DownloadIcon } from '@heroicons/react/outline'

export const Result = ({ serverName, image, imageUrl, imageSize, compressedImage, compressedImageSize, quality, setQuality, qualityValues, HandleSubmit }) => {
    
    const compressedImageUrl = serverName + compressedImage.url;

    const HandleDownload = () => {
        saveAs(compressedImageUrl, compressedImage.name)
    }

    function refreshPage() {
        window.location.reload(false);
      }

    return (
        <>
        <ul className="bg-white px-5 sm:px-14 pt-6 pb-10 grid grid-cols-1 divide-y divide-x-0 md:divide-x md:divide-y-0 divide-black md:grid-cols-2 rounded-lg">
            
            <li className="relative md:pr-14 pt-6 pb-6 md:pb-0">
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg shadow-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src={imageUrl} alt="" className=" object-cover pointer-events-none group-hover:opacity-75" />
                <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {image.name}</span>
                </button>
                </div>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none"><span className="text-black font-semibold">Name:</span> {image.name}</p>
                <p className="block text-sm font-medium text-gray-500 pointer-events-none"><span className="text-black font-semibold">Size:</span> {imageSize}</p>

                <div className="bg-gray-100 mt-3 rounded-lg px-5 pt-2.5 pb-4 sm:px-6  md:flex content-center justify-between">
                            <div>
                                < QualitySelection desc={'Change compression type:'} quality={quality} setQuality={setQuality} qualityValues={qualityValues}/>
                            </div>
                            <div className="mt-4 md:mt-0 flex content-center items-end">
                                <button
                                    type="submit"
                                    onClick={HandleSubmit}
                                    className="w-full md:w-auto py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    Submit
                                </button>
                            </div>
                </div>
            </li>

            <li className="relative md:pl-14 pt-6">
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg shadow-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src={compressedImageUrl} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {compressedImage.name}</span>
                </button>
                </div>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none"><span className="text-black font-semibold">Name: </span>{compressedImage.name}</p>
                <p className="block text-sm font-bold text-indigo-600 pointer-events-none"><span className="text-black font-semibold">Size: </span>{compressedImageSize}</p>

                <div className="bg-gray-100 mt-3 rounded-lg px-5 pt-2.5 pb-4 sm:px-6  md:flex content-center justify-between">
                    <div>
                        <ImageLink url={compressedImageUrl}/>
                    </div>
                            <div className="mt-4 md:mt-0 flex content-center items-end">
                                <button
                                    type="submit"
                                    onClick={HandleDownload}
                                    className="w-full md:w-auto flex content-center items-center gap-2 py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <DownloadIcon className="w-4 h-4"/>
                                   <span> Download</span>
                                </button>
                            </div>
                </div>
            </li>
        </ul>
        <div className="bg-gray-100 -mt-3 rounded-b-lg px-5 py-6 sm:px-14 flex content-center justify-start">
                    <div className="mt-4 md:mt-0 flex content-center items-center">
                        <button
                            type="submit"
                            onClick={refreshPage}
                            className="w-full md:w-auto py-2 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Upload new image
                        </button>
                    </div>
                    </div>
        </>
    )
  }