import cppExecuter from '../containers/cppExecuter';
import javaExecuter from '../containers/javaExecuter';
import pythonExceuter from '../containers/pythonExecuter';
import CodeExecuterStrategy from '../types/CodeExecutorStrategy';


export default function createExecutor(codeLanguage:string):CodeExecuterStrategy|null{
    
    if(codeLanguage==='PYTHON'){
        return new pythonExceuter();
    }
    else if(codeLanguage.toLowerCase()==='java'){
        return new javaExecuter();
    }
    else{
        return new cppExecuter();
    }

}