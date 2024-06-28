import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { getAllProducts } from "../../redux/actions/actions";

function ProductList() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    useEffect(() => {
        dispatch(getAllProducts(page, limit))
    }, [])
    return (
        <>
            <h1>PRODUCT LIST</h1>
        </>
    )
}
export default ProductList