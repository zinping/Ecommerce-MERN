import './Home.css';
import { useEffect } from 'react';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../../redux/actions/productAction';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import { categories } from '../../assets/data/categoryData';

function Home() {

    const dispatch = useDispatch();

    const alert = useAlert();

    const {
        loading, error, products
    } = useSelector(state => state.products);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProducts());
        return () => { }
    }, [
        dispatch, error, alert
    ])

    return (
        <div style={{
            marginTop: 80,
            marginBottom: 80
        }}>

            <MetaData title="Ecommerce" />

            <div className="category-area">

                {
                    categories.map((cat, i) => (
                        <div key={i}
                            className='category-item'>
                            {cat.name}
                        </div>
                    ))
                }

            </div>

            <div className="homeHeading">
                Featured Products
            </div>

            <div className="customContainer"
            >
                {
                    loading ?
                        <Loader />
                        :
                        products.map((product, i) => {
                            return <ProductCard
                                key={i}
                                product={product}
                            />
                        })
                }
            </div>

        </div>
    )
}

export default Home;
