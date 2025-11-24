import React,{useContext} from 'react'
import { useParams } from 'react-router-dom'
import { productContext } from '../provider/ProductProvider'
import { Link } from 'react-router-dom'


const ProductDetails = () => {
  const {id} = useParams();
  const {products} =useContext(productContext)
  const product = products.find(item=>{
    return item.id === parseInt(id);
  })
   if (!product) {
    return (
      <section className='h-screen flex
      justify-center items-center'>
        Loading....
      </section>
    )
  }

  const { image, title, description,  price, category } = product;

  return (
    <div className="p-4 flex flex-col border border-slate-400 justify-center items-center h-screen">
      <h2 className='text-center mb-6 font-bold sm:text-lg md:text-xl'>Product Details</h2>
      <img src={image} alt='' className="w-64 h-64 object-contain" />
      <h2 className="text-xl font-bold mt-4">{title}</h2>
      <h2>{category}</h2>
      <p className="mt-2 flex justify-center items-center md:w-[600px] sm:w-full">{description}</p>
      <p className="mt-2 text-red-500 font-semibold">$ {price}</p>
      <Link to="/"><button className='md:w-[600px] sm:w-full p-2 mt-2 bg-green-600 text-white rounded-lg'>Main Page</button></Link>
    </div>
  );

   
  
}

export default ProductDetails