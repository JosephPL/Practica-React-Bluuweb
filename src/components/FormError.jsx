const FormError = ({error}) => {
    return (
        <>
        {error && ( <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops! {error.message}</span>
                </p>)}
        </>
    )
   
  
    
};

export default FormError;