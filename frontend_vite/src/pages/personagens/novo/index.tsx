import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Notificacao, { notificacoes } from "~/components/home/personagens/notificacao";
import { FetchPersonagem, Personagem } from "~/models/personagem.model";

export default function NovoPersonagem() {

    const [notificacoes] = React.useState<notificacoes[]>([]);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Personagem>()

    const router = useNavigate();

    const onSubmit: SubmitHandler<Personagem> = async (data) => {

        const personagem: Personagem = { ...data };


        personagem.pv = personagem.pvTotal;
        personagem.descricaoDois = ""
        personagem.descricaoUm = ""
        personagem.equipamento = ""
        personagem.nivel = 1;

        const body = JSON.stringify(personagem);

        try {
            const response = await fetch("http://localhost:800/api/personagens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            });

            const personagem: FetchPersonagem = await response.json();

            if (response.ok) {
                router(`/personagens/${personagem.data.personagemId}/detalhar`)
                return;
            }

            throw new Error("Erro ao criar personagem");



        }
        catch {
            notificacoes.push({ content: "Erro ao inserir ", type: "error" });
        }


    }



    return (
        <>
            {notificacoes.length > 0 && <Notificacao props={notificacoes} />}





            <div className="hero  bg-base-100 min-h-screen font-mono">
                <div className="hero-content flex-col lg:gap-10 lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="sm:text-5xl text-xl font-bold">Crie seu personagem!</h1>
                        <p className="py-6">
                            Aqui você pode criar seu personagem de RPG, com nome, classe, habilidades e muito mais!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full sm:max-w-md shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full">


                                <fieldset className="fieldset  pt-4 pb-4  flex justify-center mb-3 sm:flex-row flex-col ">
                                    <section className="flex-1/4">

                                        <h3 className=" text-xl mb-3">Informações</h3>

                                        {/* Nome */}
                                        <label className="fieldset-label ">Nome</label>
                                        <input
                                            type="text"
                                            {...register("nome", { required: true })}
                                            placeholder="Um nome bonito"
                                            className="input w-full"
                                        />
                                        {errors.nome && <div className="text-error">Campo requerido</div>}


                                        {/* Url de Imagem */}
                                        <label className="fieldset-label mt-3">Url Imagem</label>
                                        <input
                                            type="text"
                                            {...register("imageUrl", { required: true })}
                                            placeholder="Url externa"
                                            className="input w-full"
                                        />
                                        {errors.imageUrl && <div className="text-error">Campo requerido</div>}

                                        {/* Classe */}
                                        <label className="fieldset-label mt-3">Classe</label>
                                        <input
                                            type="text"
                                            {...register("classe", { required: true })}
                                            placeholder="Classe"
                                            className="input w-full"
                                        />
                                        {errors.classe && <div className="text-error">Campo requerido</div>}


                                        {/* PV Total */}
                                        <label className="fieldset-label mt-3">PV Total</label>
                                        <input
                                            type="number"
                                            {...register("pvTotal", { valueAsNumber: true, required: true })}
                                            className="input w-full"
                                            placeholder="Vida total"

                                        />
                                        {errors.pvTotal && <div className="text-error">Campo requerido</div>}


                                        {/* Armadura */}
                                        <label className="fieldset-label mt-3">Armadura</label>
                                        <input
                                            type="number"
                                            {...register("armadura", { valueAsNumber: true, required: true })}
                                            placeholder="Armadura do personagem"
                                            className="input w-full"
                                        />
                                        {errors.armadura && <div className="text-error">Campo requerido</div>}


                                        {/* Dado de Dano */}
                                        <label className="fieldset-label mt-3">Dado de Dano</label>
                                        <input
                                            type="number"
                                            {...register("dadoDano", { valueAsNumber: true, required: true })}
                                            placeholder="Ex: 10 = d10"
                                            className="input w-full"
                                        />
                                        {errors.dadoDano && <div className="text-error">Campo requerido</div>}

                                    </section>
                                    <section className="flex-1 ">
                                        <h3 className=" text-xl mt-4 sm:mt-0">Habilidades</h3>
                                        <label className="input w-full">
                                            <span className="">FOR</span>
                                            <input
                                                type="number"

                                                {...register("habilidade.forca", {
                                                    valueAsNumber: true, required: true, min: 1, max: 20
                                                })}
                                                placeholder={`Ex: 16`}


                                                className="input "
                                            />
                                        </label>

                                        {errors.habilidade?.forca && errors.habilidade.forca.type === "required" &&
                                            <div className="text-error">Campo Requerido</div>}
                                        {errors.habilidade?.forca && (errors.habilidade.forca.type === "min" || errors.habilidade.forca.type === "max") &&
                                            <div className="text-error">Valor deve estar entre 1 e 20</div>}


                                        {/* Destreza */}
                                        <label className="input mt-3 w-full">

                                            <span>DES</span>
                                            <input
                                                type="number"


                                                {...register("habilidade.destreza", { valueAsNumber: true, required: true, min: 1, max: 20 })}
                                                placeholder={`Ex: 16`}

                                                className="input "
                                            />
                                        </label>

                                        {errors.habilidade?.destreza && errors.habilidade.destreza.type === "required" &&
                                            <div className="text-error">Campo Requerido</div>}
                                        {errors.habilidade?.destreza && (errors.habilidade.destreza.type === "min" || errors.habilidade.destreza.type === "max") &&
                                            <div className="text-error">Valor deve estar entre 1 e 20</div>}

                                        {/* Constituição */}
                                        <label className="input mt-3 w-full">

                                            <span>CON</span>

                                            <input
                                                type="number"
                                                placeholder={`Ex: 16`}

                                                {...register("habilidade.constituicao", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                                                className="input "
                                            />
                                        </label>


                                        {errors.habilidade?.constituicao && errors.habilidade.constituicao.type === "required" &&
                                            <div className="text-error">Campo Requerido</div>}
                                        {errors.habilidade?.constituicao && (errors.habilidade.constituicao.type === "min" || errors.habilidade.constituicao.type === "max") &&
                                            <div className="text-error">Valor deve estar entre 1 e 20</div>}


                                        {/* Inteligência */}
                                        <label className="input mt-3 w-full">


                                            <span>INT</span>

                                            <input
                                                type="number"
                                                placeholder={`Ex: 16`}

                                                {...register("habilidade.inteligencia", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                                                className="input "
                                            />

                                        </label>

                                        {errors.habilidade?.inteligencia && errors.habilidade.inteligencia.type === "required" &&
                                            <div className="text-error">Campo Requerido</div>}
                                        {errors.habilidade?.inteligencia && (errors.habilidade.inteligencia.type === "min" || errors.habilidade.inteligencia.type === "max") &&
                                            <div className="text-error">Valor deve estar entre 1 e 20</div>}


                                        {/* Sabedoria */}
                                        <label className="input mt-3 w-full">



                                            <span>SAB</span>

                                            <input
                                                type="number"
                                                placeholder={`Ex: 16`}

                                                {...register("habilidade.sabedoria", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                                                className="input "
                                            />
                                        </label>

                                        {errors.habilidade?.sabedoria && errors.habilidade.sabedoria.type === "required" &&
                                            <div className="text-error">Campo Requerido</div>}
                                        {errors.habilidade?.sabedoria && (errors.habilidade.sabedoria.type === "min" || errors.habilidade.sabedoria.type === "max") &&
                                            <div className="text-error">Valor deve estar entre 1 e 20</div>}


                                        {/* Carisma */}
                                        <label className="input mt-3 w-full">


                                            <span>CAR</span>
                                            <input
                                                type="number"
                                                placeholder={`Ex: 16`}

                                                {...register("habilidade.carisma", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                                                className="input "
                                            />
                                        </label>

                                        {errors.habilidade?.carisma && errors.habilidade.carisma.type === "required" &&
                                            <div className="text-error">Campo Requerido</div>}
                                        {errors.habilidade?.carisma && (errors.habilidade.carisma.type === "min" || errors.habilidade.carisma.type === "max") &&
                                            <div className="text-error">Valor deve estar entre 1 e 20</div>}

                                    </section>

                                </fieldset>




                                <input type="submit" className="btn btn-primary text-lg w-full sm:w-auto" value="Criar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}