
import { Outlet } from "react-router-dom"
import Navbar from "~/components/home/Navbar"
import { PersonagemContext } from "~/context/personagem"



function HomeLayout() {

  return (

    <PersonagemContext.Provider value={undefined}>

      <article className="min-h-screen bg-base-200">
        <Navbar />
        <Outlet />
      </article>
    </PersonagemContext.Provider>

  )
}

export default HomeLayout
