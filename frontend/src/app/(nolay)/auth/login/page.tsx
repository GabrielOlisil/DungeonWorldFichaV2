type loginData = {
    access_token: string,
    expires_in: number,
    refresh_expires_in: number,
    refresh_token: string,
    token_type: string,
    id_token: string,
    not_before_policy: 0,
    session_state: string,
    scope: string
}

type loginRes = {
    data: loginData
}

export default async function Login() {
    let auth = await fetch("http://localhost:8000/api/auth",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ // Converte o corpo para JSON
                username: "gabriel",
                password: "Gabriel"
            })
        }
    )


    let res: loginRes = await auth.json()

    console.log(res.data.access_token)

    return (
        <>
            {res.data.access_token}
        </>
    )
}