import React from 'react';
import logo from './logo.svg';
import filmes from './filmes.json';
import './App.css';
import { useEffect, useState } from 'react';

type Filmes = {
  id: number;
  nome: string;
  genero: string;
  imagem: string;
};

function App() {
  const [busca, setBusca] = useState('');
  const buscaLower = busca.toLowerCase().trim();

  const filmesFiltrados = filmes.filter((filme) =>
    filme.nome.toLowerCase().includes(buscaLower) ||
    filme.genero.toLowerCase().includes(buscaLower) ||
    filme.id.toString().includes(buscaLower)
  );

  const filmesExibidos = buscaLower
    ? [...filmesFiltrados].sort((a, b) => {
        const posA = a.nome.toLowerCase().indexOf(buscaLower);
        const posB = b.nome.toLowerCase().indexOf(buscaLower);
        if (posA === -1) return 1;
        if (posB === -1) return -1;
        return posA - posB;
      })
    : filmesFiltrados; 

  return (
     <div className="App">
      <h1>Filmes</h1>

      <input 
        type="text"
        placeholder="Buscar por nome, gênero ou ID"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Gênero</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {filmesExibidos.map((filme) => (
            <tr key={filme.id}>
              <td>
                <img src={filme.imagem} alt={filme.nome} width="80" />
              </td>
              <td>{filme.nome}</td>
              <td>{filme.genero}</td>
              <td>{filme.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
