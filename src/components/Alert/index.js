import { XIcon } from '@primer/octicons-react'

function Alert({ message, type, show, callback }) {
  if (!show) return null;

  return <div className="absolute top-10 left-0 h-full bg-white dark:bg-neutral-900 bg-opacity-70 dark:bg-opacity-70 w-full z-10 flex items-center justify-center">
    <div className="relative bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-white">
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
}

export default Alert;