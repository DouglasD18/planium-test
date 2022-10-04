import React, { useContext, useState, useEffect } from "react"
import MyContext from '../context/MyContext';
import Helpers from "../services/api";

export default function Input() {
  const { setPropostas } = useContext(MyContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [quantidade, setQuantidade] = useState(0);
  const [idade, setIdade] = useState([]); 
  const [nome, setNome] = useState([]);
  const [registro, setRegistro] = useState(0);

  function createArray() {
    const array = Array.from({ length: quantidade }, (_v) => '');

    return array;
  }

  function onClick() {
    const array = createArray();
    setIdade(array);
    setNome(array);
  }

  function onChangeQuantidade({ target }) {
    const { value } = target;

    setQuantidade(Number(value));
  }

  function onChangeRegistro({ target }) {
    const { value } = target;

    setRegistro(value);
  }

  function onChangeIdade(e, index) {
    e.preventDefault();
    const { target } = e;

    const array = idade;
    array[index] = Number(target.value);

    setIdade(array);
    console.log(idade[index]);
  }

  function onChangeNome(e, index) {
    e.preventDefault();
    const { target } = e;

    const array = nome;
    array[index] = target.value;

    setNome(array);
  }

  async function createProposta() {
    const strRegistro = `reg${registro}`;
    const proposta = await Helpers.postBeneficiarios({ quantidade, idade, nome, registro: strRegistro });

    setPropostas(proposta);
  }

  useEffect(() => {
    const findName = nome.find((name) => name === '');
    const findAge = idade.find((age) => age === '' || age === 0)
    if (quantidade !== 0 && registro !== 0 && nome.length === quantidade && idade.length === quantidade && !findAge && !findName) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [quantidade, registro, nome, idade]);

  return (
    <div id="form">
      <form>
        <label>
          Quantidade:
          <input type="number" name="quantidade" value={ quantidade } onChange={ (e) => onChangeQuantidade(e) } />
          <input type="button" id="btn" value="Setar quantidade" onClick={ onClick }/>
        </label>
        { idade.map((_age, index) => {
          return (
            <div>
              <label>
                idade:
                <input type="number" name="idade" key={`idade${index}`} value={ idade[index] } onChange={ (e) => onChangeIdade(e, index) } />
              </label>
              <label>
                nome:
                <input type="text" name="nome" key={`nome${index}`} value={ nome[index] } onChange={ (e) => onChangeNome(e, index) } />
              </label>
            </div>
          )
        }) }
        <label>
          registro:
          <input type="number" name="registro" value={registro} onChange={ (e) => onChangeRegistro(e) }/>
        </label>
      </form>
      <button type="button" disabled={ isDisabled } onClick={ createProposta }>Gerar proposta</button>
    </div>
  )
}