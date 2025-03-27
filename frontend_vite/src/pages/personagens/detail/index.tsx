import { useParams, useSearchParams } from "react-router-dom"

export default () => {
    const { id } = useParams()
    return (
        <>
            {id}
        </>
    )
}