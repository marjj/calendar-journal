function Card({ title, content }) {
  return (
    <div className="max-h-max mb-4 text-sm card bg-neutral-200 dark:bg-neutral-800 p-4 rounded-2xl">
      <div className="mb-4 text-md font-bold">{title}</div>
      <p>{content} xx</p>
    </div>
  );
}

export default Card;