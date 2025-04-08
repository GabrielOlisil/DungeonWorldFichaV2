import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "~/components/home/Navbar";
import { NotificationExplorer } from "~/components/home/Notifications";
import { DadosHubContext } from "~/context/DiceHubContext";
import { NotificacoesContext, NotificacoesType } from "~/context/NotificationContext";
import { PersonagemContext } from "~/context/personagem";
import TokenContext from "~/context/TokenProvider";
import keycloak from "~/lib/keycloak";

type RollMessage = {
  Personagem: string,
  DicePrompt: string,
  Output: string | null,
  Modalidade: string
}


function HomeLayout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Novo estado para evitar erro
  const [notificacoes, setNotificacoes] = useState<NotificacoesType[] | undefined>(undefined)




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


  const dadosHubContext = useContext(DadosHubContext)
  useEffect(() => {
    if (!dadosHubContext) return;

    const connect = async () => {
      if (dadosHubContext.state === "Connected" || dadosHubContext.state === "Connecting" || dadosHubContext.state === "Reconnecting") {
        return;
      }
      try {
        await dadosHubContext.start();

        await dadosHubContext.invoke("JoinGroupGeral");
      } catch (err) {
        console.error("Erro ao conectar ao hub:", err);
      }
    }
    connect();



    dadosHubContext.on("messageReceived", (msg) => {
      let json: RollMessage = JSON.parse(msg)

      setNotificacoes(prev => [...(prev ?? []), {
        title: `${json.Personagem} rolou ${json.Modalidade}:`,
        content: `\n${json.Output}`
      }])


    });

    return () => {
      if (dadosHubContext.state === "Connected") {
        dadosHubContext.stop();
      }
      dadosHubContext.off("messageReceived", message => console.log(message));
    };

  }, [])

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
      <NotificacoesContext.Provider value={{ notificacoes, setNotificacoes }}>

        <PersonagemContext.Provider value={undefined}>
          <article className="min-h-screen bg-base-200">
            <Navbar />
            <Outlet />
            <NotificationExplorer />
          </article>
        </PersonagemContext.Provider>
      </NotificacoesContext.Provider>
    </TokenContext>
  );
}

export default HomeLayout;