import { useEffect, useState } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";

import { formValidate } from "../utils/formValidate";
import {useFirestore} from "../hooks/useFirestore";
import { erroresFirebase } from "../utils/erroresFirebase";



const Home = () => {
    const [copy, setCopy] = useState({});
    const {required, patternUrl } = formValidate();
    const { register, handleSubmit, formState: {errors}, setError, resetField, setValue} = useForm();

    const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore();
    const [newOriginId, setNewOriginId] = useState();

    useEffect(() => {
        getData();
    }, []);

    if(loading.getData) return <p>Loadind getData...</p>
    if(error) return <p>{error}</p>

    const onSubmit = async ({url}) => {

        try{
            if(newOriginId){
                await updateData(newOriginId, url);
                setNewOriginId('');
            }else {
                await addData(url);
            }
            resetField('url');
        }catch(error){
            console.log(error.code);
            const {code, message} = erroresFirebase(error.code);
        }
    };

    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
    };

    const handleClickEdit = async (item) => {
        setValue('url', item.origin);
        setNewOriginId(item.nanoid);
        
    };

    const pathUrl = window.location.href;

    const handleClickCopy = async (nanoid) =>{
        await navigator.clipboard.writeText( pathUrl + nanoid);
        setCopy({[nanoid]: true});
    }
    
    return (
        <>
            <Title text='Home'/>

            <form onSubmit={handleSubmit(onSubmit)}>

                <FormInput label='Ingreasa la Url' type="text" placeholder="https://www.example.com" error={errors.url} {...register('url', {
                    required ,
                    pattern: patternUrl,
                })}>
                </FormInput>
                <FormError error={errors.url}/>

                {newOriginId ? (
                        <Button type='submit' text='Edit url' color="gray" loading={loading.updateData}/>
                    ) : (
                        <Button type='submit' text='Add url' color="blue" loading={loading.addData}/>
                    )
                }
                
            </form>

            {
                data.map(item => (
                    <div key={item.nanoid} className='p-6 bg-white rounded-lg border border-gray-200 mb-2 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{pathUrl}{item.nanoid}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.origin}</p>

                        <div className="flex space-x-2">
                            <Button type='button' text='Delete' color="red" loading={loading[item.nanoid]} onClick={ () => handleClickDelete(item.nanoid)}/>

                            <Button type='button' text='Edit' color="purple" onClick={ () => handleClickEdit(item)}/>

                            <Button type='button' text={copy[item.nanoid] ? 'Copied' : 'Copy'} color="green" onClick={ () => handleClickCopy(item.nanoid)}/>
                        </div>
                        
                    </div>
                ))
                
            }
        </>
    );
};

export default Home;