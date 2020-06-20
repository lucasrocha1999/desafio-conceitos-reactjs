
import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRespositories(...repositories, response.data));
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Desafio ReactJS",
      "url": "http://github.com/lucasrocha1999",
      "techs": [
        "Node.js",
        "Next.js",
        ""
      ]
    })

    setRespositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    const newRepository = repositories.filter(repository => repository.id !== id)

    setRespositories(newRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(response => (
          <li key={response.id}>
          {response.title}

          <button onClick={() => handleRemoveRepository(response.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;