
import { Outlet } from "react-router-dom"
import Navbar from "~/components/home/Navbar"

function HomeLayout() {

  return (
    <>
      <Navbar />
      <article className="mb-20 min-h-screen">

        <Outlet />
      </article>
    </>
  )
}

export default HomeLayout
