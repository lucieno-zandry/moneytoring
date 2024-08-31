export default function(str: string){
    return str.replace(/[^a-zA-Z]/g, '');
}