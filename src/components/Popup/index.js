function Popup({ size='md', show, callback, buttons, content }) {
  if (!show) return null;

  const sizeClasses = {
    sm: 'md:w-1/4 md:min-h-1/4 h-auto',
    md: 'md:w-1/2 md:min-h-1/4 h-auto',
    lg: 'md:w-3/4 md:min-h-1/4 h-auto',
  };

  const expandAnimationClass = `scaleX-0 ${show ? 'animate-[expand_0.2s_ease-in-out_forwards]' : 'scaleX-0'}`
  const showAnimationClass = 'animate-[fadeIn_0.1s_ease-in-out_0.2s_forwards] opacity-0'

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 flex flex-col gap-4">
      <div className={`${expandAnimationClass} bg-white dark:bg-neutral-800 flex flex-col items-center justify-center gap-4 shadow-lg p-8 ${sizeClasses[size]} justify-between`}>
        <div className={`${showAnimationClass} w-full`}>
          <div className="w-full">
            { content }
          </div>
          <div className="w-full flex gap-2 text-xs justify-end">
            { buttons.map((button, _i) => {
              const buttonClasses = button.type === 'confirm' ? 'bg-gray-400 dark:bg-gray-700 text-white' : 'bg-neutral-300 dark:bg-neutral-600 dark:text-white'
              return (
                <button key={_i} className={`px-4 py-2 ${buttonClasses}`} onClick={() => callback(button.type)}>
                  {button.text}
                </button>
              )
            }) }
          </div>
        </div>
      </div>
    </div>
  );
}
export default Popup;