
export default function LoadingSpinner() {
  return (
    <section className='h-screen flex justify-center items-center w-full bg-pink-100/30'>
      <div className='flex flex-col items-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid'></div>
        <p className='mt-4 text-blue-500 font-semibold text-lg'>Loading, please wait...</p>
      </div>
    </section>
  );
}