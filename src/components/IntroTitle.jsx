import React from 'react'

const IntroTitle = ({isNight}) => {

  const textColor = isNight ? 'text-white' : 'text-slate-800'
  return (
    <>
        <h1 className={"mb-6 text-3xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center " + textColor}>React Weather App</h1>
    </>
  )
}

export default IntroTitle