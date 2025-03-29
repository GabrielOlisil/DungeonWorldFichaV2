
import shield from "~/assets/shield.png"
import { FetchPersonagem, Personagem } from "~/models/personagem.model"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";




const BarraHabilidades = ({ props }: { props: Personagem | undefined }) => {
    const [personagemLocal, setPersonagemLocal] = useState<Personagem | undefined>(props);
    const { register, watch, reset } = useForm<Personagem>();




    useEffect(() => {
        if (props) {
            setPersonagemLocal(props)
            reset(props);
        }
    }, [props, reset]);

    const handleBlur = async (field: keyof Personagem, nestedField?: keyof Personagem["habilidade"]) => {
        const currentValue = nestedField
            ? watch(`habilidade.${nestedField}`)
            : watch(field);

        const initialValue = nestedField
            ? personagemLocal?.habilidade?.[nestedField]
            : personagemLocal?.[field];

        if (currentValue === initialValue) return; // Evita requisições desnecessárias

        try {
            const body = {
                ...personagemLocal,
                [field]: nestedField
                    ? { ...personagemLocal?.habilidade, [nestedField]: currentValue }
                    : currentValue,
            };

            setPersonagemLocal(body as Personagem);


            const response = await fetch(`http://localhost:8000/api/personagens/${props?.personagemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const reqPersonagem: FetchPersonagem = await response.json();

            if (!response.ok || !reqPersonagem.data) {
                throw new Error("Erro ao atualizar personagem");
            }
            reset(reqPersonagem.data);

        } catch (e: unknown) {

            if (e instanceof Error) {
                console.error(e.message);
            } else {
                console.error("Erro desconhecido");
            }
        }
    };

    if (!props) {
        return <div>Personagem não encontrado</div>;
    }

    return (
        <div className="flex p-2 flex-col md:flex-row gap-4 justify-start items-stretch">


            <div className="card sm:w-96 w-full self-center md:self-start bg-base-100 shadow-sm p-3">



                {
                    props?.imageUrl
                        ? <img

                            src={personagemLocal?.imageUrl}
                            className="h-60 object-cover object-top"
                            alt="Shoes" />
                        : <div className="skeleton h-60 oject-cover"></div>
                }

                <button className="btn mt-2 btn-primary" onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}>Alterar Imagem</button>
                <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Alterando imagem</h3>
                        <input className="input w-full mt-5" type="text" {...register("imageUrl")} onBlur={() => handleBlur("imageUrl")} placeholder="Uma imagem bonita" />
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
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
                        <div className="absolute inset-0 flex justify-center items-center text-4xl font-bold text-base-content">
                            <input type="text" className="input input-ghost w-7 text-center p-0 focus-within:outline-none"
                                {...register("armadura")} onBlur={() => handleBlur("armadura")}

                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center mt-2">
                        <div
                            className="mask mask-hexagon w-15 h-15 bg-success relative mb-4"

                        >
                            <div className="absolute inset-0 flex items-center justify-center text-success-content cursor-pointer">
                                {props.dadoDano}
                            </div>
                        </div>
                        <div className="relative h-10 w-full bg-error/40 rounded">

                            {personagemLocal?.pv &&
                                <>
                                    <div className="absolute left-0 bottom-0 top-0 bg-error rounded  "
                                        style=
                                        {
                                            { right: `${Math.max((100 - (personagemLocal.pv / personagemLocal.pvTotal) * 100), 0)}%`, transition: "right 0.5s ease" }
                                        }></div>


                                    <div className="absolute inset-0 flex justify-center items-center text-error-content">

                                        <input type="text" className="input input-ghost w-7 text-center p-0 focus-within:outline-none focus-within:bg-transparent overflow-hidden"
                                            {...register("pv")} onBlur={() => handleBlur("pv")}

                                        />

                                        /

                                        <input type="text" className="input input-ghost w-7 text-center p-0 focus-within:outline-none focus-within:bg-transparent"
                                            {...register("pvTotal")} onBlur={() => handleBlur("pvTotal")}

                                        />

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
    )
}


export default BarraHabilidades