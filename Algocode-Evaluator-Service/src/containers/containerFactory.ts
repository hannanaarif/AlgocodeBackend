import Docker from 'dockerode';

import pullImage from './pullImage';

async function createContainer(imageName:string,cmdExecutible:string[]){
    const docker = new Docker();

    await pullImage(imageName);
    
    const container=await docker.createContainer({
        Image:imageName,
        Cmd:cmdExecutible,
        Tty:false,
        AttachStdin:true,
        AttachStdout:true,
        AttachStderr:true,
        HostConfig:{
          Memory:1024*1024*1024,
        },
        OpenStdin:true
    });
    return container;
};
export default createContainer;