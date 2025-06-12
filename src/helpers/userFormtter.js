const userFormatter = (data) =>{
    return {
    name : data.name,
    phone : data.phone,
    address : data.address,
    profileImage : data.profileImage,
    password : data.password
    }
}

export default userFormatter;