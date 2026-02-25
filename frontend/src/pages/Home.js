import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const queryString = searchParams.toString();

        fetch(
            `${process.env.REACT_APP_API_URL}/api/v1/products${
                queryString ? `?${queryString}` : ''
            }`
        )
            .then((res) => res.json())
            .then((res) => setProducts(res.products))
            .catch((err) => console.log(err));
    }, [searchParams]);

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
        </Fragment>
    );
}
