
import { useKeycloak } from "@react-keycloak/web"
import { Outlet } from "react-router-dom"
import Navbar from "~/components/home/Navbar"
import { PersonagemContext } from "~/context/personagem"
import TokenContext from "~/context/TokenProvider"


function HomeLayout() {

  const { keycloak } = useKeycloak()

  if (!keycloak.authenticated) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-base-100">
        <div className="bg-base-100 flex items-center gap-1">

          <p className="font-mono">Calma ai paizão</p>
          <div className="divider divider-horizontal"></div>
          <button className="btn btn-primary" onClick={() => keycloak.login()}>Login</button>
        </div>
      </section>
    )
  }
  return (
    <TokenContext value={keycloak.token}>
      <PersonagemContext.Provider value={undefined}>

        <article className="min-h-screen bg-base-200">
          <Navbar />
          <Outlet />
        </article>

      </PersonagemContext.Provider>
    </TokenContext>

  )
}



export default HomeLayout
