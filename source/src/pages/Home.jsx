import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { productContext } from '../provider/ProductProvider'


const Home = () => {
  const {products} = useContext(productContext)
   
  return (
    (products.length ===0)  ? <section className='h-screen flex justify-center items-center'>
        Loading....
      </section> : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 '>
      {products.map((product)=>{
        return(
        
        <Link to={`/productDetails/${product.id}`}>
        <div  key={product.id} className='border border-[#e4e4e4] h-[300px] flex items-center justify-center gap-2'>
          {product.title}
        {product.description}
        $ {product.price}</div>
        </Link>)
        
     
      })}
       </div>
  )
}

export default Home