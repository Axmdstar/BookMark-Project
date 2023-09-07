import { DotWave, ChaoticOrbit, DotPulse } from '@uiball/loaders'

export const LoadingIcon = () => {
    return(
      <div className='pt-2.5 pb-2 flex justify-center'>
        <DotWave size={35} speed={1} color="white" />
      </div>
    )
  }

export const LoadingOrbit = () => {
  return(
    <div className='pt-2.5 pb-2 flex justify-center'>
      <ChaoticOrbit size={45} speed={1} color="#f78d1b" />
    </div>
  )
}

export const LoadingPulse = () => {
  return(
    <div>
      <DotPulse size={35} speed={1} color="#f78d1b" />
    </div>
  )
}
