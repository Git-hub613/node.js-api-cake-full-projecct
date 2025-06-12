const codeFormatter = (data) =>{
    return{
        name : data.name,
        email : data.email,
        phone : data.phone,
        id : data.id,
        roles : data.roles,
        address : data.address,
        createAt : data.createAt
    }
}

export default codeFormatter;