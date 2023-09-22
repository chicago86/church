import "@aws-amplify/ui-react/styles.css"
import React from "react"
import s from "./app.module.scss"
// import BurgerMenu from '../../ui/burger-menu/burger-menu'

interface Props {
  children: React.ReactNode
}

const App: React.FC<Props> = props => {
  return <div className={s.page}>
    {/* <BurgerMenu/> */}
    <section className={s.content}>
      {props.children}
    </section>
  </div>
}

export default App