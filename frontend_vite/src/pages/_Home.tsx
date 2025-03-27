
import { Outlet } from "react-router-dom"

function HomeLayout() {

  return (
    <>
      <div>
        layout Aplicado
        <Outlet />
      </div>
    </>
  )
}

export default HomeLayout
