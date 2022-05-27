import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import {useFirestore} from "../hooks/useFirestore";

const Home = () => {

    const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore();
    const [text, setText] = useState('');
    const [newOriginId, setNewOriginId] = useState();

    useEffect(() => {
        console.log('getData')
        getData();
    }, []);

    if(loading.getData) return <p>Loadind getData...</p>
    if(error) return <p>{error}</p>

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(newOriginId){
            await updateData(newOriginId, text);
            setNewOriginId('');
            setText('');
            return
        } 
        await addData(text);
        setText('');
    };

    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
    };

    const handleClickEdit = async (item) => {
        console.log('edit')
        setText(item.origin);
        setNewOriginId(item.nanoid);
    };
    
    return (
        <>
            <Title text='Home'/>

            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='ex. www.domain.com' value={text} onChange={e => setText(e.target.value)}/>
                {
                    newOriginId ? (
                        <Button type='submit' text='Edit url' color="gray" loading={loading.updateData}/>
                    ) : (
                        <Button type='submit' text='Add url' color="blue" loading={loading.addData}/>
                    )
                }
                
            </form>

            {
                data.map(item => (
                    <div key={item.nanoid}>
                        <p>{item.nanoid}</p>
                        <p>{item.origin}</p>
                        <p>{item.uid}</p>
                        <Button type='button' text='Delete' color="red" loading={loading[item.nanoid]} onClick={ () => handleClickDelete(item.nanoid)}/>
                        <Button type='button' text='Edit' color="gray" onClick={ () => handleClickEdit(item)}/>
                    </div>
                ))
                
            }
        </>
    );
};

export default Home;