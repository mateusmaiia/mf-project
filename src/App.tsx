import { useState, FormEvent } from 'react'
import './App.css'
import logoImg from './assets/logo.png'

export function App(){

  const [ gasolinaInput, setGasolinaInput] = useState(0)
  const [ alcoolInput, setAlcoolInput] = useState(0)
  const [ info, setInfo ] = useState<infoProps>()

  interface infoProps{
    title?: string;
    gasolina?: string | number;
    alcool?: string | number;
  }

  function calcular(event: FormEvent){
    event.preventDefault()
    
    const calculo = (alcoolInput / gasolinaInput)

    if(calculo <= 0.7){
      setInfo({
        title: 'Compensa usar Álcool',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }else{
      setInfo({
        title: 'Compensa usar Gasolina',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }
  }

  function formatarMoeda(valor: number){
    const valorFormatado = valor.toLocaleString("pt-br",
    {
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado;
  }

  return(
    <>
     <main className='container'>
      <img 
        className='logo'
        src={logoImg} 
        alt="Logo da calculadora de gasolina ou alcool" 
      />

      <h1 className='title'>Qual melhor opção</h1>

      <form className='form' onSubmit={calcular}>
        <label htmlFor="">
          Álcool (preço por litro)
        </label>
        <input 
          className='input'
          type="number" 
          placeholder='4,90'
          min={1}
          step={0.1}
          required
          value={alcoolInput} /*O que digitar neste input vai ser passado para essa useState*/ 
          onChange={ (e) => setAlcoolInput(Number(e.target.value))}
        />

        <label htmlFor="">
          Gasolina (preço por litro)
        </label>
        <input 
          className='input'
          type="number" 
          placeholder='4,90'
          min={1}
          step={0.1}
          required
          value={gasolinaInput}
          onChange={(e) => setGasolinaInput(Number(e.target.value))}
        />

        <input 
          className='button'
          type="submit" 
          value='calcular'
        />
      </form>

      {info && Object.keys(info).length > 0 && (
        <section className='result'>
          <h2 className='result-title'>{info.title}</h2>

          <span>Álcool {info.alcool}</span>
          <span>Gasolina {info.gasolina}</span>
        </section>
      )}
     </main>
    </>
  )
}