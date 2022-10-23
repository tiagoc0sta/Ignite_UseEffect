import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState<string[]>([])
  const [filter, setFilter] = useState('')

  function avisarAPI() {
    console.log('Lista salva');
  }

  /// Example to useEffect fetching API ///
  useEffect(()=> { // useEffect sempre executa quando componente é exibido em tela e quando muda as dependencias monitoradas
     avisarAPI();
  }, [list]) // arreay de dependencia [list] nesse caso

  useEffect(()=> {
    fetch('https://api.github.com/users/tiagoc0sta/repos')
    .then(response => response.json())
    .then(data => {
      setList(data.map((item:any) => item.full_name))
    })
  }, []) // array de dependencia vazio. Por isso o useffect so vai executar na primeira renderização.

  const filteredList = list.filter(item => item.includes(filter))

  function addToList() {
    setList(state => [...state, 'New item'])
  }

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={addToList}>Add to list</button>


      <h3>Filter the list of repositories </h3>
      <input 
        type="text" 
        onChange={e=>setFilter(e.target.value)}
        value={filter}
      />

      <ul>
        {list.map(item => <li>{item}</li>)}
      </ul>

      <ul>
        {filteredList.map(item => <li>{item}</li>)}
      </ul>      
    </div>
  )
}

export default App


//useEffect -> Side effect = efeito colateral