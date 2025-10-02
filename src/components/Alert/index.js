import { XIcon } from '@primer/octicons-react'

function Alert({ message, type, show, callback }) {
  if (!show) return null;

  return <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-60 flex flex-col gap-4" onClick={() => callback('close')}>
    <div className={`relative bg-white text-neutral-700 dark:bg-neutral-800 dark:text-white transition-all scaleX-0 ${show ? 'animate-[expand_0.2s_ease-in-out_forwards]' : 'scaleX-0'}`}>
      <div className="animate-[fadeIn_0.1s_ease-in-out_0.2s_forwards] opacity-0">
        <button className="float-right pr-2 pt-2" onClick={() => callback('close')}>
          <XIcon size={10}/>
        </button>

        <p className="px-6 py-4 text-center">{message}</p>

        { type === 'confirmation' &&
          <div className="flex justify-end gap-4 px-6 pb-4 text-xs">
            <button className="px-4 py-2 bg-neutral-300 dark:bg-neutral-600 dark:text-white" onClick={() => callback('cancel')}>Cancel</button>
            <button className="px-4 py-2 bg-gray-400 dark:bg-gray-700 text-white" onClick={() => callback('confirm')}>Confirm</button>
          </div>
        }
      </div>
    </div>
  </div>
}

export default Alert;