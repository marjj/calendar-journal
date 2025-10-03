const data = localStorage.getItem('journal-data') ? JSON.parse(localStorage.getItem('journal-data')) : [];

const updateData = (date, title, content, time) => {
  if (data.find(d => d.date === date)) {
    const _idx = data.findIndex(d => d.date === date)

    if (_idx === -1) return
    data[_idx].items = [...data[_idx]?.items, { content, time }]

    return
  }
  data.push({ date, title, items: [{ content, time }] });
}

const deleteNote = (date) => {
  const _idx = data.findIndex(d => d.date === date)

  console.log(_idx, 'delete note')
  if (_idx === -1) return
  data.splice(_idx, 1)

  console.log(data, 'after delete note')
}

export default { data, updateData, deleteNote };