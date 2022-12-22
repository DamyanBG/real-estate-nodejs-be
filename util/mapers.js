function mapErrors(err){
   if (Array.isArray(err)) {
      return err.join('\n');
   }else if(err.name === 'ValidationError'){
      return Object.values(err.error).map(e => e.message).join('\n');
      //From mongoose
   }else if(typeof err.message === "string"){
      return err.message;
   }else{
     return `Requiest error`
   }
}

module.exports = mapErrors;