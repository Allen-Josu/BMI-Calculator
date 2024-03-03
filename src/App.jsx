/* eslint-disable no-extra-boolean-cast */
import { Box, Button, Paper, TextField } from '@mui/material'
import './App.css'
import img from "./assets/bmi.jpeg"
import { useState } from 'react'

function App() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [isHeight, setIsHeight] = useState(true)
  const [isWeight, setIsWeight] = useState(true)
  const [isMaxHeight, setIsMaxHeight] = useState(true)
  const [isMaxWeight, setIsMaxWeight] = useState(true)
  const [bmivalue, setBmiValue] = useState("")
  const [isbmi, setIsBmi] = useState(false)

  const Validate = (e) => {
    const { name, value } = e.target
    if (!!value.match(/^[0-9]+(\.[0-9]+)?$/)) {
      if (name === "height") {
        setHeight(value)
        setIsHeight(true)
        if (value <= 2.73 && value > 0) {
          setIsMaxHeight(true)
        }
        else {
          setIsMaxHeight(false)
        }
      }
      else {
        setWeight(value)
        setIsWeight(true)
        if (value <= 650) {
          setIsMaxWeight(true)
        }
        else {
          setIsMaxWeight(false)
        }
      }
    }
    else {
      if (name === "height") {
        setHeight(value)
        setIsHeight(false)
        setIsMaxHeight(true)
        if (value === "") {
          setIsHeight(true)
        }
      }
      else {
        setWeight(value)
        setIsWeight(false)
        setIsMaxWeight(true)
        if (value === "") {
          setIsWeight(true)
        }
      }
    }
  }

  const Reset = () => {
    setHeight("")
    setIsHeight(true)
    setIsMaxHeight(true)
    setWeight("")
    setIsMaxWeight(true)
    setIsWeight(true)
    setIsBmi(false)
  }

  const Submit = (e) => {
    e.preventDefault()
    const BMI = (weight / Math.pow(height, 2)).toFixed(2)
    if (BMI < 18.5) {
      setBmiValue("Underweight");
    }
    else if (18.5 <= BMI && BMI < 25) {
      setBmiValue("Normal");
    }
    else if (25 <= BMI && BMI < 30) {
      setBmiValue("OverWeight");
    }
    else if (30 <= BMI && BMI < 35) {
      setBmiValue("Obese Class I");
    }
    else if (35 <= BMI && BMI < 40) {
      setBmiValue("Obese Class II");
    }
    else {
      setBmiValue("Obese Class III");
    }
    setIsBmi(true)
  }

  return (
    <>
      <div className="container-fluid  " style={{ backgroundColor: '#212529', height: "100vh" }}>
        <div className="row ">
          <div className="col-md-3"></div>
          <div className="col-md-6   ">
            <Box component={Paper} elevation={5} className='d-flex justify-content-center rounded-4 px-2 box-height'>
              <img src={img} className='image' height="400px" width="50%" alt="" />
              <div className='d-flex flex-column form'>
                <h1 className='text-center'>Calculate your BMI</h1>
                <form onSubmit={Submit} className='d-flex flex-column gap-2 mt-4'>
                  <TextField id="outlined-basic" required name="height" value={height || ""} onChange={Validate} label="Height in m" variant="outlined" />
                  {
                    !isHeight && <p className='text-danger'>Only numbers should be used</p>
                  }
                  {
                    !isMaxHeight && <p className="text-warning">The height of the tallest man  &quot; Robert Wadlow &quot; is 2.72m</p>
                  }
                  <TextField id="outlined-basic" required name="weight" value={weight || ""} onChange={Validate} label="Weight in kg" variant="outlined" />
                  {
                    !isWeight && <p className='text-danger'>Only numbers should be used</p>
                  }
                  {
                    !isMaxWeight && <p className='text-warning'>Largest ever documented weight is 650 kg by Jon Brower Minnoch</p>
                  }
                  <div className="d-flex justify-content-center gap-2 w-100">
                    <Button type='submit' disabled={isHeight && isMaxHeight && isWeight && isMaxWeight ? false : true} variant="contained" className='py-2 fs-6 mt-3 w-50'>Calculate</Button>
                    <Button onClick={Reset} variant="outlined" className='py-2 fs-6 mt-3 w-50'>Reset</Button>
                  </div>
                </form>
              </div>
            </Box>
          </div>
          <div className="col-md-3"></div>
        </div>
        {isbmi &&
          <div className="row mt-5">
            <div className="col-md-4"></div>
            <div className="col-md-4 ">
              <Box component={Paper} className='result rounded-5 d-flex justify-content-center align-items-center p-3' >
                <p className='fs-3 text-center'>You are <span>{bmivalue}</span></p>
              </Box>
            </div>
            <div className="col-md-4 "></div>
          </div>}
      </div>
    </>
  )
}

export default App
