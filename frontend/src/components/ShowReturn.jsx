import { useContext} from "react"
import MyContext from "../context/MyContext"

export default function ShowReturn() {
  const { propostas } = useContext(MyContext);

  return (
    <div id="return">
      { propostas
        ? propostas.map((proposta) => {
          return (
            <div>
              <h3>Proposta</h3>
              <div>
                <h4>Preço por beneficiário</h4>
                <table>
                  <tr>
                    <th>Idade</th>
                    <th>Preço</th>
                  </tr>
                  { proposta.precoPorBeneficiario.map((person) => {
                    return (
                      <tr>
                      <td>{person.idade}</td>
                      <td>{person.preco}</td>
                    </tr>
                    )
                  }) }
                </table>
                <h4>Preço total: {proposta.precoTotal}</h4>
              </div>
            </div>
          )
        }) 
        : <div>Preencha todos os campos corretamente.</div> }
    </div>
  )
};
