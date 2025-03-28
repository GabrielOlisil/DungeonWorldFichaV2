
import shield from "~/assets/shield.png"
import { FetchPersonagem, Personagem } from "~/models/personagem.model"
import { useNavigate } from "react-router-dom";
import { set, SubmitHandler } from "react-hook-form";
import { useState } from "react";



const BarraHabilidades = ({ props }: { props: Personagem | undefined }) => {
    const router = useNavigate()


    if (!props) {
        return <div>Personagem não encontrado</div>
    }

    const [personagem, setPersonagem] = useState<Personagem>(props)

    const handleChange = (e: any) => {
        const person = personagem;
        person.equipamento = e.target.value
        setPersonagem(person)
    }


    const handleBlur = async () => {




        let body = JSON.stringify(personagem);

        try {
            var response = await fetch(`http://localhost:8000/api/personagens/${personagem.personagemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            });

            let reqPersonagem: FetchPersonagem = await response.json();

            if (response.ok && reqPersonagem.data) {
                setPersonagem(reqPersonagem.data)
                return
            }

            throw new Error("Erro ao Atualizar personagem");

        } catch (e: any) {
            console.log(e.message)
        }


    }





    return (
        <div className="flex p-2 flex-col md:flex-row gap-4 justify-start items-stretch">


            <div className="card sm:w-96 w-full self-center md:self-start bg-base-100 shadow-sm p-3">
                {
                    personagem?.imageUrl
                        ? <img
                            src={personagem?.imageUrl}
                            className="h-60 object-cover object-top"
                            alt="Shoes" />
                        : <div className="skeleton h-60 oject-cover"></div>

                }


                <div className="pt-3">
                    <label className="input w-full">
                        Nível
                        <input type="text" defaultValue={personagem?.nivel} className="" />
                    </label>
                </div>

                <div className="flex flex-col-reverse  items-stretch sm:flex-row ">
                    <div className="relative w-50 flex-1 self-center">
                        <img src={shield} className="w-full" alt="" />
                        {/* Centralizar o conteúdo sobre a imagem */}
                        <div className="absolute inset-0 flex justify-center items-center text-4xl font-bold text-base-content">
                            {personagem.armadura}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center mt-2">
                        <div
                            className="hexagon w-15 h-15 bg-success relative mb-4"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center text-success-content">
                                {personagem.dadoDano}
                            </div>
                        </div>
                        <div className="relative h-10 w-full bg-error/40">

                            {
                                personagem.pv && <> <div className="absolute left-0 bottom-0 top-0 bg-error " style={{ right: `${(100 - (personagem.pv / personagem.pvTotal) * 100)}%` }}></div>
                                    <div className="absolute inset-0 flex justify-center items-center text-error-content">
                                        {personagem?.pv}/{personagem?.pvTotal}
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

                                defaultValue={personagem.habilidade.forca}
                                className="input "
                            />

                        </label>

                        <label className="input mt-3 w-full">


                            <span>INT</span>

                            <input
                                type="number"
                                placeholder={`Ex: 16`}

                                defaultValue={personagem.habilidade.inteligencia}
                                className="input "
                            />

                        </label>

                        <label className="input mt-3 w-full">


                            <span>CAR</span>

                            <input
                                type="number"
                                placeholder={`Ex: 16`}

                                defaultValue={personagem.habilidade.carisma}
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

                                defaultValue={personagem.habilidade.constituicao}
                                className="input "
                            />

                        </label>

                        <label className="input mt-3 w-full">


                            <span>SAB</span>

                            <input
                                type="number"
                                placeholder={`Ex: 16`}

                                defaultValue={personagem?.habilidade.sabedoria}
                                className="input "
                            />

                        </label>

                        <label className="input mt-3 w-full">


                            <span>DES</span>

                            <input
                                type="number"
                                placeholder={`Ex: 16`}

                                defaultValue={personagem?.habilidade.destreza}
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
                        defaultValue={personagem?.nome}
                        className="input input-ghost border-b-base-content focus-within:border-b-base-content rounded-none w-full focus-within:outline-none "
                    />
                </div>



                <div className="mt-3 mb-3">
                    <label className="label ">
                        <span className="label-text">Classe</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={personagem?.classe}
                        className="input input-ghost border-b-base-content focus-within:border-b-base-content rounded-none w-full focus-within:outline-none "
                    />
                </div>

                <label className="label ">
                    <span className="label-text">Equipamento</span>
                </label>
                <textarea onBlur={handleBlur} onChange={handleChange} className="textarea grow w-full" placeholder="Bio" defaultValue={personagem?.equipamento}></textarea>





            </div>

            <div className="grow flex flex-col basis-1/2">
                <div className="text-base-content">Descrição</div>
                <div className="flex flex-col 2xl:flex-row grow gap-2">
                    <div className="grow flex-col flex">

                        <textarea className="textarea  grow w-full" placeholder="Bio" defaultValue={personagem?.descricaoUm}></textarea>
                    </div>
                    <div className="grow flex-col flex">

                        <textarea className="textarea w-full grow" placeholder="Bio" defaultValue={personagem?.descricaoDois}></textarea>
                    </div>
                </div>
            </div>



        </div>
    )
}


export default BarraHabilidades