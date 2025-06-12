const logger = (request,response,next)=>{
    console.log(`Request Method: ${request.method}, Request URL : ${request.OriginalUrl}, Request Time : ${new Date().toISOString()}`);
    next();
}

export default logger;