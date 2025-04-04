import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "~/components/home/Navbar";
import { PersonagemContext } from "~/context/personagem";
import TokenContext from "~/context/TokenProvider";
import keycloak from "~/lib/keycloak";

function HomeLayout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Novo estado para evitar erro

  useEffect(() => {
    if (keycloak.didInitialize) return;

    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false, flow: "implicit" }) // Evita recarregamento excessivo
      .then((auth) => {
        setAuthenticated(auth);
        setLoading(false); // Marcamos que terminou a inicialização
      })
      .catch((err) => {
        console.error("Erro ao inicializar o Keycloak:", err);
        setLoading(false);
      });

    // 🔄 Atualiza o estado quando o token for renovado
    keycloak.onAuthSuccess = () => {
      setAuthenticated(true);
    };
    keycloak.onAuthLogout = () => {
      setAuthenticated(false);
    };
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!authenticated) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-base-100">
        <div className="bg-base-100 flex items-center gap-1">
          <p className="font-mono">Calma ai paizão</p>
          <div className="divider divider-horizontal"></div>
          <button className="btn btn-primary" onClick={() => keycloak.login()}>
            Login
          </button>
        </div>
      </section>
    );
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
  );
}

export default HomeLayout;