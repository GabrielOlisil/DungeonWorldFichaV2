
import shield from "~/assets/shield.png"
import { FetchPersonagem, Habilidade, Personagem } from "~/models/personagem.model"
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import PlayDice from "./PlayDice";
import { PersonagemContext } from "~/context/personagem";
import { PersonagemHubContext } from "~/context/personagemHub"
import TokenContext from "~/context/TokenProvider";



const BarraHabilidades = ({ props }: { props: Personagem | undefined }) => {
    const [personagemLocal, setPersonagemLocal] = useState<Personagem | undefined>(props);

    const initialPersonagemRef = useRef<Personagem | undefined>(props);




    const token = useContext(TokenContext)



    const { register, watch, reset } = useForm<Personagem>();

    const sendUpdatedPerson = async (person: Personagem) => {
        try {
            const body = JSON.stringify(person)

            const response = await fetch(`http://localhost:8000/api/personagens/${person?.personagemId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,

                    "Content-Type": "application/json",
                },
                body
            });

            const reqPersonagem: FetchPersonagem = await response.json();

            if (!response.ok || !reqPersonagem.data) {
                throw new Error("Erro ao atualizar personagem");
            }

        } catch (e: unknown) {

            if (e! instanceof Error) {
                console.error(e.message);
                return;
            }

            console.error("Erro desconhecido");

        }
    }


    const hubConn = useContext(PersonagemHubContext);
    useEffect(() => {

        if (!hubConn) return;

        const connect = async () => {
            if (hubConn.state === "Connected" || hubConn.state === "Connecting" || hubConn.state === "Reconnecting") {
                return;
            }
            try {
                await hubConn.start();

                await hubConn.invoke("JoinGroup", `${personagemLocal?.personagemId}`);
            } catch (err) {
                console.error("Erro ao conectar ao hub:", err);
            }
        };

        connect();

        const messageHandler = (message: Personagem) => {
            initialPersonagemRef.current = message
            setPersonagemLocal(message)
        };

        hubConn.on("messageReceived", messageHandler);

        return () => {
            if (hubConn.state === "Connected") {
                hubConn.stop();
            }
            hubConn.off("messageReceived", messageHandler);
        };

    }, [props?.personagemId])


    useEffect(() => {



        if (!personagemLocal) return;

        if (JSON.stringify(initialPersonagemRef.current) !== JSON.stringify(personagemLocal)) {

            sendUpdatedPerson(personagemLocal);
            initialPersonagemRef.current = personagemLocal
        }


        reset(personagemLocal)
    }, [personagemLocal, reset])


    const updatePersonagem = (prev: Personagem | undefined, field: keyof Personagem | keyof Habilidade, newValue: string | number) => {
        let newPerson = {} as Personagem

        if (!prev) {
            return undefined;
        }


        if ("habilidade" in prev && field in prev.habilidade!) {
            newPerson = {
                ...prev,
                habilidade: {
                    ...prev.habilidade,
                    [field]: newValue
                }
            }
        } else {


            newPerson = {
                ...prev,
                [field]: newValue
            };
        }


        return (newPerson)
    }

    const handleBlur = async (field: keyof Personagem, nestedField?: keyof Personagem["habilidade"]) => {


        let currentValue: string | number;

        if (nestedField) {
            currentValue = watch(`habilidade.${nestedField}`)
            setPersonagemLocal(prev => updatePersonagem(prev, nestedField, currentValue))
        } else {
            currentValue = watch(field) as string | number
            setPersonagemLocal(prev => updatePersonagem(prev, field, currentValue))
        }


    };


    return (
        <>
            <div className="flex p-2 flex-col md:flex-row gap-4 justify-start items-stretch">


                <div className="card sm:w-96 w-full self-center md:self-start bg-base-100 shadow-sm p-3">



                    {
                        personagemLocal?.imageUrl
                            ? <img

                                src={personagemLocal.imageUrl}
                                className="h-60 object-cover object-top"
                                alt="Shoes" />
                            : <div className="skeleton h-60 oject-cover"></div>
                    }

                    <button className="btn mt-2 btn-primary" onClick={() => (document.getElementById('modal-person-img') as HTMLDialogElement).showModal()}>Alterar Imagem</button>
                    <dialog id="modal-person-img" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Alterando imagem</h3>
                            <input className="input w-full mt-5" type="text" {...register("imageUrl")} onBlur={() => handleBlur("imageUrl")} placeholder="Uma imagem bonita" />
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>


                    <div className="pt-3">
                        <label className="input w-full">
                            Nível
                            <input {...register("nivel")} onBlur={() => handleBlur("nivel")} type="text" className="" />
                        </label>
                    </div>

                    <div className="flex flex-col-reverse  items-stretch sm:flex-row ">
                        <div className="relative w-50 flex-1 self-center">
                            <img src={shield} className="w-full" alt="" />
                            {/* Centralizar o conteúdo sobre a imagem */}
                            <div className="absolute inset-0 flex justify-center items-center  font-bold text-base-content">
                                <input type="text" className="input input-ghost w-7 text-center text-2xl p-0 focus-within:outline-none"
                                    {...register("armadura")} onBlur={() => handleBlur("armadura")}

                                />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center mt-2">
                            <div
                                className="mask mask-hexagon w-15 h-15 bg-success relative mb-4"

                            >
                                <div className="absolute inset-0 flex items-center justify-center text-success-content cursor-pointer">
                                    {personagemLocal?.dadoDano}
                                </div>
                            </div>
                            <div className="relative h-10 w-full bg-error/40 rounded">

                                {personagemLocal?.pv &&
                                    <>
                                        <div className="absolute left-0 bottom-0 top-0 bg-error rounded  "
                                            style=
                                            {
                                                { right: `${Math.max((100 - (personagemLocal.pv / personagemLocal.pvTotal) * 100), 0)}%`, transition: "right 0.5s ease" }
                                            }>

                                        </div>


                                        <div className="absolute inset-0 flex justify-between px-1 items-center text-error-content">

                                            <div className="hover:bg-white/40 rounded px-2 cursor-pointer text-error-content"
                                                onClick={() => setPersonagemLocal(prev => ({ ...prev, pv: prev!.pv! - 1 } as Personagem))}

                                            >
                                                &lt;
                                            </div>
                                            <input type="text" className="input input-ghost w-7 text-center p-0 focus-within:outline-none focus-within:bg-transparent overflow-hidden"
                                                {...register("pv")} onBlur={() => handleBlur("pv")}

                                            />

                                            /

                                            <input type="text" className="input input-ghost w-7 text-center p-0 focus-within:outline-none focus-within:bg-transparent"
                                                {...register("pvTotal")} onBlur={() => handleBlur("pvTotal")}

                                            />

                                            <div className="hover:bg-white/40 rounded px-2 cursor-pointer text-error-content"
                                                onClick={() => setPersonagemLocal(prev => ({ ...prev, pv: prev!.pv! + 1 } as Personagem))}
                                            >
                                                &gt;
                                            </div>

                                        </div></>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="divider">Habilidades</div>

                    <div className="flex flex-col sm:flex-row gap-2 ">

                        <div>

                            <label className="input mt-3 w-full">


                                <span>FOR</span>

                                <input
                                    type="number"
                                    placeholder={`Ex: 16`}

                                    {...register("habilidade.forca")} onBlur={() => handleBlur("habilidade", "forca")}
                                    className="input "
                                />

                            </label>

                            <label className="input mt-3 w-full">


                                <span>INT</span>

                                <input
                                    type="number"
                                    placeholder={`Ex: 16`}
                                    {...register("habilidade.inteligencia")} onBlur={() => handleBlur("habilidade", "inteligencia")}
                                    className="input "
                                />

                            </label>

                            <label className="input mt-3 w-full">


                                <span>CAR</span>

                                <input
                                    type="number"
                                    placeholder={`Ex: 16`}
                                    {...register("habilidade.carisma")} onBlur={() => handleBlur("habilidade", "carisma")}
                                    className="input "
                                />

                            </label>
                        </div>

                        <div>
                            <label className="input mt-3 w-full">


                                <span>CON</span>

                                <input
                                    type="number"
                                    placeholder={`Ex: 16`}
                                    {...register("habilidade.constituicao")} onBlur={() => handleBlur("habilidade", "constituicao")}
                                    className="input "
                                />

                            </label>

                            <label className="input mt-3 w-full">


                                <span>SAB</span>

                                <input
                                    type="number"
                                    placeholder={`Ex: 16`}
                                    {...register("habilidade.sabedoria")} onBlur={() => handleBlur("habilidade", "sabedoria")}
                                    className="input "
                                />

                            </label>

                            <label className="input mt-3 w-full">


                                <span>DES</span>

                                <input
                                    type="number"
                                    placeholder={`Ex: 16`}
                                    {...register("habilidade.destreza")} onBlur={() => handleBlur("habilidade", "destreza")}
                                    className="input "
                                />

                            </label>

                        </div>

                    </div>



                </div>

                <div className="flex flex-col shrink-0">
                    <div>
                        <label className="label">
                            <span className="label-text">Nome</span>
                        </label>
                        <input
                            type="text"
                            {...register("nome")} onBlur={() => handleBlur("nome")}
                            className="input  w-full  "
                        />
                    </div>



                    <div className="mt-3 mb-3">
                        <label className="label ">
                            <span className="label-text">Classe</span>
                        </label>
                        <input
                            type="text"
                            {...register("classe")} onBlur={() => handleBlur("classe")}
                            className="input w-full "
                        />
                    </div>

                    <label className="label ">
                        <span className="label-text">Equipamento</span>
                    </label>
                    <textarea {...register("equipamento")} onBlur={() => handleBlur("equipamento")} className="textarea grow w-full" placeholder="Equipamento" ></textarea>





                </div>

                <div className="grow flex flex-col basis-1/2">
                    <div className="text-base-content">Descrição</div>
                    <div className="flex flex-col 2xl:flex-row grow gap-2">
                        <div className="grow flex-col flex">

                            <textarea className="textarea  grow w-full" placeholder="Bio"   {...register("descricaoUm")} onBlur={() => handleBlur("descricaoUm")}></textarea>
                        </div>
                        <div className="grow flex-col flex">

                            <textarea className="textarea w-full grow" placeholder="Bio"   {...register("descricaoDois")} onBlur={() => handleBlur("descricaoDois")}
                            ></textarea>
                        </div>
                    </div>
                </div>




            </div>

            <div className="divider">Rolar Dados</div>

            <PersonagemContext.Provider value={personagemLocal}>
                <PlayDice />

            </PersonagemContext.Provider>

        </>
    )
}


export default BarraHabilidades