import React from 'react'
import Container from './Container'

export default function Work() {
    const work = [
        {
            "imageUrl" : "https://www.princetonreview.com/cms-content/CanYouUseCalculatoronGMAT.jpg",
            "url": "https://calculator.honeypatkar.repl.co/",
            "name": "Caculator",
            "description" : "It's a simple calulator app made by using Html, css and Javascript"
        },
        {
            "imageUrl" : "https://getshogun.com/wp-content/uploads/2022/07/62c33d607931231884dd4c02_10-Best-Product-Landing-Page-Examples-That-Really-Drive-Sales.jpeg",
            "url": "https://productlandingpage.honeypatkar.repl.co/",
            "name": "Product Landing Page",
            "description": "This a practice project made by using Html, css and Javascript"
        },
        {
            "imageUrl" : "https://149842033.v2.pressablecdn.com/wp-content/uploads/2020/11/Capitalshop.jpg",
            "url": "https://practice-project.honeypatkar.repl.co/",
            "name": "Shopping Site",
            "description": "This a practice project made by using Html, css and Javascript"
        },
        {
            "imageUrl" : "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5wmEECloDc1OMWAMEamsQ8/edb1da18b9ce2e661d227312c7d61805/GettyImages-1203940958.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000&h=",
            "url": "https://resume.honeypatkar.repl.co/",
            "name": "Resume",
            "description": "This is My Personal Resume"
        },
        {
            "imageUrl" : "https://repository-images.githubusercontent.com/178449283/7ba8fd80-6512-11e9-8a8f-83993a74fc99",
            "url": "https://technicaldocumentation.honeypatkar.repl.co/",
            "name": "Technical Documantation",
            "description": "This a practice project made by using Html, css and Javascript"
        },
        {
            "imageUrl" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAFVpH5kUkmB3FcVcAVpCrYQXw_aqDA-6Dn2bJaWnMHH-E4UXwkJ8_Xf7xeFbrZlzEDCI&usqp=CAU",
            "url": "https://tictactoe.honeypatkar.repl.co/",
            "name": "Tic Tac Toe",
            "description": "It's a very intersting Tic Tac Toe game i made it using React Js"
        },
        {
            "imageUrl": "https://img.freepik.com/premium-vector/editable-change-font-typography-template-text-effect-style-lettering-vector-illustration-logo_463676-1886.jpg",
            "url": "https://textchange.honeypatkar.repl.co/",
            "name": "TextChange",
            "description": "It's a website where you can do insteresting thing with text i made it using React Js during my practice "
        }

    ]
  return (
    <>
    <div className='container my-3'>
        <div className='row box-container'>{work.map((element) => {
            return <div className="col-md-6" key={element.url}><Container name={element.name} imageUrl= {element.imageUrl} url={element.url} description={element.description}/></div>
        })}</div>
    </div>
    </>

  )
}
