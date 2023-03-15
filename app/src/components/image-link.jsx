import { DocumentDuplicateIcon } from '@heroicons/react/outline'  
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export const ImageLink = ({url}) => {

    const handleCopy = async e => {
          await navigator.clipboard.writeText(url);
          toast.success('Link Copied', {autoClose:2000})
      };

    return (
        <>
        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
            Copy image link:
        </label>
        <div className="mt-1 flex">
            <div
                className="hover:text-gray-800 text-gray-500 relative w-full cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-8 py-2 text-left sm:text-sm"
            >
                <span onClick={handleCopy} className="block w-56 select-all truncate text-sm">{url}</span>
                <span onClick={handleCopy} className="ml-3 z-10 absolute inset-y-0 right-0 flex items-center pr-2">
                <DocumentDuplicateIcon 
                    className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
        </div>
        </>
    )
}