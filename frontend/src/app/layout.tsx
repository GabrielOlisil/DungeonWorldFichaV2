'use client'

import { themeChange } from 'theme-change'

import "./globals.css";
import {useEffect} from "react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])
  return (
      <html lang="pt-BR" data-theme="retro">
      <body>
      <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
              <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                  </div>
                  <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                      <li><Link href="/">Homepage</Link></li>
                      <li><Link href="/personagens">Personagens</Link></li>
                      <li><a>About</a></li>
                  </ul>
              </div>
          </div>
          <div className="navbar-center">
              <Link href="/" className="btn btn-ghost text-xl">Dungeon World Ficha</Link>
          </div>
          <div className="navbar-end">
              <select data-choose-theme className="select select-ghost w-fit">
                  <option value="retro">retro</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="dim">Dimm</option>
                  <option value="night">Night</option>
                  <option value="cupcake">Cupcake</option>
                  <option value="nord">Cupcake</option>
                  <option value="pastel">Pastel</option>
                  <option value="dracula">Nord</option>
                  <option value="autumn">Autumn</option>
                  <option value="caramellatte">Caramellatte</option>
              </select>
          </div>
      </div>

      <article className="mb-20">

        {children}
      </article>

      <footer className="footer fixed bottom-0 sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
          <aside>
              <p>Copyright © {new Date().getFullYear()} - Todos os direitos reservados</p>
          </aside>
      </footer>
      </body>


    </html>
  );
}
