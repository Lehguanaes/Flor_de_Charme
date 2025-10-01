import React from 'react';
import "./SobreNos.css";

import jovanaImg from '../../assets/dev_jovana.jpg';
import karinneImg from '../../assets/dev_karinne.jpg';
import leticiaImg from '../../assets/dev_leticia.jpg';
import mariaImg from '../../assets/dev_maria.jpg';
import fotoGrupoJuntas from '../../assets/desenvolvedoras.jpg';

export default function SobreNos() {
  const desenvolvedoras = [
    { img: jovanaImg, nome: 'Jovana Oliveira' },
    { img: karinneImg, nome: 'Karinne Angelo' },
    { img: leticiaImg, nome: 'Letícia Guanaes' },
    { img: mariaImg, nome: 'Maria Monteiro' },
  ];

  return (
    <div className="container">
      <div className="fundadores">
        <h3 className="subtitulo">Quem fundou esse projeto?</h3>

        <div className="fotoGrupo">
          <img
            src={fotoGrupoJuntas}
            alt="Foto das fundadoras juntas"
            className="fotoGrupoImg"
          />
          <p className="fotoGrupoTexto">
            Unidas pela vontade de inovar, desenvolvemos este projeto com base em nossas experiências e habilidades complementares. Cada detalhe foi pensado com carinho, dedicação e trabalho em equipe.
          </p>
        </div>

        <div className="cardContainer">
          {desenvolvedoras.map((dev, index) => (
            <div key={index} className="card">
              <img src={dev.img} alt={dev.nome} className="cardImg" />
              <h4 className="cardTitle">{dev.nome}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
