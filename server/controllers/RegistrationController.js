import User from '../models/User.js'

export const register = async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if(!email || !firstName || !lastName || !password){
        return res.status(204).json({ message: "Information is not filled" })
    }

    const userExist = await User.findOne({email});

    if(userExist){
        return res.status(406).json({message: "User is already exist"})
    }

    const user = new User({
        firstName, lastName, email, password
    })

    await user.save()


    res.status(201).json({ message: "User is registered" })
    console.log(email);
}