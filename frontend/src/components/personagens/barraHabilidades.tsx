import { PersonagemContext } from "@/app/personagens/[id]/detalhar/page"
import { useContext } from "react"


export default function BarraHabilidades() {

    let context = useContext(PersonagemContext);

    return (
        <div className="flex p-2 flex-col-reverse md:flex-row gap-10">


            <div className="card sm:w-96 w-full bg-base-100 shadow-sm p-3">
                <img
                    src={context?.imageUrl}
                    className="h-60 object-cover object-top"
                    alt="Shoes" />

                <div className="pt-3">
                    <label className="input w-full">
                        Nível
                        <input type="text" defaultValue={context?.nivel} className="" />
                    </label>
                </div>

                <div className="flex flex-col-reverse  items-stretch sm:flex-row sm:p-10">
                    <div className="relative w-50 flex-1 self-center">
                        <img src="http://localhost:3000/shield.png" className="w-full" alt="" />
                        {/* Centralizar o conteúdo sobre a imagem */}
                        <div className="absolute inset-0 flex justify-center items-center text-4xl font-bold">
                            2
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div
                            className="hexagon w-15 h-15 bg-success relative mb-4"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center ">
                                {context?.dadoDano}
                            </div>
                        </div>
                        <div className="relative h-10 w-full bg-error/40">
                            <div className="absolute left-0 bottom-0 top-0 bg-error " style={{ right: `${(100 - (context!.pv / context!.pvTotal) * 100)}%` }}></div>
                            <div className="absolute inset-0 flex justify-center items-center">
                                {context?.pv}/{context?.pvTotal}
                            </div>
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

                                defaultValue={context?.habilidade.forca}
                                className="input "
                            />

                        </label>

                        <label className="input mt-3 w-full">


                            <span>INT</span>

                            <input
                                type="number"
                                placeholder={`Ex: 16`}

                                defaultValue={context?.habilidade.inteligencia}
                                className="input "
                            />

                        </label>

                        <label className="input mt-3 w-full">


                            <span>CAR</span>

                            <input
                                type="number"
                                placeholder={`Ex: 16`}

                                defaultValue={context?.habilidade.carisma}
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

                                defaultValue={context?.habilidade.constituicao}
                                className="input "
                            />

                        </label>

                        <label className="input mt-3 w-full">


                            <span>SAB</span>

                            <input
                                type="number"
                                placeholder={`Ex: 16`}

                                defaultValue={context?.habilidade.sabedoria}
                                className="input "
                            />

                        </label>

                        <label className="input mt-3 w-full">


                            <span>DES</span>

                            <input
                                type="number"
                                placeholder={`Ex: 16`}

                                defaultValue={context?.habilidade.destreza}
                                className="input "
                            />

                        </label>

                    </div>

                </div>



            </div>

            <div>
                <div>
                    <label className="label">
                        <span className="label-text">Nome</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={context?.nome}
                        className="input input-bordered w-full"
                    />
                </div>



                <div>
                    <label className="label mt-3">
                        <span className="label-text">Classe</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={context?.classe}
                        className="input input-bordered w-full"
                    />
                </div>


               
            </div>

        </div>
    )
}