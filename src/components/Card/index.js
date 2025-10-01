import { TrashIcon } from '@primer/octicons-react'

function Card({ title, content, date }) {
  return (
    <div className="max-h-max mb-4 text-sm card bg-neutral-200 dark:bg-neutral-800 p-4">
      <div className="mb-4 relative">
        <div className="text-md font-bold">{title}</div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
        <button className="absolute top-0 right-0 p-1">
          <TrashIcon size={16}/>
        </button>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default Card;