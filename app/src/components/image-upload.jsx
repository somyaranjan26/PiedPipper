import React, { useState, useRef } from 'react'
import { QualitySelection } from './quality-selection'
import { Result } from './result';
import { XCircleIcon } from '@heroicons/react/outline'

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const serverName = 'http://127.0.0.1:8000'

const qualityValues = [
    {
      id: 1,
      desc: 'High Compression',
      value: 40,
    },
    {
      id: 2,
      desc: 'Medium Compression',
      value: 60,
    },
    {
      id: 3,
      desc: 'Low Compression',
      value: 80,
    }
  ]

function ImageUpload() {
    const toastId = useRef(null);

    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ quality, setQuality ] = useState(qualityValues[1]);
    const [ compressedImage, setCompressedImage ] = useState(null)

    const types = ['image/png', 'image/jpeg']; // ! array of accepted file types

    const handleImage = e => {
        let seleted = e.target.files[0];  // ! get the uploaded image

        if (seleted && types.includes(seleted.type)) {   // ? check weahter we have the valid Image
            setImage(seleted);
            setImageUrl(URL.createObjectURL(seleted))    // ? than only update the state Image
        } else {
            setImage(null);      // ! if image is not valid
            toast.error('Please select an image file (png or jpeg)');
        }
    }

    const uniqueId = new Date().getTime();

    const HandleSubmit = () => {
        toastId.current = toast.warning('Uploading', { 
            autoClose: false,
            pauseOnFocusLoss: false
        })
        const uploadImage = new FormData()
        uploadImage.append('unique_id', uniqueId)
        uploadImage.append('user', "2")
        uploadImage.append('quality', quality.value)
        uploadImage.append('image', image, image.name)

        var requestOptions = {
            method: 'POST',
            mode: "cors",
            cache: "no-cache",
            body: uploadImage,
            redirect: "follow",
        }

        fetch('http://127.0.0.1:8000/api/', requestOptions)
        .then((res) =>  {
            toast.update(toastId.current, {render: "Successfully uploaded!", type: toast.TYPE.SUCCESS, autoClose: 5000 })
            return res.json()
        })
        .then((data) => setCompressedImage(data.image))
        .catch(error => console.log(error))
    }

    const handleCancel = () => {
        setImage(null);
        setImageUrl(null) 
    }

    const handleClick = () => {
        document.getElementById("file-upload").click();
    }

    function FileSize(bytes, si=true, dp=1) {
        const thresh = si ? 1000 : 1024;
      
        if (Math.abs(bytes) < thresh) {
          return bytes + ' B';
        }
      
        const units = si 
          ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
          : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10**dp;
      
        do {
          bytes /= thresh;
          ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
      
      
        return bytes.toFixed(dp) + ' ' + units[u];
    }
    
    return (
        <>
        { compressedImage
            ? <Result 
                    serverName={serverName}
                    image={image} 
                    imageUrl={imageUrl} 
                    imageSize={FileSize(image.size)}
                    compressedImage={compressedImage} 
                    compressedImageSize={FileSize(compressedImage.size)}
                    quality={quality} 
                    setQuality={setQuality} 
                    qualityValues={qualityValues}
                    HandleSubmit={HandleSubmit} />
            : <div>
                <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                    <div className="relative mb-3 border-4 border-dashed border-gray-200 rounded-lg">
                        { image 
                        ? <>
                            <div className="container mx-auto text-center mt-3 px-10 sm:px-0">
                             <div className="grid grid-cols-1 py-8 mt-4 sm:px-20 md:px-40 lg:px-80 md:py-10">
                                        <div className="relative block">
                                            <div className=" group mx-auto block w-full aspect-w-10 aspect-h-7 rounded-lg shadow-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                            <img src={imageUrl} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                                            <button type="button" className="absolute inset-0 focus:outline-none">
                                                <span className="sr-only">View details for {image.name}</span>
                                            </button>
                                            </div>
                                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none"><span className="text-black font-semibold">Name:</span> {image.name}</p>
                                            <p className="block text-sm font-medium text-gray-500 pointer-events-none"><span className="text-black font-semibold">Size:</span> {FileSize(image.size)}</p>
                                        </div>
                            </div> 
                            </div> 
                            
                            <div className="absolute top-10 right-12 sm:right-16 md:right-28 lg:right-52">
                                <XCircleIcon onClick={handleCancel} className="text-gray-500 hover:text-red-600 h-7 w-7"/>
                            </div>
                          </> 
                        : <div onClick={handleClick} className=" h-96 flex justify-center items-center content-center cursor-pointer">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-36 w-36 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true" >
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </svg>

                                <div class="flex xl:flex-row lg:flex-row sm:flex-col flex-col justify-center px-10 py-2">
                                        <div class="flex justify-center mr-1">
                                            <input 
                                                id="file-upload" 
                                                name="file-upload" 
                                                type="file" 
                                                className="sr-only" 
                                                onChange={handleImage} 
                                                hidden 
                                            />
                                            <button onChange={handleClick} id="select-input-button" className="border-2 rounded-lg py-2 px-4 text-xs lg:text-sm bg-indigo-600 shadow-sm text-white font-medium hover:bg-indigo-700 hover:text-white" type="button">CHOOSE A IMAGE</button>
                                        </div>
                                </div>
                                <p className="text-xs text-left px-10 -mt-10 text-indigo-600">Select PNG or JPG up to size 20MB*</p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                {  image && 
                    <div className="bg-gray-100 -mt-3 rounded-b-lg px-5 py-3 sm:px-6  md:flex content-center justify-between">
                    <div>
                        < QualitySelection desc={'Select compression type:'} quality={quality} setQuality={setQuality} qualityValues={qualityValues}/>
                    </div>
                    <div className="mt-4 md:mt-0 flex content-center items-center">
                        <button
                            type="submit"
                            onClick={HandleSubmit}
                            className="w-full md:w-auto py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Upload
                        </button>
                    </div>
                    </div>
                }
              </div> 
        }
        </>
    )
}

export default ImageUpload