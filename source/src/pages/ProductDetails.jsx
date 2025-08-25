import React,{useContext} from 'react'
import { useParams } from 'react-router-dom'
import productContext from '../provider/ProductProvider'


const ProductDetails = () => {
  const {id} = useParams()
  const products= useContext(productContext)
   const product = products.find((p) => p.id === parseInt(id));
   const {image,price} =product

  return (
    <div className='flex justify-center items-center p-8' key={id}>
     <img src={image} className='w-[200px' alt=''/>
     <p className='text-sm'>{price}</p>
    </div>
  )
}

export default ProductDetails