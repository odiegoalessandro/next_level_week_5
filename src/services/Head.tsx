import NextHead from 'next/head'

export function Head({ children }:any){
  return(
    <NextHead>{children}</NextHead>
  )
}