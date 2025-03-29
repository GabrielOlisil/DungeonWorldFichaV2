
import { Outlet } from "react-router-dom"
import Navbar from "~/components/home/Navbar"

function HomeLayout() {

  return (

    <article className="min-h-screen bg-base-200">
      <Navbar />
      <Outlet />
    </article>

  )
}

export default HomeLayout
