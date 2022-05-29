import ButtonLoading from "./ButtonLoading";

const Button = ({text, type, color = 'purple', loading, onClick}) => {

    if(loading) return <ButtonLoading/>
    const baseButton = 'focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2 mb-2 ';
    let colorBg = '';
    if(color == 'blue') {
        colorBg = 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900';
    } 

    if(color == 'red') {
        colorBg = 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900';
    } 

    if(color == 'green') {
        colorBg = 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900';
    } 

    if(color == 'purple') {
        colorBg = 'bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900';
    } 

    if(color == 'gray') {
        colorBg = 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900';
    } 

    if(color == 'yellow') {
        colorBg = 'bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900';
    } 

    return (
        <button type={type} onClick={onClick} className={baseButton + colorBg}>{text}</button>
    )
};

export default Button;